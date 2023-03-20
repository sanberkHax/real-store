import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="p-4 text-right bg-orange-500 text-white ">
      <p>
        Designed & Built by
        <Link
          href="https://www.sanberk.dev"
          className="font-bold hover:text-sky-800 "
        >
          &nbsp;Sanberk Türker
        </Link>
      </p>
    </footer>
  );
};
