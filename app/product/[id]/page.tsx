'use client';
import { useIsMobile } from '#/hooks/useMobile';
import MobileProduct from './MobileProduct';
import WebProduct from './WebProduct';

const ProductWithId = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileProduct /> : <WebProduct />;
};

export default ProductWithId;
