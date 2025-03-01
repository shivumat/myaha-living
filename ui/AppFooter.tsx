import { useIsMobile } from '#/hooks/useMobile';

const AppFooter = () => {
  const isMobile = useIsMobile();
  console.log(isMobile);
  return <div>Footer</div>;
};

export default AppFooter;
