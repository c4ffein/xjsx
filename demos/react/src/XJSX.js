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
