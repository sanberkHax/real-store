import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { MyCart } from './pages/MyCart';
import { Checkout } from './pages/Checkout';
import { NotFound } from './pages/NotFound';
import { Layout } from './Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="my-cart" element={<MyCart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
