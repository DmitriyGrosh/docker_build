import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import api, { IAxiosRefreshResponse } from '../shared/api';
import Form from '../shared/ui/form';

type FormValues = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const { handleSubmit, register } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('==========>data', data);
    try {
      const user = await api.post<IAxiosRefreshResponse>('/login', data);
      console.log('==========>user', user);

      localStorage.setItem('token', user.data.accessToken);
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
