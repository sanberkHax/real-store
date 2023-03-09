import { Product } from '@/types/product';
import { ProductItem } from '@/Components/ProductItem/ProductItem';

type Props = {
  list: Product[];
};

export const ProductList = ({ list }: Props) => {
  return (
    <>
      {list?.map(({ id, title, image, price }) => (
        <ProductItem
          key={id}
          id={id}
          title={title}
          price={price}
          image={image}
        />
      ))}
    </>
  );
};
