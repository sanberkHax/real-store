import { ReactComponent as CartIcon } from '../assets/cartIcon.svg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './../app/hooks';
import {
  selectCartArray,
  selectTotalQuantity,
  updateTotalQuantity,
} from './../slices/cartSlice';

export const Header = () => {
  const cart = useSelector(selectCartArray);
  const totalQuantity = useSelector(selectTotalQuantity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateTotalQuantity());
  }, [cart, dispatch]);

  return (
    <header className="w-full h-10 flex justify-between items-center fixed bg-white px-2 sm:px-4 md:px-8 lg:px-10 py-8">
      <Link to="/" className="font-bold text-2xl sm:text-3xl text-red-400">
        Book Store
      </Link>
      <Link
        to="/my-cart"
        className="flex justify-between gap-8 items-center relative"
      >
        <h1 className="font-bold text-xl sm:text-2xl">My Cart</h1>
        <CartIcon />
        <div className="rounded-full bg-red-400 w-8 h-8 absolute top-5 right-6 flex justify-center items-center">
          <p className="font-bold">{totalQuantity}</p>
        </div>
      </Link>
    </header>
  );
};
