import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import api, { IAxiosRefreshResponse } from '../../shared/api';
import { setLogin } from '../../redux/slices';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import Form from '../../shared/ui/form';
import Input from '../../shared/ui/input';
import Button from '../../shared/ui/button';
import Spinner from '../../shared/ui/spinner';

import './Register.scss';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pending } = useAppSelector((state) => state.user);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const user = await api.post<IAxiosRefreshResponse>('/registration', values);

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
    navigate('/login');
  };

  return (
    <div className='login-container'>
      <h1>Регистрация</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='border-container'>
          <Input error={!!errors.name} placeholder='Имя' type='text' {...register('name', { required: true })} />
          <Input error={!!errors.email} placeholder='Почта' type='email' {...register('email', { required: true })} />
          <Input
            error={!!errors.password}
            placeholder='Пароль'
            type='password'
            {...register('password', { required: true })}
          />
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={handleRedirect} className='middleware'>
          <span>Уже заррегестрированы ?</span>
        </div>
        <Button type='submit'>Зарегестрироваться</Button>
      </Form>
      {pending && <Spinner />}
    </div>
  );
};

export default Register;
