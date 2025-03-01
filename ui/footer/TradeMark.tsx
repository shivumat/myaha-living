'use client';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import MyahaLogo from '../svg/myaha-logo';

const Container = newStyled.div`
  display: flex;
  flex-direction: column;
  column-gap: 20px;
  @media (max-width: 800px) {
    margin-top: 40px;
  }
`;

const TextContainer = newStyled.div`
  text-align: right;
  font-size: 14px;
  font-weight: lighter;
`;
const LogoContainer = newStyled.div`
  text-align: right;
  margin-top: auto;
  opacity: 0.12;
  @media (max-width: 800px) {
    text-align: center;
    margin-top: 20px;
  }
`;
const StyleLogo = newStyled(MyahaLogo)`
  margin: 0px auto;
`;

const TradeMark = () => {
  const isMobile = useIsMobile();
  return (
    <Container>
      <TextContainer>
        Our pieces blend traditional craftsmanship with a contemporary twist,
        offering a hint of playful pop. Each item is thoughtfully designed to
        bring warmth, vibrancy, and originality into your home. From Jaipur to
        the world, Myaha is about more than just decor—it’s about creating
        spaces that feel personal and alive.
      </TextContainer>
      <LogoContainer>
        <StyleLogo
          height={isMobile ? '120' : '155'}
          width={isMobile ? '350' : '495'}
        />
      </LogoContainer>
    </Container>
  );
};

export default TradeMark;
