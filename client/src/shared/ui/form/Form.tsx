import React, { FC, FormEvent } from 'react';

import './Form.scss';

interface IForm {
  onSubmit: (e?: FormEvent<HTMLFormElement>) => void;
}

const Form: FC<IForm> = ({ children, onSubmit }) => (
  <form className='form-container' onSubmit={onSubmit}>
    {children}
  </form>
);

export default Form;
