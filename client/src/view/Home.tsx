import React, { useRef, useEffect, useState } from 'react';
import api from '../shared/api';

const Home = () => {
  const [count, setCount] = useState<Array<number>>([1]);

  const handleGetUsers = async () => {
    try {
      const users = await api.get('/users');
      console.log('==========>user', users);
    } catch (e) {
      console.log('==========>e', e);
    }
  };

  const handleCount = () => {
    setCount((prev) => [...prev, prev[prev.length - 1] + 1]);
  };

  return (
    <div>
      {count.map((el) => (
        <span key={el}>{el}</span>
      ))}
      <span>Home</span>
      <button onClick={handleCount}>change count</button>
      <button onClick={handleGetUsers}>Gey users</button>
    </div>
  );
};

export default Home;
