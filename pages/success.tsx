import { Button } from '@/Components/Button/Button';
import { useAppDispatch } from '@/redux/hooks';
import { emptyCart } from '@/redux/slices/cartSlice';
import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const continueHandler = () => {
    dispatch(emptyCart());
    router.push('/');
  };

  return (
    <main className="flex-1 px-20 sm:px-4 md:px-8 lg:px-10 xl:px-24 py-8 flex flex-col justify-center items-center gap-4 sm:gap-10">
      <h1 className="font-bold text-3xl">Order Succesful!</h1>
      <Button text="Continue Shopping" onClick={continueHandler} />
    </main>
  );
}
