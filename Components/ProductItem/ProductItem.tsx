import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

type Props = {
  id: number;
  title: string;
  price: number;
  image?: string;
};
export const ProductItem = ({ id, title, price, image }: Props) => {
  return (
    <Link href={`/product/${id}`}>
      <div
        className={clsx(
          'cursor-pointer flex justify-center items-center h-full text-center flex-col gap-4 border-2 border-slate-200 p-4 dark:bg-slate-800 dark:border-slate-800'
        )}
      >
        <div className="relative w-24 h-24 sm:w-40 sm:h-40 dark:bg-white dark:border-4 dark:border-slate-900">
          <Image
            src={image}
            fill
            className="object-contain"
            unoptimized
            alt="Product Image"
          />
        </div>
        <h1 className="font-bold truncate w-full dark:text-white">{title}</h1>
        <h2 className="font-bold text-orange-600 dark:text-sky-500">
          ${price}
        </h2>
      </div>
    </Link>
  );
};
