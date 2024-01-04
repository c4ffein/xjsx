import { useState, createRef } from 'react';

import { _, tagFactory } from '../libs/xjsx';
import JSX from './JSX.jsx';
import XJSX from './XJSX.js';
import SplitCode from './SplitCode';

import xjsxLogo from './assets/logo-xjsx.svg';

const { a, button, h1, h2, img, span } = tagFactory;
const s = span;

const App = () => {
  const [codeShown, setCodeShown] = useState(false);
  let splitCodeContainerRef = createRef();
  const moveToXjsx = () =>
    splitCodeContainerRef.current
      ? splitCodeContainerRef.current.scrollTo({
          left: (splitCodeContainerRef.current.getBoundingClientRect().width / 2) * window.devicePixelRatio,
          behavior: 'smooth',
        })
      : null;

  return _.minHFull.flex.flexCol.justifyAround(
    a.flex.flexCol.mx5({
      href: 'https://github.com/c4ffein/xjsx',
      target: '_blank',
      rel: 'noreferrer',
    })(
      _.my2.block.flex.gap1.itemsCenter.mxAuto.text3xl.fontBold(
        img.h8.w8.mr1({ src: xjsxLogo, alt: 'xjsx logo' })(),
        h1.inlineBlock({ style: { transform: 'translateY(-9%)' } })`xjsx`,
        h1.inlineBlock({ style: { transform: 'translateY(-9%)' } })(
          s.textReact`(`,
          s.textSlate500`demo website`,
          s.textReact`)`,
        ),
      ),
      h2.mxAuto.textXl.textSlate500.hover$textReact.transitionColors(
        `A `,
        s.decorationBlack.dark$decorationWhite.underline.underlineOffset2.decoration2`new way`,
        ` to generate React elements without JSX`,
      ),
    ),

    _.flex.itemsCenter(_.w1$2(JSX()), _.w1$2(XJSX())),
    _.flex.gap8.justifyCenter(
      a.mb8.customButton({ href: 'https://github.com/c4ffein/xjsx' })`Read the doc`,
      button.mb8.customButton({ onClick: () => setCodeShown(!codeShown) })`Show demo code`,
    ),
    _.fixed.inset0.hFull.transitionOpacity({ className: codeShown ? '' : 'pointer-events-none opacity-0' })(
      _.absolute.inset0.bgWhite.dark$bgGithub.opacity30({ onClick: () => setCodeShown(false) })(),
      _.absolute.inset0.backdropBlur({ onClick: () => setCodeShown(false) })(),
      _.z20.absolute.inset0(
        _.wFull.hFull.overflowScroll({ ref: splitCodeContainerRef })(
          SplitCode({ moveToXjsx }),
          button.mb8.mx8.customButton.invisible({ onClick: () => setCodeShown(false) })`Close`,
        ),
      ),
      _.z30.absolute.inset0.flex.flexCol.justifyCenter.pointerEventsNone(
        _.overflowAuto.invisible(SplitCode({ moveToXjsx: () => null })),
        button.mb8.mx8.customButton({
          className: codeShown ? 'pointer-events-auto' : '',
          onClick: () => setCodeShown(false),
        })`Close`,
      ),
    ),
  );
};

export default App;
