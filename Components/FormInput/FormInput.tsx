import React, { InputHTMLAttributes, ForwardRefRenderFunction } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  ref?: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { name, label, ...otherProps },
  ref
) => {
  return (
    <label className="flex flex-col gap-2 font-bold">
      {label}
      <input
        {...otherProps}
        name={name}
        ref={ref}
        className="px-2 font-normal border-2 border-slate-400 w-full"
      />
    </label>
  );
};

export const FormInput = React.forwardRef(Input);
