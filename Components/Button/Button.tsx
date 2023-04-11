import clsx from 'clsx';
import React, { ButtonHTMLAttributes, ForwardRefRenderFunction } from 'react';
import { Spinner } from '@/Components/Spinner/Spinner';
import Link from 'next/link';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  link?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Btn: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  { className, link, text, ...props },
  ref
) => {
  if (link) {
    return (
      <Link
        href={link}
        className="h-10 px-4 sm:px-10 font-bold bg-orange-500 text-white rounded-md hover:bg-orange-600 active:scale-[0.9] dark:bg-sky-600  dark:hover:bg-slate-900 flex items-center justify-center"
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      className={clsx(
        'h-10 px-4 sm:px-10 font-bold bg-orange-500 text-white rounded-md hover:bg-orange-600 active:scale-[0.9] dark:bg-sky-600  dark:hover:bg-slate-900',
        props.disabled &&
          'bg-gray-700 hover:bg-gray-600 hover:dark-bg-gray-600',
        className
      )}
      ref={ref}
      {...props}
    >
      {props.disabled ? <Spinner /> : text}
    </button>
  );
};
export const Button = React.forwardRef(Btn);
