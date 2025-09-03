'use client';
import { useProduct } from '#/context/ProductContext';
import { useToast } from '#/context/ToastContext';
import { useIsMobile } from '#/hooks/useMobile';
import Colors from '#/ui/colors/colors';
import ContactFormComponent from '#/ui/components/ContactForm';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  > .subHeader {
    text-align: center;
    font-size: 1.2rem;
  }
  @media (max-width: 800px) {
    > .subHeader {
      text-align: center;
      font-size: 0.89rem;
    }
  }
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
  color: ${Colors.white};
  font-size: 18px;
  padding: 30px;
  font-weight: lighter;
  width: 100%;
  text-align: center;
  @media (max-width: 800px) {
    padding: 20px;
    font-size: 14px;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: 0% 80%;
  height: 700px;
`;

const ContactForm = () => {
  const { showToast } = useToast();
  const { initData } = useProduct();
  const isMobile = useIsMobile();

  const onSubmit = async (data: any) => {
    await fetch('/api/contact/contactUs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    showToast('Form submitted successfully!', 'success');
  };

  return (
    <>
      <StyledImg src={initData?.contactUsImage.url} />
      <Container>
        <Title>Contact Us</Title>
        <div className="subHeader">
          We’d love to hear from you, whether it's a question, feedback, or just
          a thought—feel free to share your queries.
        </div>
        <ContactFormComponent onSubmit={onSubmit} />
      </Container>
      <InfoText>
        {/* Feel free to contact us through your preferred channel of
          communication.
          <div
            style={{
              display: 'flex',
              gap: '20px',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <a
              href={`https://www.instagram.com/myaha.co?igsh=MXVneTY0cnl3a2ZwNQ==`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Instagram-Gradient-Logo-PNG.png"
                alt="Instagaram"
                style={{ width: '30px', height: '30px' }}
              />
            </a>
            <a
              href={`mailto:${mailId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
                alt="Mail"
                style={{ width: '30px', height: '30px' }}
              />
            </a>
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
          </div> */}
        <div>
          We'll get back to you in upto 3 business days. For immediate
          assistance, please reach out to us at{' '}
          <strong>hello@myahaliving.com</strong> or{' '}
          <strong>+91 6350533372.</strong>
        </div>
      </InfoText>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '20px',
          fontSize: '18px',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'block' }}>MYAHA INDIA</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: !isMobile ? 'row' : 'column',
            fontSize: '0.7em',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'block' }}>Plot No. B-26, Mathurawala,</div>
          <div style={{ display: 'block' }}>Jagatpura, Jaipur 303903,</div>
          <div style={{ display: 'block' }}>Rajasthan, India.</div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
