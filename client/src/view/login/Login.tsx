import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import api, { IAxiosRefreshResponse } from '../../shared/api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setLogin } from '../../redux/slices';

import Form from '../../shared/ui/form';
import Input from '../../shared/ui/input';
import Spinner from '../../shared/ui/spinner';
import Button from '../../shared/ui/button';

import './Login.scss';

type FormValues = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();
  const { pending } = useAppSelector((state) => state.user);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const user = await api.post<IAxiosRefreshResponse>('/login', values);

      localStorage.setItem('token', user.data.accessToken);

      const data = {
        name: user.data.user.name,
        email: user.data.user.email,
      };

      dispatch(setLogin(data));
      navigate('/');
    } catch (e) {
      console.log('==========>e', e);
    }
  };

  const handleRedirect = () => {
    navigate('/register');
  };

  return (
    <div className='login-container'>
      <h1>Авторизация</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='border-container'>
          <Input
            error={!!errors.email}
            className='login-input'
            placeholder='Почта'
            type='email'
            {...register('email', { required: true })}
          />
          <Input
            error={!!errors.password}
            className='login-input'
            placeholder='Пароль'
            type='password'
            {...register('password', { required: true })}
          />
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={handleRedirect} className='middleware'>
          <span>зарегестрироваться</span>
        </div>
        <Button type='submit'>Войти</Button>
      </Form>
      {pending && <Spinner />}
    </div>
  );
};

export default Login;
