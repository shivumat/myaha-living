'use client';
import { useToast } from '#/context/ToastContext';
import ContactFormComponent from '#/ui/components/ContactForm';
import FooterCarousel from '#/ui/components/FooterCarousel';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const InfoText = styled.div`
  background-color: #4e2c2c;
  color: white;
  font-size: 18px;
  padding: 30px;
  font-weight: lighter;
  border-radius: 8px;
  width: 100%;
  text-align: center;
  @media (max-width: 800px) {
    padding: 20px;
    font-size: 14px;
  }
`;

const ContactForm = () => {
  const { showToast } = useToast();

  const onSubmit = async (data: any) => {
    console.log('Form submitted:', data);
    await fetch('/api/contact/contactUs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    showToast('Form submitted successfully!', 'success');
  };

  return (
    <>
      <img src="/images/contact-us/contact-us1.png" />
      <Container>
        <Title>Contact Us</Title>
        <InfoText>
          Feel free to contact us through your preferred channel of
          communication.
        </InfoText>
        <ContactFormComponent onSubmit={onSubmit} />
      </Container>
      <FooterCarousel rounded={false} />
    </>
  );
};

export default ContactForm;
