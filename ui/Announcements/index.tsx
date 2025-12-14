import { useProduct } from '#/context/ProductContext';
import { AnnouncementTicker } from './AnnouncementTicker';

const Announcements = () => {
  const { initData, hasAnnouncements } = useProduct();

  if (!hasAnnouncements) {
    return null;
  }
  return (
    <AnnouncementTicker announcements={initData?.announcementData ?? []} />
  );
};

export default Announcements;
