import React, { FC } from 'react';

import './Button.scss';

type ButtonTypes = 'submit';

interface IButton {
  type?: ButtonTypes;
  className?: string;
}

const Button: FC<IButton> = ({ type, className, children }) => {
  return (
    <button type={type} className={className ? `button-container ${className}` : 'button-container'}>
      {children}
    </button>
  );
};

export default Button;
