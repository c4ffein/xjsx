export default '' +
  "import { useState } from 'react';\n" +
  "import xjsxLogo from './assets/logo-xjsx.svg';\n" +
  "import { _, tagFactory } from '../xjsx';\n" +
  '\n' +
  'const { a, img, h1, span, button, p } = tagFactory;\n' +
  '\n' +
  'export default function XJSX() {\n' +
  '  const [count, setCount] = useState(0);\n' +
  '\n' +
  '  return _.p8(\n' +
  "    h1.text3xl.fontBold.textSlate500.mb4('Hello world from ', span.textReact`xjsx`),\n" +
  '    button.mb4.customButton({ onClick: () => setCount((count) => count + 1) })`Clicked : ${count}`,\n' +
  '    _.flex.itemsCenter.gap2_5(\n' +
  "      a({ href: 'https://github.com/c4ffein/xjsx', target: '_blank', rel: 'noreferrer' })(\n" +
  "        img.minH8.minW8({ src: xjsxLogo, alt: 'xjsx logo' })(),\n" +
  '      ),\n' +
  '      p.textBlack.dark$textWhite`Click on the xjsx logo to read the xjsx documentation`,\n' +
  '    ),\n' +
  '  );\n' +
  '}';
