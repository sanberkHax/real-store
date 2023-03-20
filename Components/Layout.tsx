import { Header } from '@/Components/Header/Header';
import { Footer } from '@/Components/Footer/Footer';

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
