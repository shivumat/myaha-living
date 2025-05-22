import { useProduct } from '#/context/ProductContext';
import { usePathname } from 'next/navigation';
import { AnnouncementTicker } from './AnnouncementTicker';

const Announcements = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const { initData, hasAnnouncements } = useProduct();

  if (!isHome || !hasAnnouncements) {
    return null;
  }
  return (
    <AnnouncementTicker announcements={initData?.announcementData ?? []} />
  );
};

export default Announcements;
