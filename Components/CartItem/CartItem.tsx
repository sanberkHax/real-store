import { useAppDispatch } from '@/redux/hooks';
import { changePrice, deleteItem } from '@/redux/slices/cartSlice';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

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

    // Prevent entering above 1000
    if (newQuantity > 1000) {
      return;
    }

    // Prevent entering 0 at the beginning
    if (e.target.value.search(/^0/) != -1) {
      e.target.value = e.target.value[1];
    }

    // Prevent the value from being 0
    if (newQuantity === 0 || e.target.value === '') {
      newQuantity = 1;
    }

    setCurrentQuantity(newQuantity);
    dispatch(changePrice({ id, quantity: newQuantity }));
  };

  const deleteHandler = () => {
    dispatch(deleteItem(id));
  };

  return (
    <li
      className={
        'flex justify-center items-center text-center gap-4 sm:gap-8 border-b-2 border-slate-300 p-4 flex-col sm:flex-row'
      }
    >
      <div className="relative w-24 h-24 sm:w-30 sm:h-30 md:w-40 md:h-40 flex-shrink-0 dark:border-4 dark:border-slate-900 dark:bg-white">
        <Image
          src={image}
          fill
          className="object-contain"
          unoptimized
          alt="Product Image"
        />
      </div>
      <h1 className="font-bold flex-1 dark:text-white">{title}</h1>
      <h2 className="font-bold text-orange-600 dark:text-sky-500">
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
        max="100"
        min="1"
      />
      <FaTrash
        className="cursor-pointer dark:fill-white hover:fill-slate-800"
        onClick={deleteHandler}
        title="delete"
      />
    </li>
  );
};
