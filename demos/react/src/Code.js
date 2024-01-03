import { tagFactory } from '../libs/xjsx';

const { code, pre } = tagFactory;

window.Prism = window.Prism || {};
window.Prism.manual = true;
import '../libs/prism';
const Prism = window.Prism;

export default function Code({ jsCode }) {
  const highlightedCode = Prism.highlight(jsCode ?? '', Prism.languages.jsx, 'jsx');
  return pre(code.fontMono({ dangerouslySetInnerHTML: { __html: highlightedCode } })());
}
