'use client';
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
    <>
      {!hide && <Navbar />}
      {children}
      {!hide && <Footer />}
    </>
  );
}
