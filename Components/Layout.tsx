import { Header } from './Header';

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen gap-10">
      <Header />
      {children}
    </div>
  );
};
