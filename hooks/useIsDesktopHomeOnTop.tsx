'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useIsDesktopHomeOnTop() {
  const pathname = usePathname();
  const [isAtTop, setIsAtTop] = useState(true);
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isHome && isAtTop;
}
