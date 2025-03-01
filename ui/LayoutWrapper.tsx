'use client';
import { useIsFirstMount } from '#/hooks/useIsFirstMount';
import { usePathname } from 'next/navigation';
import AppFooter from './AppFooter';
import Navbar from './Navbar';

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
      {!hide && <AppFooter />}
    </>
  );
}
