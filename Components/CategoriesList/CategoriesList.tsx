import Link from 'next/link';

type Props = {
  categories: string[];
};

export const CategoriesList = ({ categories }: Props) => {
  return (
    <ul className="flex dark:bg-sky-600 bg-orange-500 justify-around items-center text-white font-bold text-md sm:text-xl text-center flex-wrap sm:flex-nowrap">
      {categories.map((c, i) => (
        <li key={i} className="flex items-center justify-center">
          <Link
            href={`/products/${c
              .replace("'", '')
              .replace(/\s+/g, '-')
              .toLowerCase()}`}
            className="dark:hover:bg-sky-500 hover:bg-orange-600 p-4"
          >
            {c}
          </Link>
        </li>
      ))}
    </ul>
  );
};
