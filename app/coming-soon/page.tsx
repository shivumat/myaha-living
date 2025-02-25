'use client';
import { useIsMobile } from '#/ui/useMobile';
import WaitlistForm from '#/ui/waitlist-form';
import { keyframes } from '@emotion/react';
import newStyled from '@emotion/styled';
import Image from 'next/image';
import React, { useState } from 'react';

const HeroContainer = newStyled.div`
  background-image: url('/images/whitelist/background.png');
  position: relative;
  width: 100dvw;
  height: 100dvh;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 800px) {
    background-position: 30% center; /* Adjust focus for mobile */
    height: 100dvh;
  }
}
`;

const Logo = newStyled(Image)`
  position: sticky;
  top: 5%;
  left: 5%;
`;

const fadeSlide = keyframes`
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const fadeSlideSubmitted = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const JoinCTA = newStyled.div`
  position: absolute;
  max-width: 450px;
  top: 50%;
  left: 60%;
  color: white;
  animation: ${fadeSlide} 1.5s ease-in-out;
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
    top: 40%;
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
  bottom: 15%;
  left: 60%;
  width : 475px;
  padding: 20px;
  height: max-content;
  @media (max-width: 800px) {
    width: 80%;
    bottom: 40px;
    left: 10%;
  }
`;

const CenterContainer = newStyled.div`
  max-width: 750px;
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    text-align: center;
    width: 350px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ConfirmationMessage = newStyled.div`
  color: white;
  display: flex;
  flex-direction: column;
  animation: ${fadeSlideSubmitted} 1.5s ease-in-out;
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 10px;
  @media (max-width: 800px) {
    width: 80%; 
    font-size: 24px;
    font-weight: 600;
  }
`;
const ConfirmationSubMessage = newStyled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  font-weight: lighter;
  background-color: #D9D9D933;
  padding: 20px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width : 520px;
  padding: 45px;
  height: max-content;
  @media (max-width: 800px) {
    width: 100%;
    padding: 30px 48px;
  }
`;

enum States {
  INIT = 'INTI',
  LOADING = 'LOADING',
  SUBMITTED = 'SUBMITTED',
}

export default function ComingSoonPage() {
  const isMobile = useIsMobile();
  const [userState, setUserState] = useState<States>(States.INIT);

  const onSubmit = () => {
    setUserState(States.LOADING);
    setTimeout(() => {
      setUserState(States.SUBMITTED);
    }, 100);
  };

  const mobileSubmitMessage = (
    <>
      <span>Welcome to</span>
      <span>the Myaha commune</span>
    </>
  );

  const BodyMap: { [K in States]: React.ReactNode } = {
    [States.INIT]: (
      <>
        <JoinCTA>
          <div className="heading">Join the waitlist</div>
          <div className="sub-heading">
            Exclusive offers on the most expressive home accents in town.
          </div>
        </JoinCTA>
        <Form>
          <WaitlistForm onSubmit={onSubmit} />
        </Form>
      </>
    ),
    [States.LOADING]: (
      <CenterContainer>
        <Image
          src={'/images/loading-buffering.gif'}
          alt="loading"
          width={30}
          height={30}
        />
      </CenterContainer>
    ),
    [States.SUBMITTED]: (
      <CenterContainer>
        <ConfirmationMessage>
          {isMobile ? mobileSubmitMessage : 'Welcome to the Myaha commune'}
        </ConfirmationMessage>
        <ConfirmationSubMessage>
          {`Exclusive discount coupons will be shared with you once we’re live. ${isMobile ? 'See you!' : '\u00A0\u00A0See you!'}`}
        </ConfirmationSubMessage>
      </CenterContainer>
    ),
  };

  return (
    <HeroContainer>
      <Logo
        src="/images/myaha_logo.svg"
        alt="Myaha Logo"
        width={isMobile ? 150 : 200}
        height={isMobile ? 30 : 40}
      />
      {BodyMap[userState]}
    </HeroContainer>
  );
}
