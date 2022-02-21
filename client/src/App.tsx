import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AuthContainer from './features/auth.container/ui/AuthContainer';
import Router from './router';

import { store } from './redux/store';

import './style.scss';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AuthContainer>
        <Router />
      </AuthContainer>
    </BrowserRouter>
  </Provider>
);

App.displayName = 'App';

export default App;
