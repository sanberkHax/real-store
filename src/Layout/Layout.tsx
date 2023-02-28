import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout = () => {
  return (
    <div className="flex flex-col h-screen gap-10">
      <Header />
      <Outlet />
    </div>
  );
};
