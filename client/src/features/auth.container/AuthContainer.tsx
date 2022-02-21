import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { API_URL, IAxiosRefreshResponse } from '../../shared/api';

const AuthContainer: FC = ({ children }) => {
  const initAuth = async () => {
    try {
      const response = await axios.get<IAxiosRefreshResponse>(`${API_URL}/refresh`, { withCredentials: true });

      localStorage.setItem('token', response.data.accessToken);
    } catch (e) {
      console.log('==========>e', e);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      initAuth();
    }
  }, []);

  return <div className='auth-container'>{children}</div>;
};

export default AuthContainer;
