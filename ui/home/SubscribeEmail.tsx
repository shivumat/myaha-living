/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { useState } from 'react';
import Colors from '../colors/colors'; // adjust the import path if different

const Section = styled.section`
  background: #5b1d1d; // replace with actual path
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  padding: 40px 20px;
  margin: 40px 0px 0px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${Colors.white};
`;

const Subtitle = styled.p`
  max-width: 520px;
  font-size: 1rem;
  color: ${Colors.white};
  opacity: 0.9;
  margin-bottom: 24px;
  transition: opacity 0.3s ease;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 12px;
  max-width: 420px;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid transparent;
  font-size: 1rem;
  outline: none;
  background: rgba(255, 255, 255, 0.95);
  color: ${Colors.black};
  transition: all 0.3s ease;

  &::placeholder {
    color: ${Colors.black};
    opacity: 0.5;
  }

  &:hover {
    border-color: ${Colors.black};
  }

  &:focus {
    border-color: ${Colors.black};
    background-color: #ffffff;
    box-shadow: 0 0 0 2px ${Colors.black}40;
  }
`;

const Button = styled.button`
  background-color: ${Colors.black};
  color: ${Colors.white};
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s;

  &:hover {
    background-color: #000000cc;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Message = styled.p<{ success: boolean }>`
  margin-top: 16px;
  color: ${Colors.white};
  font-size: 0.9rem;
  transition: opacity 0.3s ease;
`;

const InfoText = styled.p`
  font-size: 0.85rem;
  color: ${Colors.white};
  opacity: 0.7;
  margin-top: 8px;
  transition: all 0.3s ease;
`;

const SubscribeEmail: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [info, setInfo] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setInfo('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/subscriber/addEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Failed to subscribe');

      setIsSuccess(true);
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (err) {
      setIsSuccess(false);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <Title>Join the Myaha Commune</Title>
      <Subtitle>
        Be a part of commune that loves design, art and experimenting. Oh, and
        get exclusive discounts!
      </Subtitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onFocus={() => {
            setInfo('We’ll never share your email.');
            setMessage('');
          }}
          onBlur={() => setInfo('')}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Subscribe'}
        </Button>
      </Form>
      {info && <InfoText>{info}</InfoText>}
      {message && <Message success={isSuccess}>{message}</Message>}
    </Section>
  );
};

export default SubscribeEmail;
