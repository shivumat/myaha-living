import { useIsMobile } from '#/hooks/useMobile';

const Footer = () => {
  const isMobile = useIsMobile();
  console.log(isMobile);
  return <div>Footer</div>;
};

export default Footer;
