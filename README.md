# xjsx
Coming Soon (I guess)

![xjsx demo screen](/assets/screen-xjsx-react-light.png?raw=true#gh-light-mode-only)
![xjsx demo screen](/assets/screen-xjsx-react-dark.png?raw=true#gh-dark-mode-only)

## How to use
Right now, you may just copy `xjsx.js` into your React project to test it.

### How to import
You may import `tagFactory` to get the xjsx builder for any html tag you want, or the short `_` for `div`.
```
import { tagFactory, _ } from '/xjsx.js'
const { a, div, span } = tagFactory;
```

### Make it work with [Tailwind CSS](https://tailwindcss.com)
First, ensure that [Tailwind CSS has been set up](https://tailwindcss.com/docs/guides/vite).
Then, in `tailwind.config.js`:
```
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
