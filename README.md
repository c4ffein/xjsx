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
import { _, tagFactory } from '../xjsx';

const { a, img, h1, span, button, p } = tagFactory;

export default function XJSX() {
  const [count, setCount] = useState(0);

  return _.p8(
    h1.text3xl.fontBold.textSlate500.mb4('Hello world from ', span.textReact`xjsx`),
    button.mb4.customButton.hover$borderReact({ onClick: () => setCount((count) => count + 1) })`Clicked : ${count}`,
    _.flex.itemsCenter.gap2_5(
      a({ href: 'https://github.com/c4ffein/xjsx', target: '_blank', rel: 'noreferrer' })(
        img.h8.w8({ src: xjsxLogo, alt: 'xjsx logo' })(),
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

## How to use
Right now, you may just copy `xjsx.js` into your [React](https://react.dev/) project to test it.

### How to import
You may import `tagFactory` to get the [xjsx](https://github.com/c4ffein/xjsx) builder for any html tag you want, or the short `_` for `div`.
```JavaScript
import { tagFactory, _ } from '/xjsx.js'
const { a, div, span } = tagFactory;
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

### Make it work with [Bootstrap](https://getbootstrap.com)
As [Bootstrap](https://getbootstrap.com) doesn't use [PostCSS](https://postcss.org), it should work as-is.

## How does it actually work
- Pure JavaScript, so it won't introduce weird complexity in your build system (as most things shouldn't).
- Voodoo logic with [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) objects, so that you can chain classes that will automatically be added to the Proxy CSS Classes one after another, and will generate a [React element](https://react.dev/reference/react/createElement) in the end.
- Those attributes are transformed as we can't use `-`, `.`, `:` or `/` in JavaScript identifiers, so we transfom e.g. `textRed600` into `text-red-600`.
- We feed the correct classes to [Tailwind](https://tailwindcss.com) as it [just checks which strings are present in your files](https://tailwindcss.com/docs/content-configuration#class-detection-in-depth), as it was already explained in [Make it work with Tailwind CSS](#make-it-work-with-tailwind-css)

## Tricks
### What about characters used in [Tailwind](https://tailwindcss.com) classes that are not allowed in JavaScript identifiers?
- *`-`* Just capitalize the next letter, or let the number as-is. Also works for classes starting with `-`.
- *`.`* Just replace the char with a `_`, will be transformed to a `.`.
- *`:`* Just replace that char with a `$`, will be transformed to `:` if the previous char is not a digit.
- *`/`* Just replace that char with a `$`, will be transformed to a `/` if the previous char is a digit.
### What about numbers?
Numbers will be preceded by a `-`, unless the previous char is already a number, `$` or `_`.
### What about anything else that can't be covered?
You may mix [xjsx](https://github.com/c4ffein/xjsx) [Proxy tricks](#tricks) and regular `className` usage, e.g.
```JavaScript
const App = () => _.hFull.flex.itemsCenter({ className: 'w-screen' })(
  _.w1$2(JSX()), _.w1$2(XJSX())
);
```
You may also use regular [Tailwind](https://tailwindcss.com) classes in your own CSS, regular [PostCSS](https://postcss.org) treatment isn't broken.

## Compatibility
The good thing is that there are no dependencies besides [React](https://react.dev/).  
The bad thing is that short lib relies on [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) objects, and [even though they are available on all updated major web browsers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#browser_compatibility) it may not suit your use case, your call.
