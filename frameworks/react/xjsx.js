// MIT License
//
// Copyright (c) c4ffein.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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

const purifyElements = (...elements) =>
  elements.map((element) =>
    Array.isArray(element) ? purifyElements(...element) : element?.isXjsx ? element() : element,
  );

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
            ...purifyElements(...args),
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
