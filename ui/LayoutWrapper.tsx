'use client';
import { useFirstMount } from '#/hooks/usefirstMount';
import { usePathname } from 'next/navigation';
import Footer from './Footer';
import Navbar from './Navbar';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFirstMount = useFirstMount();

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
