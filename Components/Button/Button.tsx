import React from 'react';

type Props = {
  text: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({ text, onClick }: Props) => {
  return (
    <button
      className="bg-red-400 rounded lg text-white font-bold px-4 py-2 text-center hover:bg-red-600 active:scale-90"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
