'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Product = () => {
  const route = useRouter();

  useEffect(() => {
    route.replace('/');
  }, []);

  return <div></div>;
};

export default Product;
