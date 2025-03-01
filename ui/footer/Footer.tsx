import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';

const FooterContainer = newStyled.div`
  height: 100vh;
`;

const Footer = () => {
  const isMobile = useIsMobile();
  console.log(isMobile);
  return <FooterContainer>Footer</FooterContainer>;
};

export default Footer;
