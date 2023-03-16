import { useAppDispatch } from '@/redux/hooks';
import { changePrice, removeItem } from '@/redux/slices/cartSlice';
import Image from 'next/image';
import React, { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  price: number;
  image: string;
  quantity: number;
  title: string;
  id: number;
};
export const CartItem = ({ price, image, quantity, title, id }: Props) => {
  const [currentAmount, setCurrentAmount] = useState(quantity);

  const dispatch = useAppDispatch();

  const changeAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity === 0) {
      dispatch(removeItem(id));
      return;
    }
    setCurrentAmount(newQuantity);
    dispatch(changePrice({ id, quantity: newQuantity }));
    // updateTotalAmount();
  };

  const deleteHandler = () => {
    // deleteProduct(id);
  };

  //   useEffect(() => {
  // calcTotalPrice();
  //   }, [productsInCart, totalAmount]);

  return (
    <li
      className={
        'cursor-pointer flex justify-center items-center text-center gap-10'
      }
    >
      <div className="relative w-24 h-24 sm:w-40 sm:h-40 flex-1">
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
        $ {(price * quantity).toFixed(2)}
      </h2>
      <input
        type="number"
        name="amount"
        id="amount"
        value={currentAmount}
        onChange={changeAmountHandler}
        className="w-14 rounded-sm p-1 border-black border-2"
        min="0"
      />
    </li>
  );
};
