import newStyled from '@emotion/styled';
import Image from 'next/image';
import { useState } from 'react';
import WaitlistForm from './waitlist-form';

const Header1 = newStyled.span`
    font-family: Roboto Flex;
    font-size: 24px;
    color: #ffffff;
    margin: 0 12px;
    text-align: center;
`;

const SubHeader1 = newStyled.span`
    font-family: Roboto Flex;
    font-style: italic;
    font-size: 16px;
    color: #ffffff;
    margin: 0 12px;
    text-align: center;
`;

const CTA1 = newStyled.span`
    cursor: pointer;
    font-family: Roboto Flex;
    font-size: 20px;
    color: #ffffff;
    text-decoration: underline;
    text-align: center;
`;

const StyledContainer = newStyled.div`
    padding: 24px;
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    row-gap: 8px;
`;

const Form = newStyled.div`
    height: 80%;
`;

const ComingSoonComponent = () => {
  const [satge, setStage] = useState(0);

  const DefaultStage = (
    <Form className="flex flex-col items-center justify-center gap-y-4 ">
      <Header1>Crafting emotions, not just essentials – Coming Soon</Header1>
      <SubHeader1>
        Be among the first to explore our exclusive collection. Join the
        waitlist and unlock an early bird discount.
      </SubHeader1>
      <CTA1 onClick={() => setStage(1)}>Join the Waitlist</CTA1>
    </Form>
  );

  const VerifiedStage = (
    <Form className="flex flex-col items-center justify-center gap-y-4 ">
      <Header1>You’re In! 🎉</Header1>
      <SubHeader1>
        Welcome to Myaha! You’re now on the waitlist. The top 100 users will
        receive an exclusive early bird discount.
      </SubHeader1>
    </Form>
  );

  const renderStage = () => {
    switch (satge) {
      case 0:
        return DefaultStage;
      case 1:
        return <WaitlistForm updateStage={() => setStage(2)} />;
      case 2:
        return VerifiedStage;
      default:
        return DefaultStage;
    }
  };

  return (
    <StyledContainer>
      <Image
        src="/images/myaha_logo.png"
        alt="Myaha Living"
        width={200}
        height={200}
      />
      {renderStage()}
    </StyledContainer>
  );
};

export default ComingSoonComponent;
