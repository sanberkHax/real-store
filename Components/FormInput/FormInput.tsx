import React, { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  ref?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, Props>(
  ({ name, label, ...otherProps }, ref) => {
    return (
      <label className="flex flex-col gap-2 font-bold">
        {label}
        <input
          {...otherProps}
          name={name}
          ref={ref}
          className="px-2 font-normal border-2 border-slate-400"
        />
      </label>
    );
  }
);
