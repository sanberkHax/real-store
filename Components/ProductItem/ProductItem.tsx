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
          'cursor-pointer flex justify-center items-center h-full text-center flex-col gap-4 border-2 border-slate-200 p-4'
        )}
      >
        <div className="relative w-24 h-24 sm:w-40 sm:h-40">
          <Image
            src={image}
            fill
            className="object-contain"
            unoptimized
            alt="Product Image"
          />
        </div>
        <h1 className="font-bold truncate w-full">{title}</h1>
        <h2 className="font-bold text-orange-600">${price}</h2>
      </div>
    </Link>
  );
};
