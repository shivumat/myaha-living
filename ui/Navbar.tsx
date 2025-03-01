import { useIsMobile } from '#/hooks/useMobile';

const Navbar = () => {
  const isMobile = useIsMobile();
  console.log(isMobile);
  return <div>Navbar</div>;
};

export default Navbar;
