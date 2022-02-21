import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

import { useAppDispatch } from '../../../redux/hooks';
import { setUser } from '../../../redux/slices/userSlice';
import { API_URL, IAxiosRefreshResponse } from '../../../shared/api';

const AuthContainer: FC = ({ children }) => {
  const [pending, setPending] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const initAuth = async () => {
    try {
      const response = await axios.get<IAxiosRefreshResponse>(`${API_URL}/refresh`, { withCredentials: true });

      localStorage.setItem('token', response.data.accessToken);

      const data = {
        name: 'response.data.user.name',
        email: response.data.user.email,
        isAuth: true,
      };

      dispatch(setUser(data));
      setPending(true);
    } catch (e) {
      const data = {
        name: '',
        email: '',
        isAuth: false,
      };

      dispatch(setUser(data));
      setPending(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      initAuth();
    }
  }, []);

  if (!pending) {
    return <>Loading ...</>;
  }

  return <div className='auth-container'>{children}</div>;
};

export default AuthContainer;
