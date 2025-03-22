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
  display: flex;
  flex-direction: column;
  gap: 20px;
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
    await fetch('/api/contact/contactUs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    showToast('Form submitted successfully!', 'success');
  };
  const phoneNumber = '916350533372';

  return (
    <>
      <img src="/images/contact-us/contact-us1.png" />
      <Container>
        <Title>Contact Us</Title>
        <InfoText>
          Feel free to contact us through your preferred channel of
          communication.
          <div
            style={{
              display: 'flex',
              gap: '20px',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Arcticons-white_instagram.svg"
              alt="Instagaram"
              style={{ width: '30px', height: '30px' }}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/71/Facebook_white_icon_svg.svg"
              alt="Facebook"
              style={{ width: '30px', height: '30px' }}
            />
            <a
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="Whatsapp"
                style={{ width: '30px', height: '30px' }}
              />
            </a>
          </div>
          <div>
            We'll get back to you in upto 3 business days. For immediate
            assistance, please call us at +91 6350533372.
          </div>
        </InfoText>
        <ContactFormComponent onSubmit={onSubmit} />
      </Container>
      <FooterCarousel rounded={false} />
    </>
  );
};

export default ContactForm;
