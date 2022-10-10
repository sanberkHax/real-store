import React from 'react';
import { addToCart, updateTotalQuantity } from '../../slices/cartSlice';
import { Button } from './../Button/Button';
import { useAppDispatch } from './../../app/hooks';
import { CartItem } from './../../slices/cartSlice';
interface BookItemProps {
  id: number;
  title: string;
  author: string;
  cover_url: string;
  pages: number;
  price: number;
  currency: string;
}

export const BookItem: React.FC<BookItemProps> = ({
  id,
  title,
  author,
  cover_url,
  pages,
  price,
  currency,
}) => {
  const dispatch = useAppDispatch();

  const addToCartHandler = () => {
    const bookItem: CartItem = {
      id,
      title,
      author,
      cover_url,
      pages,
      price,
      currency,
      quantity: 1,
    };
    dispatch(addToCart(bookItem));
    dispatch(updateTotalQuantity());
  };

  return (
    <li className="flex flex-col w-46 justify-between gap-2 items-center p-10 sm:p-8 md:p-6 lg:p-4 xl:p-2 hover:shadow-2xl text-center h-full">
      <img
        src={cover_url}
        alt={title}
        className="p-4 border-solid w-40 border-gray-400 border-2 rounded-md"
      />
      <h2 className="font-bold text-lg">{title}</h2>
      <h3 className="font-bold text-gray-500 text-sm">{author}</h3>
      <p className="self-center font-bold">{`${pages} Pages`}</p>
      <h2 className="font-bold text-xl self-end">{`${price} ${currency}`}</h2>
      <Button text="Add to Cart" onClick={addToCartHandler} />
    </li>
  );
};
