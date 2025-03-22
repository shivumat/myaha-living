import { formatPrice, getRandomIntInclusive, searchProducts } from '#/lib/util';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
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
  inventoryId: string;
  quantityAvailable: number;
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
  categoryImage?: string;
  products: Product[];
}

interface ProductContextType {
  products: Products;
  collections: Collections;
  openProduct: (product: Product) => void;
  onSearchProducts: (searchString: string) => Products;
  fetchData: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Products>([]);
  const [collections, setCollections] = useState<Collections>([]);
  const router = useRouter();
  const fetched = useRef(false);

  const collectionOrder = [
    'vases',
    'dinnerware',
    'side tables',
    'wall decor',
    'lighting',
    'planters',
    'drinkware',
  ];

  const fetchData = async () => {
    fetched.current = true;
    const productData = await fetch('/api/shopify/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 1 }),
    });
    const productResponse = await productData.json();
    const productsData: Products = productResponse.data.products.map(
      (product: Product) => {
        const variants = product.variants.map((variant) => {
          let { images, price } = variant;
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
          price = formatPrice(Number(price));
          return { ...variant, images, price };
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
    let collectionsData: Collections = collectionResponse.data
      .filter((collection: Collection) => !!collection.products.length)
      .map((collection: Collection) => {
        const collectionProduct = productsData.find((product) => {
          const firstProduct = collection.products[0];
          return product.id === firstProduct.id;
        });
        const productImage =
          collectionProduct?.variants[0].images[0] ??
          `/images/sample/sample${getRandomIntInclusive(6, 1)}.png`;
        const image = collection.image ?? '/images/sample/sample_banner1.png';
        return { ...collection, productImage, image };
      });

    collectionsData = collectionsData.sort((a, b) => {
      const aIndex = collectionOrder.findIndex((item: string) =>
        a.title.toLowerCase().includes(item.toLowerCase()),
      );
      const bIndex = collectionOrder.findIndex((item: string) =>
        b.title.toLowerCase().includes(item.toLowerCase()),
      );
      return aIndex - bIndex;
    });
    setCollections(collectionsData);
  };

  useEffect(() => {
    if (fetched.current) return;
    fetchData();
  }, []);

  const openProduct = (product: Product) => {
    const id = product.id.replace('gid://shopify/Product/', '');
    router.push(`/product/${id}`);
  };

  const onSearchProducts = (searchString: string): Products => {
    if (!searchString.trim()) return [];
    const result = searchProducts(products, searchString);
    return result;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        collections,
        openProduct,
        onSearchProducts,
        fetchData,
      }}
    >
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
