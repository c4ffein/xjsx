import { _, elementFactory } from '../libs/xjsx';

const { a, g, h1, h2, path, span, svg } = elementFactory;
const s = span;

export default () =>
  // We do that whole render x2 to fix the transition effect on the svg fill property,
  // that bug only happens on Safari once a parent link has been visited
  // - https://stackoverflow.com/a/38891298
  // - https://gitlab.com/gitlab-org/gitlab-foss/-/issues/23017
  _.selfCenter.relative.group.pointerEventsNone.mx5(
    a.flex.flexCol({ href: 'https://github.com/c4ffein/xjsx', target: '_blank', rel: 'noreferrer' })(
      _.flex.flexCol.selfCenter.mt2.pointerEventsAuto(
        _.block.flex.gap1.itemsCenter.mxAuto.text3xl.fontBold.relative(
          _.h8.w8.mr1.pb1,
          h1.inlineBlock.groupHover$textReact.transitionColors({ style: { transform: 'translateY(-11%)' } })`xjsx`,
          h1.inlineBlock({ style: { transform: 'translateY(-11%)' } })(
            s.textReact.groupHover$textBlack.dark$groupHover$textWhite.transitionColors`(`,
            s.textSlate500`demo website`,
            s.textReact.groupHover$textBlack.dark$groupHover$textWhite.transitionColors`)`,
          ),
        ),
        _.h2,
      ),
      h2.mxAuto.textXl.textSlate500.groupHover$textReact.transitionColors.pointerEventsAuto(
        `A `,
        s.decorationBlack.dark$decorationWhite.underline.underlineOffset2.decoration2`new way`,
        ` to generate React elements without JSX`,
      ),
    ),
    a.absolute.Z10.top0.invisible.flex.flexCol(
      _.flex.flexCol.selfCenter.mt2.pointerEventsAuto(
        _.block.flex.gap1.itemsCenter.mxAuto.text3xl.fontBold.relative(
          svg.visible.overflowVisible.h8.w8.mr1({
            width: '100%',
            height: '100%',
            // -20 next line is a Safari fix, as 1 px on the left kept the color without hover
            viewBox: '-20 0 2048 2048', // Only happened on specific resolutions
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
            xmlnsXlink: 'http://www.w3.org/1999/xlink',
            xmlSpace: 'preserve',
            style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 },
          })(
            g({ transform: 'matrix(1.75585,0,0,1.88103,296.867,1512.18)' })(
              g({ transform: 'matrix(1159.53,0,0,1159.53,-220.169,94.6092)' })(
                path.fillReact.groupHover$fillBlack.dark$groupHover$fillWhite.transitionColors({
                  d: 'M0.048,-0.305C0.048,-0.37 0.056,-0.43 0.073,-0.483C0.09,-0.536 0.115,-0.585 0.15,-0.632C0.185,-0.679 0.228,-0.725 0.281,-0.77L0.308,-0.746C0.271,-0.705 0.24,-0.662 0.215,-0.619C0.19,-0.576 0.17,-0.529 0.158,-0.478C0.145,-0.427 0.138,-0.369 0.138,-0.305L0.048,-0.305ZM0.281,0.16C0.228,0.114 0.185,0.068 0.15,0.022C0.115,-0.025 0.09,-0.075 0.073,-0.128C0.056,-0.181 0.048,-0.24 0.048,-0.305L0.138,-0.305C0.138,-0.241 0.145,-0.184 0.158,-0.133C0.17,-0.082 0.19,-0.034 0.215,0.009C0.24,0.052 0.271,0.095 0.308,0.136L0.281,0.16Z',
                  style: { fillRule: 'nonzero' },
                }),
              ),
              g({ transform: 'matrix(1159.53,0,0,1159.53,102.18,94.6092)' })(
                path.fillReact.groupHover$fillBlack.dark$groupHover$fillWhite.transitionColors({
                  d: 'M0.293,0.155C0.218,0.16 0.163,0.146 0.13,0.115C0.096,0.084 0.085,0.039 0.097,-0.02L0.129,-0.179C0.136,-0.214 0.135,-0.239 0.125,-0.256C0.114,-0.273 0.094,-0.282 0.065,-0.284L0.035,-0.286L0.035,-0.324L0.065,-0.326C0.094,-0.328 0.114,-0.337 0.125,-0.354C0.135,-0.371 0.136,-0.396 0.129,-0.431L0.097,-0.59C0.085,-0.649 0.096,-0.695 0.13,-0.726C0.163,-0.757 0.218,-0.77 0.293,-0.765L0.293,-0.725C0.248,-0.725 0.217,-0.715 0.2,-0.696C0.182,-0.676 0.177,-0.643 0.186,-0.598L0.215,-0.449C0.223,-0.407 0.22,-0.374 0.205,-0.351C0.19,-0.328 0.164,-0.312 0.127,-0.305C0.164,-0.298 0.19,-0.282 0.205,-0.259C0.22,-0.236 0.223,-0.203 0.215,-0.161L0.186,-0.012C0.177,0.033 0.182,0.066 0.2,0.086C0.217,0.105 0.248,0.115 0.293,0.115L0.293,0.155Z',
                  style: { fillRule: 'nonzero' },
                }),
              ),
            ),
            g({ transform: 'matrix(1.75585,0,0,1.88103,1315.45,1511.37)' })(
              g({ transform: 'matrix(1159.53,0,0,1159.53,-220.169,94.6092)' })(
                path.fillReact.groupHover$fillBlack.dark$groupHover$fillWhite.transitionColors({
                  d: 'M0.035,0.155L0.035,0.115C0.08,0.115 0.111,0.105 0.129,0.086C0.147,0.066 0.151,0.033 0.142,-0.012L0.113,-0.161C0.105,-0.203 0.109,-0.236 0.124,-0.259C0.138,-0.282 0.164,-0.298 0.201,-0.305C0.164,-0.312 0.138,-0.328 0.124,-0.351C0.109,-0.374 0.105,-0.407 0.113,-0.449L0.142,-0.598C0.151,-0.643 0.147,-0.676 0.129,-0.696C0.111,-0.715 0.08,-0.725 0.035,-0.725L0.035,-0.765C0.11,-0.77 0.165,-0.757 0.199,-0.726C0.232,-0.695 0.243,-0.649 0.231,-0.59L0.199,-0.431C0.192,-0.396 0.194,-0.371 0.204,-0.354C0.214,-0.337 0.234,-0.328 0.263,-0.326L0.293,-0.324L0.293,-0.286L0.263,-0.284C0.234,-0.282 0.214,-0.273 0.204,-0.256C0.194,-0.239 0.192,-0.214 0.199,-0.179L0.231,-0.02C0.243,0.039 0.232,0.084 0.199,0.115C0.165,0.146 0.11,0.16 0.035,0.155Z',
                  style: { fillRule: 'nonzero' },
                }),
              ),
              g({ transform: 'matrix(1159.53,0,0,1159.53,95.2224,94.6092)' })(
                path.fillReact.groupHover$fillBlack.dark$groupHover$fillWhite.transitionColors({
                  d: 'M0.273,-0.305L0.183,-0.305C0.183,-0.369 0.177,-0.427 0.164,-0.478C0.151,-0.529 0.131,-0.576 0.106,-0.619C0.081,-0.662 0.05,-0.705 0.013,-0.746L0.04,-0.77C0.093,-0.725 0.137,-0.679 0.172,-0.632C0.206,-0.585 0.231,-0.536 0.248,-0.483C0.265,-0.43 0.273,-0.37 0.273,-0.305ZM0.04,0.16L0.013,0.136C0.05,0.095 0.081,0.052 0.106,0.009C0.131,-0.034 0.151,-0.082 0.164,-0.133C0.177,-0.184 0.183,-0.241 0.183,-0.305L0.273,-0.305C0.273,-0.24 0.265,-0.181 0.248,-0.128C0.231,-0.075 0.206,-0.025 0.172,0.022C0.137,0.068 0.093,0.114 0.04,0.16Z',
                  style: { fillRule: 'nonzero' },
                }),
              ),
            ),
          ),
          h1.inlineBlock.groupHover$textReact.transitionColors({ style: { transform: 'translateY(-9%)' } })`xjsx`,
          h1.inlineBlock({ style: { transform: 'translateY(-9%)' } })`(demo website)`,
        ),
        _.h2,
      ),
      h2.mxAuto.textXl.pointerEventsAuto`A new way to generate React elements without JSX`,
    ),
  );
