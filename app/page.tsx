'use client';
import { useScrollToSearchId } from '#/hooks/useScrollToSearchId';
import HomeBody from '#/ui/home/HomeBody';
import HomeTopBanner from '#/ui/home/HomeTopBanner';

export default function Page() {
  useScrollToSearchId();

  return (
    <>
      <HomeTopBanner />
      <HomeBody />
    </>
  );
}
