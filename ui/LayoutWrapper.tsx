'use client';
import { ToastProvider } from '#/context/ToastContext';
import { useIsFirstMount } from '#/hooks/useIsFirstMount';
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

  const hide = ['/test', '/test1'].includes(pathname ?? '');

  return (
    <ToastProvider>
      {!hide && <Navbar />}
      {children}
      {!hide && <Footer />}
    </ToastProvider>
  );
}
