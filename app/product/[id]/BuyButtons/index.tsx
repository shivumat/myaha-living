import { Product } from '#/context/ProductContext';
import AddToCart from '#/ui/components/AddToCart';
import BuyNowButton from '#/ui/components/BuyNowButton';
import CustomiseAndOrder from '#/ui/components/CustomiseAndOrder';

const BuyButtons = ({
  product,
  variant,
  width,
  height,
}: {
  product: Product;
  variant: number;
  width: string;
  height: string;
}) => {
  const { customOrder } = product;

  if (customOrder) {
    return (
      <CustomiseAndOrder
        width={width}
        height={height}
        variantId={product.variants[variant].id}
        inventoryId={product.variants[variant].inventoryId}
        quantityAvailable={product.variants[variant].quantityAvailable}
      />
    );
  }

  return (
    <>
      <AddToCart
        width={width}
        height={height}
        variantId={product.variants[variant].id}
        inventoryId={product.variants[variant].inventoryId}
        quantityAvailable={product.variants[variant].quantityAvailable}
      />
      <BuyNowButton
        width={width}
        height={height}
        variantId={product.variants[variant].id}
        inventoryId={product.variants[variant].inventoryId}
        quantityAvailable={product.variants[variant].quantityAvailable}
      />
    </>
  );
};

export default BuyButtons;
