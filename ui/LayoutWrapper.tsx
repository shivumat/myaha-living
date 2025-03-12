'use client';
import AuthProvider from '#/context/AuthContext';
import { CartProvider } from '#/context/CartContext';
import ProductProvider from '#/context/ProductContext';
import { ToastProvider } from '#/context/ToastContext';
import { useIsFirstMount } from '#/hooks/useIsFirstMount';
import { hideFooterRoutes, hideNavbarRoutes } from '#/lib/constants/routes';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cart from './cart/Cart';
import Footer from './footer/Footer';
import Navbar from './navbar/Navbar';
import OrderCreated from './OrderCreatedModal';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFirstMount = useIsFirstMount();

  const searchParams = useSearchParams();
  const [hasOrderCreated, setOrderCreated] = useState(false);

  useEffect(() => {
    setOrderCreated(searchParams.has('orderCreated'));
  }, [searchParams]);

  const hideNavbar = hideNavbarRoutes.includes(pathname ?? '');
  const hideFooter = hideFooterRoutes.includes(pathname ?? '');

  const toggleOrderCreated = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('orderCreated');
    window.location.href = '/';
  };
  if (isFirstMount) {
    return null;
  }
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            {!hideNavbar && <Navbar />}
            {children}
            {!hideFooter && <Footer />}
            <Cart />
          </CartProvider>
          <OrderCreated isOpen={hasOrderCreated} onClose={toggleOrderCreated} />
        </ProductProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
