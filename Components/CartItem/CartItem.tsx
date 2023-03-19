import { useAppDispatch } from '@/redux/hooks';
import { changePrice, deleteItem } from '@/redux/slices/cartSlice';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

type Props = {
  price: number;
  image: string;
  quantity: number;
  title: string;
  id: number;
};
export const CartItem = ({ price, image, quantity, title, id }: Props) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const dispatch = useAppDispatch();

  const changeQuantityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = Number(e.target.value);

    // Prevent quantity input from being 0
    if (newQuantity === 0 || e.target.value === '') {
      newQuantity = 1;
    }

    newQuantity = Number(e.target.value);
    setCurrentQuantity(newQuantity);
    dispatch(changePrice({ id, quantity: newQuantity }));
  };

  const deleteHandler = () => {
    dispatch(deleteItem(id));
  };

  return (
    <li
      className={
        'flex justify-center items-center text-center gap-4 sm:gap-10 border-b-2 border-slate-300 p-4 flex-col sm:flex-row'
      }
    >
      <div className="relative w-24 h-24 sm:w-40 sm:h-40 sm:flex-1">
        <Image
          src={image}
          fill
          className="object-contain"
          unoptimized
          alt="Product Image"
        />
      </div>
      <h1 className="font-bold flex-1">{title}</h1>
      <h2 className="font-bold text-orange-600 flex-1">
        ${(price * quantity).toFixed(2)}
      </h2>
      <input
        aria-label="quantity-input"
        type="number"
        name="quantity"
        id="quantity"
        value={currentQuantity}
        onChange={changeQuantityHandler}
        className="w-14 rounded-sm p-1 border-black border-2"
        min="1"
      />
      <FaTrash
        className="cursor-pointer"
        onClick={deleteHandler}
        title="delete"
      />
    </li>
  );
};
