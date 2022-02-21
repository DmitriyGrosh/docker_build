import React from 'react';
import api from '../shared/api';

const Home = () => {
  const handleGetUsers = async () => {
    try {
      const users = await api.get('/users');
      console.log('==========>user', users);
    } catch (e) {
      console.log('==========>e', e);
    }
  };
  return (
    <div>
      <span>Home</span>
      <button onClick={handleGetUsers}>Gey users</button>
    </div>
  );
};

export default Home;
