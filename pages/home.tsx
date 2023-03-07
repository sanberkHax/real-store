import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BookItem } from '@/Components/BookItem/BookItem';
import { getBooks, selectBooks } from '@/redux/slices/booksSlice';
import { useAppDispatch } from '@/redux/hooks';

export default function Home() {
  const dispatch = useAppDispatch();
  const books = useSelector(selectBooks);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(getBooks());
    }
  }, [dispatch, books]);

  return (
    <main className="flex-1 px-2 sm:px-4 md:px-8 lg:px-10 xl:px-24 py-8 mt-10">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 place-items-center gap-8">
        {books.map(
          ({ id, title, author, cover_url, currency, pages, price }) => (
            <BookItem
              type="vertical"
              key={id}
              id={id}
              title={title}
              author={author}
              cover_url={cover_url}
              pages={pages}
              currency={currency}
              price={price}
            />
          )
        )}
      </ul>
    </main>
  );
}
