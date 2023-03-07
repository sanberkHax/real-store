import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="bg-red-400 rounded w-full lg text-white font-bold px-4 py-2 text-center hover:bg-red-600 active:scale-90"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
