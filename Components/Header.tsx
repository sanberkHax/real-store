import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import {
  selectCartArray,
  selectTotalPrice,
  selectTotalQuantity,
  updateTotalPrice,
  updateTotalQuantity,
} from '@/redux/slices/cartSlice';
import { Button } from './Button/Button';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';

export const Header = () => {
  const cart = useSelector(selectCartArray);
  const totalQuantity = useSelector(selectTotalQuantity);
  const dispatch = useAppDispatch();
  const totalPrice = useSelector(selectTotalPrice);

  const router = useRouter();

  useEffect(() => {
    dispatch(updateTotalQuantity());
    dispatch(updateTotalPrice());
  }, [cart, dispatch]);

  return (
    <header className="w-full h-10 flex justify-between items-center fixed bg-white px-2 sm:px-4 md:px-8 lg:px-10 py-8 z-10">
      <Link href="/" className="font-bold text-2xl sm:text-3xl text-red-400">
        Real Store
      </Link>
      {router.pathname === '/cart' && cart.length !== 0 ? (
        <>
          <p className="font-bold">
            <span>Total Price:$</span>
            {totalPrice}
          </p>
          <Button text="Checkout" onClick={() => router.push('/checkout')} />
        </>
      ) : (
        <Link
          href="/cart"
          className="flex justify-between gap-8 items-center relative"
        >
          <FaShoppingCart size={30} title="Cart" />
          <div className="rounded-full bg-orange-500 text-white w-8 h-8 absolute top-5 right-6 flex justify-center items-center">
            <p className="font-bold">{totalQuantity}</p>
          </div>
        </Link>
      )}
    </header>
  );
};
