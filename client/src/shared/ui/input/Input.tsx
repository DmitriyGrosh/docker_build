import React, { FC, forwardRef } from 'react';
import cx from "classnames";

import './Input.scss';

type InputTypes = 'submit' | 'text' | 'email' | 'password' | 'number';

interface IInput {
  type: InputTypes;
  className?: string;
  name: string;
  placeholder?: string;
  error?: boolean;
}

const Input: FC<IInput> = forwardRef<HTMLInputElement, IInput>(
  ({ type, className, name, placeholder, error, ...props }, ref) => {
    const inputClassname = cx(className, 'input-default', { error });
    return (
      <div className='input-container'>
        <input type={type} className={inputClassname} name={name} ref={ref} placeholder={placeholder} {...props} />
      </div>
    );
  },
);

export default Input;
