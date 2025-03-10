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
  variantInfo: VariantInfo[];
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
  images: any[];
}

export type Collections = Collection[];

export interface Collection {
  title: string;
  id: string;
  handle?: string;
  description?: string;
}

interface ProductContextType {
  products: Products;
  collections: Collections;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Products>([]);
  const [collections, setCollections] = useState<Collections>([]);

  const fetchData = async () => {
    const productData = await fetch('/api/shopify/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 1 }),
    });
    const productResponse = await productData.json();
    setProducts(productResponse.data.products);

    const collectionData = await fetch('/api/shopify/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 1 }),
    });
    const collectionResponse = await collectionData.json();
    setCollections(collectionResponse.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProductContext.Provider value={{ products, collections }}>
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
