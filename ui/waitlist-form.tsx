/** @jsxImportSource @emotion/react */
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Label = styled.label`
  display: block;
  color: white;
  font-size: 14px;
  margin-bottom: 5px;
  text-align: left;
  font-size: 22px;
  font-weight: lighter;
  @media (max-width: 800px) {
    font-size: 18px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 2px solid white;
  background: transparent;
  color: white;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  @media (max-width: 800px) {
    font-size: 12px;
  }
`;

const Button = styled.button<{ submitted: boolean }>`
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.submitted ? 'default' : 'pointer')};
  background: ${(props) => (props.submitted ? '#4CAF50' : 'white')};
  color: ${(props) => (props.submitted ? 'white' : 'black')};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  animation: ${(props) => (props.submitted ? fadeIn : 'none')} 0.5s ease-in-out;

  &:hover {
    background: ${(props) => (props.submitted ? '#45A049' : '#ddd')};
  }
  @media (max-width: 800px) {
    font-size: 12px;
  }
`;

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubmitted(true);
      await fetch('/api/waitlist/addEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 5000); // Clear input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label>Email Address</Label>
      <Input
        type="email"
        placeholder=""
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={submitted}
      />
      <Button type="submit" submitted={submitted} disabled={submitted}>
        {submitted ? 'You have been added to Myaha List (✔)' : 'Signup'}
      </Button>
    </form>
  );
};

export default WaitlistForm;
