import { elementFactory } from '../libs/xjsx';

const { code, pre } = elementFactory;

window.Prism = window.Prism || {};
window.Prism.manual = true;
import '../libs/prism';
const Prism = window.Prism;

export default ({ jsCode }) => {
  const highlightedCode = Prism.highlight(jsCode ?? '', Prism.languages.jsx, 'jsx');
  return pre(code.fontMono({ dangerouslySetInnerHTML: { __html: highlightedCode } }));
};
