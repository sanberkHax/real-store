import React from 'react';
import { Button } from './../Button/Button';
interface BookItemProps {
  title: string;
  author: string;
  cover: string;
  pages: number;
  price: number;
  currency: string;
}

export const BookItem: React.FC<BookItemProps> = ({
  title,
  author,
  cover,
  pages,
  price,
  currency,
}) => {
  return (
    <li className="flex flex-col w-46 justify-between gap-2 items-center p-10 sm:p-8 md:p-6 lg:p-4 xl:p-2 hover:shadow-2xl text-center h-full">
      <img
        src={cover}
        alt={title}
        className="p-4 border-solid w-40 border-gray-400 border-2 rounded-md"
      />
      <h2 className="font-bold text-lg">{title}</h2>
      <h3 className="font-bold text-gray-500 text-sm">{author}</h3>
      <p className="self-center font-bold">{`${pages} Pages`}</p>
      <h2 className="font-bold text-xl self-end">{`${price} ${currency}`}</h2>
      <Button text="Add to Cart" onClick={() => {}} />
    </li>
  );
};
