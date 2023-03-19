import clsx from 'clsx';
import React, { ButtonHTMLAttributes, ForwardRefRenderFunction } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Btn: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  { className, text, ...props },
  ref
) => {
  return (
    <button
      className={clsx(
        'h-10 px-10 font-bold bg-orange-500 text-white rounded-md',
        className
      )}
      ref={ref}
      {...props}
    >
      {text}
    </button>
  );
};
export const Button = React.forwardRef(Btn);
