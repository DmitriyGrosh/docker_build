import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AuthContainer from './features/auth.container/AuthContainer';
import Router from './router';

import './style.scss';

const App = () => (
  <AuthContainer>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </AuthContainer>
);

App.displayName = 'App';

export default App;
