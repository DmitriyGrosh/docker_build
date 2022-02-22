import React, { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getRefresh } from '../../../redux/thunks';

const AuthContainer: FC = ({ children }) => {
  const { pending } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getRefresh());
    }
  }, []);

  if (pending) {
    return <>Loading ...</>;
  }

  return <div className='auth-container'>{children}</div>;
};

export default AuthContainer;
