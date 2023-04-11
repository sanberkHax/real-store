import { GetStaticProps, GetStaticPaths } from 'next';
import { Product } from '@/types/product';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { addToCart } from '@/redux/slices/cartSlice';
import { Button } from '@/Components/Button/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Meta } from '@/Components/Meta/Meta';

function ProductDetail({ product, url }) {
  const dispatch = useAppDispatch();

  const [effect, setEffect] = useState(false);

  const addToCartHandler = () => {
    const productItem = {
      ...product,
      quantity: 1,
    };
    toast.success('Product Added!', {
      className: 'dark:bg-slate-800',
    });
    dispatch(addToCart(productItem));
    setEffect(true);
  };

  return (
    <>
      <Meta title={product.title} desc={product.description} canonical={url} />
      <main className="flex flex-col min-h-screen justify-center items-center h-full p-10 sm:p-20 text-center gap-4 dark:bg-slate-700 md:gap-10 lg:px-24 2xl:px-72">
        <div className="relative w-36 h-36 sm:w-52 sm:h-52 bg-white dark:border-4 dark:border-slate-900">
          <Image
            alt={product?.title}
            src={product?.image}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <h1 className="font-bold text-lg sm:text-xl dark:text-white">
          {product?.title}
        </h1>
        <h2 className="text-orange-600 dark:text-sky-500 font-bold text-lg sm:text-xl ">{`$${product?.price}`}</h2>
        <p className="text-sm sm:text-md lg:px-14 xl:px-20 dark:text-white">
          {product?.description}
        </p>
        <Button
          text={effect ? '+1' : 'Add To Cart'}
          onClick={addToCartHandler}
          className={effect && 'animate-colorShift'}
          onAnimationEnd={() => setEffect(false)}
        />
      </main>
    </>
  );
}

export default ProductDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`https://fakestoreapi.com/products`);
  const products = await res.json();
  const paths = products.map((product: Product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  product: Product;
}> = async (context) => {
  const id = context.params.id;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product: Product = await res.json();

  return {
    props: {
      product,
      url: `https://real-store.sanberk.dev/products/${id}`,
    },
  };
};
