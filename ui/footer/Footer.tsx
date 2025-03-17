'use client';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import FooterLinks from './FooterLinks';
import TradeMark from './TradeMark';

const FooterContainer = newStyled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 500px;
  background-color: black;
  color: white;
  padding: 40px 20px 10px 20px;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`;

const TextContainer = newStyled.div`
  text-align: center;
  font-size: 14px;
  font-weight: lighter;
  @media (max-width: 800px) {
    grid-column: 1 / span 2;
  }
`;

const Footer = () => {
  const isMobile = useIsMobile();
  return (
    <FooterContainer>
      <FooterLinks />
      <TradeMark />
      <TextContainer style={{ textAlign: isMobile ? 'center' : 'left' }}>
        <strong style={{ display: 'block' }}>+91 6350533372</strong>
        <strong style={{ display: 'block' }}>hello@myahaliving.com </strong>
      </TextContainer>
      <TextContainer style={{ textAlign: isMobile ? 'center' : 'right' }}>
        <strong style={{ display: 'block' }}>MYAHA INDIA</strong>
        <strong style={{ display: 'block' }}>
          Plot No. B-26, Mathurawala,
        </strong>
        <strong style={{ display: 'block' }}>
          Jagatpura, Jaipur 303903, Rajasthan, India.
        </strong>
      </TextContainer>
    </FooterContainer>
  );
};

export default Footer;
