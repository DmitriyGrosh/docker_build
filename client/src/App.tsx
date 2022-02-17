import React, { useState } from 'react';
import image from './assets/youtube.png';

import './style.scss';

const App = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className='container'>
      <img src={image} alt='data' />
      Start Project {process.env.NODE_ENV}
      <button onClick={() => setCount((prevState) => prevState + 1)}>count</button>
      {count}
    </div>
  );
};

App.displayName = 'App';

export default App;
