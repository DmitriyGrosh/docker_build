import React, { FC, ComponentType, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Login from '../view/Login';
import Home from '../view/Home';
import Header from '../widgets/Header';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}>
        <Route path='/' element={<Home />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  );
};

export default Router;
