# xjsx
Coming Soon (I guess)

![xjsx demo screen](/assets/screen-xjsx-react-light.png?raw=true#gh-light-mode-only)
![xjsx demo screen](/assets/screen-xjsx-react-dark.png?raw=true#gh-dark-mode-only)

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
