import { getRandomIntInclusive } from '#/lib/util';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export type Products = Product[];

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  variantsInfo: VariantInfo[];
  tags: any[];
  variants: Variant[];
  collections: Collections;
}

export interface VariantInfo {
  name: string;
  values: string[];
}

export interface Variant {
  id: string;
  availableForSale: boolean;
  price: string;
  currencyCode: string;
  images: string[];
  material: string;
  finish: string;
  dimensions: string;
  variantInfo: { name: string; value: string }[];
}

export type Collections = Collection[];

export interface Collection {
  title: string;
  id: string;
  handle?: string;
  description?: string;
  image?: string;
  productImage?: string;
}

interface ProductContextType {
  products: Products;
  collections: Collections;
  openProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Products>([]);
  const [collections, setCollections] = useState<Collections>([]);
  const router = useRouter();

  const fetchData = async () => {
    const productData = await fetch('/api/shopify/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 1 }),
    });
    const productResponse = await productData.json();
    const productsData: Products = productResponse.data.products.map(
      (product: Product) => {
        const variants = product.variants.map((variant) => {
          let images = variant.images;
          if (images.length === 0) {
            const sampleImages = [];
            const totalRandomImgaes = getRandomIntInclusive(5, 3);
            for (let i = 0; i < totalRandomImgaes; i++) {
              sampleImages.push(
                `/images/sample/sample${getRandomIntInclusive(6, 1)}.png`,
              );
            }
            images = sampleImages;
          }
          return { ...variant, images };
        });
        return { ...product, variants };
      },
    );
    setProducts(productsData);

    const collectionData = await fetch('/api/shopify/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 1 }),
    });
    const collectionResponse = await collectionData.json();
    const collectionsData: Collections = collectionResponse.data.map(
      (collection: Collection) => {
        const collectionProduct = productsData.find((product) => {
          return product.collections.some(
            (productCollection) => productCollection.id === collection.id,
          );
        });
        const productImage =
          collectionProduct?.variants[0].images[0] ??
          `/images/sample/sample${getRandomIntInclusive(6, 1)}.png`;
        const image = collection.image ?? '/images/sample/sample_banner1.png';
        return { ...collection, productImage, image };
      },
    );
    setCollections(collectionsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openProduct = (product: Product) => {
    const id = product.id.replace('gid://shopify/Product/', '');
    router.push(`/product/${id}`);
  };

  return (
    <ProductContext.Provider value={{ products, collections, openProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within an ProductContext');
  }
  return context;
}
