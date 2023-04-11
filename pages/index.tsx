import { GetStaticProps } from 'next';
import { Product } from '@/types/product';
import { ProductList } from '@/Components/ProductList/ProductList';
import { Meta } from '@/Components/Meta/Meta';
import { CategoriesList } from '@/Components/CategoriesList/CategoriesList';
import { CATEGORIES } from '@/constants/CATEGORIES';

function Home({ products }) {
  return (
    <>
      <Meta
        title="Real Store"
        desc="E-commerce store made with Fake Store API"
        canonical="https://real-store.sanberk.dev/"
      />
      <main className="flex-1 px-2 flex flex-col gap-10 sm:px-4 md:px-8 lg:px-10 xl:px-40 2xl:px-48 h-full py-8 mt-14 dark:bg-slate-700 ">
        <CategoriesList categories={CATEGORIES} />
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 place-items-stretch gap-8 ">
          <ProductList list={products} />
        </ul>
      </main>
    </>
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
