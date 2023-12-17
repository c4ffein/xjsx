import { createElement, isValidElement } from 'react';

const toTailwind = (className) => {
  let cur = null;
  let curIsDigit = false;
  return [...className]
    .map((c) => {
      const last = cur;
      const lastIsDigit = curIsDigit;
      cur = c;
      if ('0' <= c && c <= '9') {
        curIsDigit = true;
        return lastIsDigit || last === '_' || last === '$' ? c : `-${c}`;
      }
      curIsDigit = false;
      return c === '_' ? '/' : c === '$' ? (lastIsDigit ? '.' : ':') : 'A' <= c && c <= 'Z' ? `-${c.toLowerCase()}` : c;
    })
    .join('');
};

const tailwindExtract = (content) =>
  content.split(/[^a-zA-Z0-9$\-:_]/).reduce((acc, curr) => [...acc, curr, toTailwind(curr)], []);

class Callable extends Function {
  constructor(tag, classes, attributes) {
    super();
    this.tag = tag ?? 'div';
    this.classes = classes ?? [];
    this.attributes = attributes ?? {};
    return new Proxy(this, {
      apply: (target, _, args) => target._call(...args),
      get: (target, prop) => new Callable(this.tag, [...this.classes, prop], this.attributes),
    });
  }
  _call(...args) {
    return typeof args[0] === 'object' && !Array.isArray(args[0]) && !isValidElement(args[0])
      ? new Callable(this.tag, [...this.classes], { ...this.attributes, ...args[0] })
      : createElement(this.tag, { ...this.attributes, className: this.classes.map(toTailwind).join(' ') }, ...args);
  }
}

const _ = new Callable();
const tagFactory = new Proxy({}, { get: (_, name) => new Callable(name) });

export { toTailwind, tailwindExtract, _, tagFactory };
