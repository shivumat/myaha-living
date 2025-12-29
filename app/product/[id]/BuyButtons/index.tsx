import { Product } from '#/context/ProductContext';
import AddToCart from '#/ui/components/AddToCart';
import BuyNowButton from '#/ui/components/BuyNowButton';
import CustomiseAndOrder from '#/ui/components/CustomiseAndOrder';
import ProductOffer from '#/ui/components/ProductOffer';

const OfferText = `EXTRA 5% OFF ON PREPAID ORDERS. </br>
  Use code PREPAID5 at checkout. Limited-time offer. 🎉`;

const BuyButtons = ({
  product,
  variant,
  width,
  height,
  isMobile,
}: {
  product: Product;
  variant: number;
  width: string;
  height: string;
  isMobile?: boolean;
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
      {!isMobile && <ProductOffer text={OfferText} />}
      <AddToCart
        width={width}
        height={height}
        variantPrice={product.variants[variant].price}
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
