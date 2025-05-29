'use client';
import MyahaLogo from '#/ui/svg/myaha-logo';
import styled from '@emotion/styled';
import Head from 'next/head';
import React, { useState } from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const BREAKPOINT = '800px';

const Wrapper = styled.div`
  display: flex;
  gap: 40px;
  padding: 120px 40px 40px;
  flex-wrap: wrap;
  width: 85%;
  margin: 0 auto;

  @media (max-width: ${BREAKPOINT}) {
    flex-direction: column;
    padding: 60px 24px 24px;
    gap: 24px;
    width: 100%;
  }
`;

const CardWrapper = styled.div`
  perspective: 1000px;
  width: 100%;
  max-width: 500px;
  position: relative;
  height: 300px;
`;

const CardContainer = styled.div<{ isFlipped: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) => (isFlipped ? 'rotateY(180deg)' : 'none')};
`;

const CardFace = styled.div<{ background: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  background-image: url(${({ background }) => background});
  background-size: cover;
  background-position: center;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  font-size: 24px;
`;

const CardFront = styled(CardFace)`
  z-index: 2;
  font-family: 'Savoye LET', 'Great Vibes', cursive;
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardText = styled.div`
  font-size: 44px;
  margin: 30px;
  @media (max-width: 800px) {
    font-size: 36px;
    margin: 36px;
  }
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 320px;
`;

const Headline = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 24px;
  color: #333;
`;

const TagGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const Tag = styled.button<{ selected: boolean }>`
  padding: 10px 16px;
  border: 1px solid ${({ selected }) => (selected ? '#5b1d1d' : '#ccc')};
  background-color: ${({ selected }) => (selected ? '#5b1d1d' : 'white')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #5b1d1d;
  }
`;

const PriceGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const PriceButton = styled.button<{ selected: boolean }>`
  padding: 10px 16px;
  border: 1px solid ${({ selected }) => (selected ? '#5b1d1d' : '#ccc')};
  background-color: ${({ selected }) => (selected ? '#5b1d1d' : 'white')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #5b1d1d;
  }
`;

const Input = styled.input`
  padding: 12px;
  width: 60%;
  font-size: 16px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;

  &:focus {
    border-color: #5b1d1d;
    outline: none;
  }
  @media (max-width: ${BREAKPOINT}) {
    width: 100%;
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: vertical;
  min-height: 80px;
  margin-bottom: 12px;
  width: 60%;

  &:focus {
    border-color: #5b1d1d;
    outline: none;
  }
  @media (max-width: ${BREAKPOINT}) {
    width: 100%;
  }
`;

const MaroonStrip = styled.div`
  background-color: #5b1d1d;
  color: white;
  text-align: center;
  padding: 40px 16px;
  margin: 0px 24px 24px;
  border-radius: 6px;
  font-size: 15px;
`;

const Submit = styled.button`
  padding: 14px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  margin-top: 12px auto;
  cursor: pointer;
  width: 300px;

  &:hover {
    background-color: #222;
  }
`;

const CTAGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 16px 40px;
  flex-wrap: wrap;
`;

const CTAButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  color: white;

  &.whatsapp {
    background-color: #25d366;
  }

  &.call {
    background-color: #000;
  }
`;

const GiftCardComponent: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState('Congratulations');
  const [selectedPrice, setSelectedPrice] = useState<number | null>(1500);
  const [customPrice, setCustomPrice] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '916350533372';

  const tags = ['Best wishes', 'Congratulations', 'Birthday', 'Anniversary'];
  const prices = [1500, 2000, 5000, 10000];

  const isMustardCard =
    selectedTag === 'Best wishes' || selectedTag === 'Birthday';

  const cardFront = isMustardCard
    ? '/images/mustard-card.png'
    : '/images/red-card.png';

  const cardBack = isMustardCard
    ? '/images/mustard-card.png'
    : '/images/red-card.png';

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Wrapper>
        <CardWrapper
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardContainer isFlipped={isHovered}>
            <CardFront background={cardFront}>
              <CardText>
                {['Anniversary', 'Birthday'].includes(selectedTag)
                  ? `Happy ${selectedTag}`
                  : selectedTag}
              </CardText>
              <div style={{ textAlign: 'right' }}>With love</div>
            </CardFront>
            <CardBack background={cardBack}>
              <MyahaLogo />
            </CardBack>
          </CardContainer>
        </CardWrapper>

        <RightContent>
          <Headline>
            Gift your loved one, <strong>the comfort of home!</strong>
          </Headline>
          <Description>
            Are you still confused about what to gift your friend this birthday?
            Do you have a lot of things in mind but are unable to decide on one
            option? Then this is the best time to avail the Myaha gift card.
            Yes, you heard it right! Myaha is bringing this opportunity to buy a
            specially personalised gift card for your near and dear ones.
          </Description>

          <TagGroup>
            {tags.map((tag) => (
              <Tag
                key={tag}
                selected={selectedTag === tag}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Tag>
            ))}
          </TagGroup>

          <div style={{ marginBottom: '8px' }}>
            Choose your price! Gift it your way!
          </div>
          <PriceGroup>
            {prices.map((price) => (
              <PriceButton
                key={price}
                selected={selectedPrice === price && !customPrice}
                onClick={() => {
                  setSelectedPrice(price);
                  setCustomPrice('');
                }}
              >
                ₹{price}
              </PriceButton>
            ))}
          </PriceGroup>
          <Input
            type="number"
            placeholder="Customise the price"
            value={customPrice}
            onChange={(e) => setCustomPrice(e.target.value)}
          />
        </RightContent>
      </Wrapper>

      <MaroonStrip>
        Please enter the details and we will get in touch with you within 48
        hours or you can always contact us
      </MaroonStrip>

      <div
        style={{
          padding: '0 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Input placeholder="First Name" />
        <Input placeholder="Last Name" />
        <Input placeholder="Email Address" />
        <Input placeholder="Contact Number" />
        <Input placeholder="Address" />
        <Textarea placeholder="Notes (Optional)" />
        <Submit type="submit">Submit</Submit>
      </div>

      <CTAGroup>
        <CTAButton
          href={`https://wa.me/${phoneNumber}`}
          className="whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp /> WhatsApp Us
        </CTAButton>
        <CTAButton
          href={`tel:${phoneNumber}`}
          className="call"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaPhoneAlt /> Call Us
        </CTAButton>
      </CTAGroup>
    </>
  );
};

export default GiftCardComponent;
