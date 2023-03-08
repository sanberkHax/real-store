import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BookItem } from '@/Components/BookItem/BookItem';
import { getBooks, selectBooks } from '@/redux/slices/booksSlice';
import { useAppDispatch } from '@/redux/hooks';
import { GetStaticProps } from 'next';
import { ProductItem } from '@/Components/ProductItem/ProductItem';

function Home({ products }) {
  const dispatch = useAppDispatch();
  // const books = useSelector(selectBooks);

  console.log(products);
  // useEffect(() => {
  //   if (books.length === 0) {
  //     dispatch(getBooks());
  //   }
  // }, [dispatch, books]);

  return (
    <main className="flex-1 px-2 sm:px-4 md:px-8 lg:px-10 xl:px-24 py-8 mt-10">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 place-items-center gap-8">
        {products.map(({ id, title, image, price }) => (
          <ProductItem
            key={id}
            id={id}
            title={title}
            price={price}
            image={image}
          />
        ))}
      </ul>
    </main>
  );
}

export default Home;

type Products = [
  {
    createdAt: string;
    id: number;
    title: string;
    image: string;
    category: string;
    description: string;
    price: string;
  }
];

export const getStaticProps: GetStaticProps<{}> = async (context) => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products: Products[] = await res.json();

  return {
    props: {
      products,
    },
  };
};
