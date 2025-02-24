'use client';
import { useIsMobile } from '#/ui/useMobile';
import WaitlistForm from '#/ui/waitlist-form';
import newStyled from '@emotion/styled';
import Image from 'next/image';

const HeroContainer = newStyled.div`
  background-image: url('/images/whitelist/background1.png');
  position: relative;
  width: 100dvw;
  height: 100dvh;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 800px) {
    background-position: 60% center; /* Adjust focus for mobile */
    height: 100dvh;
  }
`;

const Logo = newStyled(Image)`
  position: sticky;
  top: 5%;
  left: 5%;
`;

const JoinCTA = newStyled.div`
  position: absolute;
  max-width: 450px;
  top: 50%;
  left: 60%;
  color: white;
  .heading {
    font-size: 48px;
    font-weight: 600;
  }
  .sub-heading{
    font-size: 18px;
    font-weight: lighter;
  }
  @media (max-width: 800px) {
    max-width: 250px;
    top: 30%;
    left: calc(50% - 125px);

    .heading, .sub-heading {
      text-align: center;
    }
    .heading {
      font-size: 24px;
      font-weight: 600;
    }
    .sub-heading{
      font-size: 14px;
      font-weight: lighter;
    }
  }
`;

const Form = newStyled.div`
  position: absolute;
  background-color: #D9D9D933;
  padding: 20px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  top: 65%;
  left: 60%;
  width : 475px;
  padding: 20px;
  @media (max-width: 800px) {
    width: 80%;
    top: 60%;
    left: 10%;
  }
`;
export default function ComingSoonPage() {
  const isMobile = useIsMobile();
  return (
    <HeroContainer>
      <Logo
        src="/images/myaha_logo.png"
        alt="Myaha Logo"
        width={isMobile ? 150 : 200}
        height={isMobile ? 30 : 40}
      />
      <JoinCTA>
        <div className="heading">Join the waitlist</div>
        <div className="sub-heading">
          Exclusive offers on the most expressive home accents in town.
        </div>
      </JoinCTA>
      <Form>
        <WaitlistForm />
      </Form>
    </HeroContainer>
  );
}
