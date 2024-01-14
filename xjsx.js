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
      return c === '_' ? '.' : c === '$' ? (lastIsDigit ? '/' : ':') : 'A' <= c && c <= 'Z' ? `-${c.toLowerCase()}` : c;
    })
    .join('');
};

const tailwindExtract = (content) =>
  content.split(/[^a-zA-Z0-9$\-:_]/).reduce((acc, curr) => [...acc, curr, toTailwind(curr)], []);

const XjsxChain = (element, classes, attributes) =>
  new Proxy(XjsxChain, {
    apply: (target, _, args) =>
      typeof args[0] === 'object' && !Array.isArray(args[0]) && !isValidElement(args[0])
        ? XjsxChain(element, classes, { ...attributes, ...args[0] })
        : createElement(
            element,
            {
              ...attributes,
              className: attributes.className
                ? `${classes.map(toTailwind).join(' ')} ${attributes.className}`
                : classes.map(toTailwind).join(' '),
            },
            ...args.map((element) => (element?.isXjsx ? element() : element)),
          ),
    get: (_, prop) => (prop === 'isXjsx' ? true : XjsxChain(element, [...classes, prop], attributes)),
  });
const _ = XjsxChain('div', [], {});

const Maker = (elements) =>
  new Proxy(Maker, {
    apply: (target, _, args) => Maker({ ...elements, ...args[0] }),
    get: (_, name) => XjsxChain(elements[name] ?? name, [], {}),
  });
const elementFactory = Maker({});

export { toTailwind, tailwindExtract, _, elementFactory };
