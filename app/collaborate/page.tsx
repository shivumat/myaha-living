'use client';
import { useToast } from '#/context/ToastContext';
import Colors from '#/ui/colors/colors';
import ContactFormComponent from '#/ui/components/ContactForm';
import FooterCarousel from '#/ui/components/FooterCarousel';
import styled from '@emotion/styled';

// Styled components
const Container = styled.div`
  padding: 80px 20px;
  @media (max-width: 800px) {
    padding: 40px 20px;
`;

const Div1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  row-gap: 20px;
  > img {
    border-radius: 10px;
    height: 400px;
    flex: 1;
    min-width: 318px;
    object-fit: cover;
    object-position: 0% 80%;
  }
  > div {
    padding: 40px;
    display: flex;
    align-self: stretch;
    height: 400px;
    width: 318px;
    min-width: 318px;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: lighter;
    border-radius: 10px;
  }
  .colored {
    font-size: 12px;
    background-color: ${Colors.black};
    color: ${Colors.white};
  }
  @media (max-width: 800px) {
    flex-direction: column;
    > img {
      height: 250px;
    }
    > div {
      padding: 40px;
      display: flex;
      align-self: stretch;
      height: auto;
      width: 100%;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: lighter;
      border-radius: 10px;
    }
  }
`;
const Div2 = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  grid-gap: 10px;
  place-items: stretch;
  > div {
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: lighter;
    border-radius: 10px;
    border: 1px solid ${Colors.black};
  }
  .colored {
    border: 1px solid transparent;
    font-size: 12px;
    background-color: #213017;
    color: ${Colors.white};
  }
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`;

const Div3 = styled.div`
  padding: 40px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 450px;
  .left-container-header {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .left-container-subheader {
    font-size: 16px;
    font-weight: lighter;
    margin-bottom: 20px;
  }
  .right-form {
    width: 200%;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    text-align: center;
    .right-form {
      width: 100%;
    }
    .left-container-subheader {
      font-size: 14px;
    }
  }
`;

const Collaborate = () => {
  const { showToast } = useToast();

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
      <Container>
        <Div1>
          <img src="https://i.postimg.cc/2SG8536P/DSCF4911.jpg" />
          <div className="colored">
            Each product is designed to tell a unique narrative, allowing
            customers to express their individuality and create a home that
            feels truly their own.
          </div>
        </Div1>
        <Div2>
          <div>
            Myaha inspires customers to see their homes as reflections of their
            personal journeys warm, inviting spaces that evoke a sense of
            belonging.
          </div>
          <div className="colored">
            The brand merges timeless craftsmanship with modern design, ensuring
            products that are both high-quality and innovative.
          </div>
        </Div2>
        <Div3>
          <div className="left-container">
            <div className="left-container-header">
              We would love to collaborate with you
            </div>
            <div className="left-container-subheader">
              At Myaha, our vision is to transform the way people experience
              home decor by creating pieces that are not only beautiful but
              deeply personal. We aim to blend timeless craftsmanship with
              modern creativity, offering products that resonate with
              individuality and evoke a sense of belonging. Our goal is to
              inspire people to see their homes as reflections of their unique
              stories, where each piece tells a narrative and every space feels
              like a warm embrace.
            </div>
          </div>
          <ContactFormComponent className="right-form" onSubmit={onSubmit} />
        </Div3>
      </Container>
      <FooterCarousel rounded={false} />
    </>
  );
};

export default Collaborate;
