import { OrderForm } from '@/Components/OrderForm/OrderForm';
import { useSelector } from 'react-redux';
import { selectCartArray, selectTotalPrice } from '@/redux/slices/cartSlice';
import { Button } from '@/Components/Button/Button';
import { useRouter } from 'next/router';

export default function Checkout() {
  const cart = useSelector(selectCartArray);
  const totalPrice = useSelector(selectTotalPrice);
  const router = useRouter();

  const goBackHandler = () => {
    router.push('/');
  };

  return (
    <main className="flex-1 px-20 sm:px-4 md:px-8 lg:px-10 xl:px-24 py-8 flex flex-col justify-center items-center gap-4 sm:gap-10">
      {cart.length === 0 ? (
        <div className="flex flex-col gap-4 items-center justify-center m-auto">
          <p className="font-bold">Your Cart Is Empty</p>
          <Button text="Go back" onClick={goBackHandler} />
        </div>
      ) : (
        <>
          <h1 className="font-bold text-xl">
            Total:
            <span className="font-bold text-orange-500 text-xl">
              {` $${totalPrice}`}
            </span>
          </h1>

          <OrderForm />
        </>
      )}
    </main>
  );
}
