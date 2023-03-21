import { OrderForm } from '@/Components/OrderForm/OrderForm';
import { useSelector } from 'react-redux';
import { selectCartArray, selectTotalPrice } from '@/redux/slices/cartSlice';
import { Button } from '@/Components/Button/Button';
import { useRouter } from 'next/router';
import { Meta } from '@/Components/Meta/Meta';

export default function Checkout() {
  const cart = useSelector(selectCartArray);
  const totalPrice = useSelector(selectTotalPrice);
  const router = useRouter();

  const goBackHandler = () => {
    router.push('/');
  };

  return (
    <>
      <Meta
        title="Checkout"
        desc="Complete your order"
        canonical="https://real-store.sanberk.dev/checkout"
      />

      <main className="flex-1 dark:bg-slate-700 min-h-screen px-4 md:px-8 lg:px-10 xl:px-24 py-8 flex flex-col justify-center items-center gap-4 sm:gap-10">
        {cart.length === 0 ? (
          <div className="flex flex-col gap-4 items-center justify-center m-auto">
            <h1 className="font-bold text-xl dark:text-white">
              Your Cart Is Empty
            </h1>
            <Button text="Continue Shopping" onClick={goBackHandler} />
          </div>
        ) : (
          <>
            <h1 className="font-bold text-xl dark:text-white">
              Total:
              <span className="font-bold text-orange-500 text-xl dark:text-sky-500">
                {` $${totalPrice}`}
              </span>
            </h1>

            <OrderForm />
          </>
        )}
      </main>
    </>
  );
}
