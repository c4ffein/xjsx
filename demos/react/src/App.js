import { _ } from '../xjsx';
import XJSX from './XJSX';
import JSX from './JSX';

// We could just use
// _.flex.wScreen(
// but this is a simple example of mixing xjsx Proxy capabilities and React className
const App = () => _.hFull.flex.itemsCenter({ className: 'w-screen' })(_.w1_2(JSX()), _.w1_2(XJSX()));

export default App;
