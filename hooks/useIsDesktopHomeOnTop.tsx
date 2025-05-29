'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useIsDesktopHomeOnTop(props?: {
  checkPath?: string;
  turnBackToTransparent?: boolean;
}) {
  const pathname = usePathname();
  const [isAtTop, setIsAtTop] = useState(true);
  const isHome = pathname === (props?.checkPath ?? '/');

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(!!props?.turnBackToTransparent && window.scrollY < 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [props?.turnBackToTransparent]);

  return isHome && isAtTop;
}
