# xjsx

A new way to generate [React](https://react.dev/) [elements](https://react.dev/reference/react/createElement) without [JSX](https://react.dev/learn/writing-markup-with-jsx), inspired by [pug](https://pugjs.org) syntax, compatible with [Tailwind CSS](https://tailwindcss.com), actually pure JavaScript.

![xjsx demo screen](/assets/screen-xjsx-react-light.png?raw=true#gh-light-mode-only)
![xjsx demo screen](/assets/screen-xjsx-react-dark.png?raw=true#gh-dark-mode-only)

#### [JSX](https://react.dev/learn/writing-markup-with-jsx) syntax example
```JSX
import { useState } from 'react';
import reactLogo from './assets/logo-react.svg';

export default function JSX() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-600 mb-4">
        Hello world from <span className="text-react">JSX</span>
      </h1>
      <button className="mb-4 custom-button hover:border-react" onClick={() => setCount((count) => count + 1)}>
        Clicked : {count}
      </button>
      <div className="flex items-center gap-2.5">
        <a href="https://react.dev/learn/writing-markup-with-jsx" target="_blank" rel="noreferrer">
          <img className="h-8 w-8" src={reactLogo} alt="React logo"></img>
        </a>
        <p className="text-black dark:text-white">Click on the React logo to read the React JSX documentation</p>
      </div>
    </div>
  );
}
```

#### [xjsx](https://github.com/c4ffein/xjsx) syntax example
```JavaScript
import { useState } from 'react';
import xjsxLogo from './assets/logo-xjsx.svg';
import { _, elementFactory } from '../xjsx';

const { a, img, h1, span, button, p } = elementFactory;

export default function XJSX() {
  const [count, setCount] = useState(0);

  return _.p8(
    h1.text3xl.fontBold.textSlate500.mb4('Hello world from ', span.textReact`xjsx`),
    button.mb4.customButton.hover$borderReact({ onClick: () => setCount((count) => count + 1) })`Clicked : ${count}`,
    _.flex.itemsCenter.gap2_5(
      a({ href: 'https://github.com/c4ffein/xjsx', target: '_blank', rel: 'noreferrer' })(
        img.h8.w8({ src: xjsxLogo, alt: 'xjsx logo' }),
      ),
      p.textBlack.dark$textWhite`Click on the xjsx logo to read the xjsx documentation`,
    ),
  );
}
```


## Opinionated
- [JSX](https://react.dev/learn/writing-markup-with-jsx) is very nice to put logic in your [React](https://react.dev/) (conditionals, list rendering...) as you can directly use JavaScript for it.
- [Tailwind CSS](https://tailwindcss.com) doesn't work well with [JSX](https://react.dev/learn/writing-markup-with-jsx) as it is class-based - not only do you have to close any tag, but also use that repetitive [className](https://react.dev/reference/react-dom/components/common#applying-css-styles).
- [pug](https://pugjs.org) works very well with [Tailwind CSS](https://tailwindcss.com) as it lets you easily chain CSS classes through its syntax, and even more with template-based frameworks that let you put logic in it.
- We should have a way to benefit from a [pug](https://pugjs.org)-like syntax to use [Tailwind](https://tailwindcss.com) classes in [React](https://react.dev/) without compromising on the ability to use all JavaScript.


## How does it actually work
- Pure JavaScript, so it won't introduce weird complexity in your build system (as most things shouldn't).
- Voodoo logic with [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) objects, so that you can chain CSS classes that will automatically be added to the [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) CSS classes one after another, and will generate a [React element](https://react.dev/reference/react/createElement) in the end.
### In detail
- `_` and any variable you can get from the `elementFactory` are [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).
- Getting any attribute (with the Javascript `.` syntax) will generate a new [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) that will include this attribute in it's own list of CSS classes, in addition to all previously added CSS classes.
  - Those attributes are modified before they are added to the list of CSS classes. As we can't use `-`, `.`, `:` or `/` in JavaScript identifiers, we transfom e.g. `textRed600` into `text-red-600`. This lets you use CSS classes from [Tailwind](https://tailwindcss.com), [Bootstrap](https://getbootstrap.com), or even your own `hyphen-separated` CSS classes as camel case, which is more consistent with JavaScript.
  - [More info on className transformation is provided later.](#css-class-names)
  - [More setup is needed for Tailwind.](#make-it-work-with-tailwind-css)
- If you call that [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), the behaviour now depends on the arguments:
  - If the argument is an object that is neither an [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) or a [React Element](https://react.dev/reference/react/isValidElement), we consider that this object represents HTML attributes, and so you can use it to set `href`, `onclick` and so on, and a new [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) will be returned.
  - Anything else will return the calling of [React](https://react.dev/) [createElement](https://react.dev/reference/react/createElement) with the adequate `props` (from the [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) chain) and the arguments as `...children`. From the [documentation](https://react.dev/reference/react/createElement#parameters) itself: `Zero or more child nodes. They can be any React nodes, including React elements, strings, numbers, portals, empty nodes (null, undefined, true, and false), and arrays of React nodes.`
  - See the [How to use React Elements](#how-to-use-react-elements) section for more info and the [React Element or not](#react-element-or-not) section for examples.


## How to use
Right now, you may just copy `xjsx.js` into your [React](https://react.dev/) project to test it.

### How to import
You may import `elementFactory` to get the [xjsx](https://github.com/c4ffein/xjsx) builder for any HTML tag you want, or the short `_` for `div`.
```JavaScript
import { elementFactory, _ } from '/xjsx.js'
const { a, div, span } = elementFactory;
```

### How to use [React Elements](https://react.dev/reference/react/isValidElement)
You may also use `elementFactory` to convert [React Elements](https://react.dev/reference/react/isValidElement) to [xjsx](https://github.com/c4ffein/xjsx) elements.

```JavaScript
import CodeRE from './Code';
const { a, button, img, h3, Code } = elementFactory({ Code: CodeRE });
```

And use those as any other [xjsx](https://github.com/c4ffein/xjsx) elements.
```JavaScript
_flex(
  Code({ jsCode: codeStringA }),
  Code({ jsCode: codeStringB }),
);
```
### Make it work with [Tailwind CSS](https://tailwindcss.com)
First, ensure that [Tailwind CSS has been set up](https://tailwindcss.com/docs/guides/vite).  
Then, in `tailwind.config.js`:
```JavaScript
import { tailwindExtract } from './xjsx'

export default {
  content: {
    files: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    extract: tailwindExtract,
  },
}
```
This has to be done as:
- [Tailwind CSS](https://tailwindcss.com) uses [PostCSS](https://postcss.org) to curate classes, [only including the used classes to reduce bundle size](https://tailwindcss.com/docs/content-configuration#class-detection-in-depth).
- When using [xjsx](https://github.com/c4ffein/xjsx) you don't necessarily include the [Tailwind](https://tailwindcss.com) classes that you will use in your source files.

So, through `tailwindExtract`, we just use a regex to split what could be JavaScript identifiers, and apply the same transformation into what could be a [Tailwind](https://tailwindcss.com) class to re-expose it to [PostCSS](https://postcss.org), so it is included if it matches a [Tailwind](https://tailwindcss.com) class.


## Tricks
### CSS class names
#### What about characters used in [Tailwind](https://tailwindcss.com) classes that are not allowed in JavaScript identifiers?
- **`-`** Just capitalize the next letter, or let the number as-is. Also works for classes starting with `-`.
- **`.`** Just replace the char with a `_`, will be transformed to a `.`.
- **`:`** Just replace that char with a `$`, will be transformed to `:` if the previous char is not a digit.
- **`/`** Just replace that char with a `$`, will be transformed to a `/` if the previous char is a digit.
#### What about numbers?
Numbers will be preceded by a `-`, unless the previous char is already a number, `$` or `_`.
#### What about anything else that can't be covered?
You may mix [xjsx](https://github.com/c4ffein/xjsx) [Proxy tricks](#tricks) and regular `className` usage, e.g.
```JavaScript
const App = () => _.hFull.flex.itemsCenter({ className: 'w-screen' })(
  _.w1$2(JSX), _.w1$2(XJSX)
);
```
You may also use regular [Tailwind](https://tailwindcss.com) classes in your own CSS, regular [PostCSS](https://postcss.org) treatment isn't broken.
### [React Element](https://react.dev/reference/react/isValidElement) or not
*Following [How does it actually work](#how-does-it-actually-work), which of these are [React Elements](https://react.dev/reference/react/isValidElement)?  
Otherwise they are [xjsx](https://github.com/c4ffein/xjsx) [Proxy objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)*.  
  
:heavy_multiplication_x:  `` _.h4.w4.bgRed600 ``  
:heavy_check_mark:  `` _.h4.w4.bgRed600() ``  
:heavy_check_mark:  `` _`Hello` ``  
:heavy_check_mark:  `` _.textRed600('In red and ', _textBlue600`in blue`) ``  
:heavy_multiplication_x:  `` _.h4.w4.bgRed600({}) ``  
:heavy_multiplication_x:  `` _.h4.w4.bgRed600({whatever: 'whatever'}) ``  
:heavy_check_mark:  `` _.h4.w4.bgRed600({whatever: 'whatever'})() ``  
:heavy_check_mark:  `` _.h4.w4.bgRed600({whatever: 'whatever'})`with some text` ``  
:heavy_check_mark:  `` _.flex([_({key: 1})`a`, _({key: 2})`b`]) `` 
  
This may seem uncomfortable at first, but the thing is that all this is pure JavaScript and feels kinda like [pug](https://pugjs.org). But where you would still be able to use [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) with [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), and everything else (not that you should).

#### Error diagnosis
- `Warning: Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.`: You probably forgot to make a final call.
- `TypeError: Component({ ...xxx }) is not a function. (In 'Component({ ...xxx })()', 'Component({ ...xxx })' is an instance of Object)`: This is probably the opposite, you tried to treat a [React Element](https://react.dev/reference/react/isValidElement) as a [xjsx](https://github.com/c4ffein/xjsx) [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). See [How to use React Elements](#how-to-use-react-elements)

## Compatibility
The good thing is that there are no dependencies besides [React](https://react.dev/).  
The bad thing is that short lib relies on [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) objects, and [even though they are available on all updated major web browsers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#browser_compatibility) it may not suit your use case, your call.
