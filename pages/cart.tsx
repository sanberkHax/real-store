import {
  selectCartArray,
  selectTotalPrice,
  updateTotalPrice,
} from '@/redux/slices/cartSlice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Button } from '@/Components/Button/Button';
import { CartItem } from '@/Components/CartItem/CartItem';

export default function Cart() {
  const cart = useSelector(selectCartArray);
  const router = useRouter();

  const goBackHandler = () => {
    router.push('/');
  };

  return (
    <main className="flex-1 px-2 sm:px-4 md:px-8 lg:px-10 xl:px-24 py-8 flex flex-col gap-4 mt-10">
      {cart.length === 0 ? (
        <div className="flex flex-col gap-4 items-center justify-center m-auto">
          <h1 className="font-bold text-xl">Your Cart Is Empty</h1>
          <Button text="Continue Shopping" onClick={goBackHandler} />
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
