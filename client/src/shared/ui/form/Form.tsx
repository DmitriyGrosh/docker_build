import React, { FC, FormEvent } from 'react';

import './Form.scss';

interface IForm {
  onSubmit: (e?: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

const Form: FC<IForm> = ({ children, onSubmit, className }) => (
  <form className={className ? `form-container ${className}` : 'form-container'} onSubmit={onSubmit}>
    {children}
  </form>
);

export default Form;
