import { useState } from 'react';
import reactLogo from './assets/logo-react.svg';

export default function JSX() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-600 mb-4">
        Hello world from <span className="text-react">JSX</span>
      </h1>
      <button className="mb-4 custom-button" onClick={() => setCount((count) => count + 1)}>
        Clicked : {count}
      </button>
      <div className="flex items-center gap-2.5">
        <a href="https://react.dev/learn/writing-markup-with-jsx" target="_blank" rel="noreferrer">
          <img className="h-8 w-8" src={reactLogo} alt="React logo"></img>
        </a>
        <p className="text-black dark:text-white">Click on the React logo to read the React JSX documentation</p>
      </div>
    </div>
  );
}
