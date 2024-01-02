export default '' +
  "import { useState } from 'react';\n" +
  "import reactLogo from './assets/logo-react.svg';\n" +
  '\n' +
  'export default function JSX() {\n' +
  '  const [count, setCount] = useState(0);\n' +
  '\n' +
  '  return (\n' +
  '    <div className="p-8">\n' +
  '      <h1 className="text-3xl font-bold text-slate-600 mb-4">\n' +
  '        Hello world from <span className="text-react">JSX</span>\n' +
  '      </h1>\n' +
  '      <button className="mb-4 custom-button" onClick={() => setCount((count) => count + 1)}>\n' +
  '        Clicked : {count}\n' +
  '      </button>\n' +
  '      <div className="flex items-center gap-2.5">\n' +
  '        <a href="https://react.dev/learn/writing-markup-with-jsx" target="_blank" rel="noreferrer">\n' +
  '          <img className="min-h-8 min-w-8" src={reactLogo} alt="React logo"></img>\n' +
  '        </a>\n' +
  '        <p className="text-black dark:text-white">Click on the React logo to read the React JSX documentation</p>\n' +
  '      </div>\n' +
  '    </div>\n' +
  '  );\n' +
  '}';
