'use client';
import { useFirstMount } from '#/hooks/usefirstMount';
import Footer from '#/ui/Footer';
import { usePathname } from 'next/navigation';
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
