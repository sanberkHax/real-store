import Link from 'next/link';
import { Header } from './Header';

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen gap-10">
      <Header />
      {children}
      <footer className="p-4 text-center bg-orange-500 text-white">
        <p>
          Designed & Built by
          <Link
            href="https://www.sanberk.dev"
            className="font-bold text-black hover:text-slate-600"
          >
            &nbsp;Sanberk Türker
          </Link>
        </p>
      </footer>
    </div>
  );
};
