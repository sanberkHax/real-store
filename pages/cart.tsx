import { selectCartArray } from '@/redux/slices/cartSlice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { BookItem } from '@/Components/BookItem/BookItem';
import { Button } from '@/Components/Button/Button';

export default function MyCart() {
  const cart = useSelector(selectCartArray);
  const router = useRouter();

  const nextPageHandler = () => {
    router.push('/checkout');
  };

  const goBackHandler = () => {
    router.push('/');
  };

  return (
    <main className="flex-1 px-2 sm:px-4 md:px-8 lg:px-10 xl:px-24 py-8 flex flex-col gap-4 mt-10">
      {cart.length === 0 ? (
        <div className="flex flex-col gap-4 items-center justify-center m-auto">
          <p className="font-bold">Your Cart Is Empty</p>
          <Button text="Go back" onClick={goBackHandler} />
        </div>
      ) : (
        <>
          <ul className="flex flex-col gap-4">
            {cart.map(
              ({
                id,
                title,
                author,
                cover_url,
                currency,
                pages,
                price,
                quantity,
              }) => (
                <BookItem
                  type="horizontal"
                  key={id}
                  id={id}
                  title={title}
                  author={author}
                  cover_url={cover_url}
                  pages={pages}
                  quantity={quantity}
                  currency={currency}
                  price={price}
                />
              )
            )}
          </ul>
          <div className="w-40 self-center md:self-end">
            <Button text="Next" onClick={nextPageHandler} />
          </div>
        </>
      )}
    </main>
  );
}
