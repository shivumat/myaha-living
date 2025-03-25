'use client';
import HomeBody from '#/ui/home/HomeBody';
import HomeLowBanner from '#/ui/home/HomeLowBanner';
import HomeTopBanner from '#/ui/home/HomeTopBanner';

export default function Page() {
  return (
    <>
      <HomeTopBanner />
      <HomeBody />
      <HomeLowBanner />
    </>
  );
}
