import { addToCart, removeItem } from '@/redux/slices/cartSlice';
import { Button } from './../Button/Button';
import { useAppDispatch } from '@/redux/hooks';
import { CartItem } from '@/redux/slices/cartSlice';

interface BookItemProps {
  id: number;
  title: string;
  author: string;
  cover_url: string;
  pages: number;
  price: number;
  currency: string;
  quantity?: number;
  type: 'vertical' | 'horizontal';
}

export const BookItem: React.FC<BookItemProps> = ({
  id,
  title,
  author,
  cover_url,
  pages,
  price,
  currency,
  type,
  quantity,
}) => {
  const dispatch = useAppDispatch();

  const addToCartHandler = () => {
    const bookItem: CartItem = {
      id,
      title,
      author,
      cover_url,
      pages,
      price,
      currency,
      quantity: 1,
    };
    dispatch(addToCart(bookItem));
  };

  const removeItemHandler = () => {
    dispatch(removeItem(id));
  };

  if (type === 'horizontal') {
    return (
      <li className="flex w-46 flex-col md:flex-row justify-between gap-2 md:gap-10 items-center p-4 rounded-md hover:shadow-2xl text-center h-full border-b-2">
        <img
          src={cover_url}
          alt={title}
          className="p-4 border-solid w-40 border-gray-400 border-2 rounded-md"
        />
        <h2 className="font-bold text-lg flex-1">{title}</h2>
        <h3 className="font-bold text-gray-500 text-sm flex-1">{author}</h3>
        <p className="self-center font-bold flex-1">{`${pages} Pages`}</p>
        <div className="flex flex-col gap-2 text-center">
          <h2 className="font-bold text-xl">{`${price} ${currency}`}</h2>
          <h2 className="font-bold text-xl">{`Quantity: ${quantity}`}</h2>
        </div>
        <button
          data-testid="delete-book"
          className="fill-red-400 hover:fill-red-600"
          onClick={removeItemHandler}
        >
          <img src="/trashIcon.svg" alt="Trash icon" />
        </button>
      </li>
    );
  }
  return (
    <li className="flex flex-col w-46 justify-between gap-2 items-center p-10 sm:p-8 md:p-6 lg:p-4 xl:p-2 hover:shadow-2xl text-center h-full">
      <img
        src={cover_url}
        alt={title}
        className="p-4 border-solid w-40 border-gray-400 border-2 rounded-md h-52"
      />
      <h2 className="font-bold text-lg">{title}</h2>
      <h3 className="font-bold text-gray-500 text-sm">{author}</h3>
      <p className="self-center font-bold">{`${pages} Pages`}</p>
      <h2 className="font-bold text-xl self-end">{`${price} ${currency}`}</h2>
      <Button text="Add to Cart" onClick={addToCartHandler} />
    </li>
  );
};
