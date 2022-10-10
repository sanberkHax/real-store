import { ReactComponent as CartIcon } from '../assets/cartIcon.svg';

export const Header = () => {
  return (
    <header className="w-full h-10 flex justify-between items-center sticky top-0 bg-white px-2 sm:px-4 md:px-8 lg:px-10 py-8">
      <h1 className="font-bold text-2xl sm:text-3xl text-red-400">
        Book Store
      </h1>
      <button className="flex justify-between gap-8 items-center relative">
        <h1 className="font-bold text-xl sm:text-2xl">My Cart</h1>
        <CartIcon />
        <div className="rounded-full bg-red-400 w-8 h-8 absolute top-5 right-6 flex justify-center items-center">
          <p className="font-bold">0</p>
        </div>
      </button>
    </header>
  );
};
