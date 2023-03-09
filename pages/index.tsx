import { GetStaticProps } from 'next';
import { ProductItem } from '@/Components/ProductItem/ProductItem';
import { Product } from '@/types/product';
import { ProductList } from '@/Components/ProductList/ProductList';

function Home({ products }) {
  return (
    <main className="flex-1 px-2 sm:px-4 md:px-8 lg:px-10 xl:px-24 py-8 mt-10">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 place-items-center gap-8">
        <ProductList list={products} />
      </ul>
    </main>
  );
}

export default Home;

export const getStaticProps: GetStaticProps<{
  products: Product[];
}> = async (context) => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products: Product[] = await res.json();

  return {
    props: {
      products,
    },
  };
};
