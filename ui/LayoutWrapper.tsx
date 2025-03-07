'use client';
import AuthProvider from '#/context/AuthContext';
import { ToastProvider } from '#/context/ToastContext';
import { useIsFirstMount } from '#/hooks/useIsFirstMount';
import { hideFooterRoutes, hideNavbarRoutes } from '#/lib/constants/routes';
import { usePathname } from 'next/navigation';
import Footer from './footer/Footer';
import Navbar from './navbar/Navbar';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFirstMount = useIsFirstMount();

  if (isFirstMount) {
    return null;
  }

  const hideNavbar = hideNavbarRoutes.includes(pathname ?? '');
  const hideFooter = hideFooterRoutes.includes(pathname ?? '');

  return (
    <AuthProvider>
      <ToastProvider>
        {!hideNavbar && <Navbar />}
        {children}
        {!hideFooter && <Footer />}
      </ToastProvider>
    </AuthProvider>
  );
}
