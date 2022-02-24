import React, { FC, ComponentType, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Login from '../view/login';
import Home from '../view/Home';
import Register from '../view/register';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}>
        <Route path='/' element={<Home />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};

export default Router;
