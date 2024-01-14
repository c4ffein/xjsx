import { _, elementFactory } from '../libs/xjsx';
import JSXCode from './assets/JSXCode.js';
import XJSXCode from './assets/XJSXCode.js';
import CodeRE from './Code';

import reactLogo from './assets/logo-react.svg';
import xjsxLogo from './assets/logo-xjsx.svg';

const { a, button, img, h3, Code } = elementFactory({ Code: CodeRE });

const SplitCode = ({ moveToXjsx }) =>
  _.flex(
    _.p8.boxBorder(
      _.flex.contentCenter.gap8.mb5(
        a.my2.block.flex.gap5.itemsCenter({
          href: 'https://react.dev/learn/writing-markup-with-jsx',
          target: '_blank',
          rel: 'noreferrer',
        })(img.h8.w8({ src: reactLogo, alt: 'React logo' }), h3.textLg.fontBold`JSX demo code`),
        button.customButton({ onClick: moveToXjsx })`See xjsx code`,
      ),
      Code({ jsCode: JSXCode }),
    ),
    _.p8.boxBorder(
      _.flex.contentCenter.gap8.mb5(
        a.my2.block.flex.gap5.itemsCenter({
          href: 'https://github.com/c4ffein/xjsx',
          target: '_blank',
          rel: 'noreferrer',
        })(img.h8.w8({ src: xjsxLogo, alt: 'xjsx logo' }), h3.textLg.fontBold`xjsx demo code`),
      ),
      Code({ jsCode: XJSXCode }),
    ),
  );

export default SplitCode;
