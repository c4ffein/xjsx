import { useState, createRef } from 'react';

import { _, elementFactory } from '../libs/xjsx';
import PageTitleRE from './PageTitle.js';
import JSXRE from './JSX.jsx';
import XJSXRE from './XJSX.js';
import SplitCodeRE from './SplitCode';

const { a, button, PageTitle, JSX, XJSX, SplitCode } = elementFactory({
  PageTitle: PageTitleRE,
  JSX: JSXRE,
  XJSX: XJSXRE,
  SplitCode: SplitCodeRE,
});

export default () => {
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
    PageTitle,
    _.flex.itemsCenter(_.w1$2(JSX), _.w1$2(XJSX)),
    _.flex.gap8.justifyCenter(
      a.mb8.customButton({ href: 'https://github.com/c4ffein/xjsx' })`Read the doc`,
      button.mb8.customButton({ onClick: () => setCodeShown(!codeShown) })`Show demo code`,
    ),
    _.fixed.inset0.hFull.transitionOpacity({ className: codeShown ? '' : 'pointer-events-none opacity-0' })(
      _.absolute.inset0.bgWhite.dark$bgGithub.opacity30({ onClick: () => setCodeShown(false) }),
      _.absolute.inset0.backdropBlur({ onClick: () => setCodeShown(false) }),
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
