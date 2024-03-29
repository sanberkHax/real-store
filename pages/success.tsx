import { Button } from '@/Components/Button/Button';
import { Meta } from '@/Components/Meta/Meta';
import { useAppDispatch } from '@/redux/hooks';
import { emptyCart } from '@/redux/slices/cartSlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Success() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const continueHandler = () => {
    router.push('/');
  };

  useEffect(() => {
    dispatch(emptyCart());
  }, [dispatch]);

  return (
    <>
      <Meta
        title="Order Succesful"
        desc="You have succesfully placed an order!"
        canonical="https://real-store.sanberk.dev/success"
      />
      <main className="flex-1 px-20 sm:px-4 md:px-8 lg:px-10 xl:px-24 py-8 flex flex-col justify-center items-center gap-4 sm:gap-10 dark:bg-slate-700 min-h-screen">
        <h1 className="font-bold text-3xl dark:text-white">Order Succesful!</h1>
        <Button text="Continue Shopping" onClick={continueHandler} />
      </main>
    </>
  );
}
