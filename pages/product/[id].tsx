import { GetStaticProps, GetStaticPaths } from 'next';
import { Product } from '@/types/product';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { addToCart } from '@/redux/slices/cartSlice';

function ProductDetail({ product }) {
  const dispatch = useAppDispatch();

  const addToCartHandler = () => {
    const productItem = {
      ...product,
      quantity: 1,
    };
    dispatch(addToCart(productItem));
  };

  return (
    <main className="flex flex-col justify-center items-center h-full p-10 sm:p-20 text-center gap-10 lg:px-24 2xl:px-72">
      <div className="relative w-36 h-36 sm:w-52 sm:h-52 bg-white">
        <Image
          alt={product.title}
          src={product.image}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <h1 className="font-bold text-lg sm:text-xl">{product.title}</h1>
      <h2 className="text-orange-600 font-bold text-lg sm:text-xl">{`$${product.price}`}</h2>
      <p>{product.description}</p>
      <button
        onClick={addToCartHandler}
        className="font-bold rounded-md bg-yellow-400 p-3 hover:bg-yellow-300"
      >
        Add To Cart
      </button>
    </main>
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
    fallback: true,
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
    },
  };
};
