import {
  selectCartArray,
  selectTotalPrice,
  updateTotalPrice,
} from '@/redux/slices/cartSlice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Button } from '@/Components/Button/Button';
import { CartItem } from '@/Components/CartItem/CartItem';
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';

export default function MyCart() {
  const cart = useSelector(selectCartArray);
  const totalPrice = useSelector(selectTotalPrice);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const goBackHandler = () => {
    router.push('/');
  };

  // useEffect(() => {
  //   if (cart.length !== 0) {

  //   }
  // }, [cart]);

  return (
    <main className="flex-1 px-2 sm:px-4 md:px-8 lg:px-10 xl:px-24 py-8 flex flex-col gap-4 mt-10">
      {cart.length === 0 ? (
        <div className="flex flex-col gap-4 items-center justify-center m-auto">
          <p className="font-bold">Your Cart Is Empty</p>
          <Button text="Go back" onClick={goBackHandler} />
        </div>
      ) : (
        <div className="flex gap-10 m-auto h-full">
          <ul className="flex flex-col gap-4">
            {cart?.map(({ id, image, title, price, quantity }) => (
              <CartItem
                key={id}
                id={id}
                title={title}
                quantity={quantity}
                price={price}
                image={image}
              />
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
