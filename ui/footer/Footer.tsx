'use client';
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

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks />
      <TradeMark />
    </FooterContainer>
  );
};

export default Footer;
