import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import api, { IAxiosRefreshResponse } from '../shared/api';
import Form from '../shared/ui/form';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

type FormValues = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit, register } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const user = await api.post<IAxiosRefreshResponse>('/login', values);
      console.log('==========>user', user);

      localStorage.setItem('token', user.data.accessToken);

      const data = {
        name: user.data.user.name,
        email: user.data.user.email,
        isAuth: true,
      };
    } catch (e) {
      console.log('==========>e', e);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input type='email' {...register('email')} />
        <input type='password' {...register('password')} />

        <input type='submit' />
      </Form>
    </div>
  );
};

export default Login;
