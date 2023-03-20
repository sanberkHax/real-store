import { Header } from '@/Components/Header/Header';
import { Footer } from '@/Components/Footer/Footer';

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen gap-10">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
