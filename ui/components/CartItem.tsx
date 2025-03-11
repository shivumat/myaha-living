import { Product } from '#/context/ProductContext';

const CartItem = (props: { product: Product }) => {
  console.log(props);
  return <div>CartItem</div>;
};

export default CartItem;
