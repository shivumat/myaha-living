'use client';
import { useProduct } from '#/context/ProductContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Products = () => {
  const { collections } = useProduct();
  const route = useRouter();

  useEffect(() => {
    if (!!collections.length) {
      const collectionId = collections[0].id.replace(
        'gid://shopify/Collection/',
        '',
      );
      route.replace('/products/' + collectionId);
    }
  }, [collections]);

  return <div></div>;
};

export default Products;
