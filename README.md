# xjsx
A new way to generate [React](https://react.dev/) [elements](https://react.dev/reference/react/createElement) without [jsx](https://wikipedia.org/wiki/JSX_(JavaScript)), inspired by [pug](https://pugjs.org) syntax, compatible with [Tailwind CSS](https://tailwindcss.com), actually pure JavaScript.

![xjsx demo screen](/assets/screen-xjsx-react-light.png?raw=true#gh-light-mode-only)
![xjsx demo screen](/assets/screen-xjsx-react-dark.png?raw=true#gh-dark-mode-only)

&rarr; ***Scroll this*** &rarr;

<table>
<tr>
<th>React JSX syntax</th>
<th>js-without-x</th>
</tr>
<tr>
<td>

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

</td>
<td>

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
    _.flex.itemsCenter.gap2$5(
      a({ href: 'https://github.com/c4ffein/xjsx', target: '_blank', rel: 'noreferrer' })(
        img.h8.w8({ src: xjsxLogo, alt: 'xjsx logo' })(),
      ),
      p.textBlack.dark$textWhite`Click on the xjsx logo to read the xjsx documentation`,
    ),
  );
}
```

</td>
</tr>
</table>

## How to use
Right now, you may just copy `xjsx.js` into your React project to test it.

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
