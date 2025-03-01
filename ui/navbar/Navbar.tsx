import { useIsDesktopHomeOnTop } from '#/hooks/useIsDesktopHomeOnTop';
import { useIsMobile } from '#/hooks/useMobile';

const Navbar = () => {
  const isMobile = useIsMobile();
  const isDesktopHomeOnTop = useIsDesktopHomeOnTop();

  console.log(isMobile, isDesktopHomeOnTop);
  return <div>Navbar</div>;
};

export default Navbar;
