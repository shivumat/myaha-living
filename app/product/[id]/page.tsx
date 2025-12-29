'use client';
import { useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import { trackMeta } from '#/lib/util';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import MobileProduct from './MobileProduct';
import WebProduct from './WebProduct';

const ProductWithId = () => {
  const isMobile = useIsMobile();
  const { id } = useParams<{ id: string }>();
  const { products } = useProduct();
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (!id || products.length === 0 || hasTrackedRef.current) return;

    const currentProduct = products.find(
      (product) => product.id === `gid://shopify/Product/${id}`,
    );

    if (!currentProduct || !currentProduct.variants?.length) return;

    // Prefer variant ID if your Meta catalog is variant-based
    const variantId = currentProduct.variants[0].id || currentProduct.id;

    console.log(currentProduct.variants[0].price);

    trackMeta('ViewContent', {
      content_ids: [variantId.replace('gid://shopify/ProductVariant/', '')],
      content_type: 'product',
      value: Number(currentProduct.variants[0].price),
      currency: 'INR',
    });

    hasTrackedRef.current = true;
  }, [id, products]);

  return isMobile ? <MobileProduct /> : <WebProduct />;
};

export default ProductWithId;
