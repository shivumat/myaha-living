'use client';

import { useIsMobile } from '#/hooks/useMobile';
import MyahaLogo from '#/ui/svg/myaha-logo';
import WaitlistForm from '#/ui/waitlist/waitlist-form';
import { keyframes } from '@emotion/react';
import newStyled from '@emotion/styled';
import Image from 'next/image';
import React, { useState } from 'react';

const HeroContainer = newStyled.div`
  background-image: url('/images/whitelist/background.png');
  overflow-y: auto;
  position: relative;
  width: 100dvw;
  height: 100dvh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 800px) {
    background-position: 30% center; /* Adjust focus for mobile */
    height: 100dvh;
  }
}
`;

const Logo = newStyled(MyahaLogo)`
  position: sticky;
  top: 50px;
  left: 50px;
  @media (max-width: 800px) {
    top: 20px;
    left: 15px;
  }
`;

const fadeSlide = keyframes`
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const JoinCTA = newStyled.div`

  max-width: 450px;
  color: white;
  margin-bottom: 20px;
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
    position: absolute;
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
  background-color: #D9D9D933;
  padding: 20px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width : 475px;
  padding: 20px;
  height: max-content;
  @media (max-width: 800px) {
    position: absolute;
    width: 80%;
    bottom: 40px;
    left: 10%;
  }
`;
const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
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

const LeftContainer = newStyled.div`
  position: absolute;
  top: 50%;
  right: 100px;
`;

const ConfirmationMessage = newStyled.div`
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 10px;
  animation: ${fadeInScale} 0.8s ease-out;

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
  animation: ${fadeInScale} 0.8s ease-out;

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
    }, 1000);
  };

  const mobileSubmitMessage = (
    <>
      <span>Welcome to</span>
      <span>the Myaha commune</span>
    </>
  );

  const BodyMap: { [K in States]: React.ReactNode } = {
    [States.INIT]: isMobile ? (
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
    ) : (
      <LeftContainer>
        <JoinCTA>
          <div className="heading">Join the waitlist</div>
          <div className="sub-heading">
            Exclusive offers on the most expressive home accents in town.
          </div>
        </JoinCTA>
        <Form>
          <WaitlistForm onSubmit={onSubmit} />
        </Form>
      </LeftContainer>
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
      <Logo width={isMobile ? '129' : '194'} height={isMobile ? '40' : '60'} />
      {BodyMap[userState]}
    </HeroContainer>
  );
}
