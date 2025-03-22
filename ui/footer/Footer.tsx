'use client';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import MyahaLogo from '../svg/myaha-logo';

const FooterContainer = newStyled.div`
  width: 100%;
  display: flex;
  background-color: black;
  color: white;
  padding: 40px;
  @media (max-width: 800px) {
    flex-direction: column;
    padding: 40px 20px 10px 20px;
  }
`;

const TextContainer = newStyled.div`
  text-align: center;
  font-size: 14px;
  font-weight: lighter;
  @media (max-width: 800px) {
    grid-column: 1 / span 2;
  }
`;

const StyleLogo = newStyled(MyahaLogo)`
  opacity: 0.3;
  position: relative;
  right: 20px;
  @media (max-width: 800px) {
    right: 10px;
  }
`;

const Footer = () => {
  const isMobile = useIsMobile();
  const route = useRouter();

  if (isMobile) {
    return (
      <FooterContainer>
        <div style={{ display: 'flex', width: '100%', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <StyleLogo height={'30'} width={'87.5'} />
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Arcticons-white_instagram.svg"
                alt="Instagaram"
                style={{ width: '15px', height: '15p' }}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/71/Facebook_white_icon_svg.svg"
                alt="Facebook"
                style={{ width: '15px', height: '15px' }}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
                alt="Pinterest"
                style={{ width: '15px', height: '15px' }}
              />
            </div>
            <TextContainer
              style={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                margin: '10px 0px',
              }}
            >
              <div style={{ display: 'block', fontSize: '0.8em' }}>
                MYAHA INDIA
              </div>
              <div style={{ display: 'block', fontSize: '0.8em' }}>
                Plot No. B-26, Mathurawala,
              </div>
              <div style={{ display: 'block', fontSize: '0.8em' }}>
                Jagatpura, Jaipur 303903,
              </div>
              <div style={{ display: 'block', fontSize: '0.8em' }}>
                Rajasthan, India.
              </div>
            </TextContainer>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 'auto',
            }}
          >
            <TextContainer
              style={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                margin: '20px 0px',
              }}
            >
              <div
                className="clickable"
                onClick={() => route.push('/contact')}
                style={{
                  display: 'block',
                  fontSize: '0.8em',
                  margin: '0px 0px 10px',
                }}
              >
                CONTACT US
              </div>
              <div style={{ display: 'block', fontSize: '0.8em' }}>
                +91 6350533372
              </div>
              <div style={{ display: 'block', fontSize: '0.8em' }}>
                hello@myahaliving.com{' '}
              </div>
            </TextContainer>
            <TextContainer
              style={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <div
                className="clickable"
                onClick={() => route.push('/terms')}
                style={{ display: 'block', fontSize: '0.8em' }}
              >
                Terms and Conditions
              </div>
              <div
                className="clickable"
                onClick={() => route.push('/privacy')}
                style={{ display: 'block', fontSize: '0.8em' }}
              >
                Privacy Policy
              </div>
              <div
                className="clickable"
                onClick={() => route.push('cancellation')}
                style={{ display: 'block', fontSize: '0.8em' }}
              >
                Cancellation and Refund
              </div>
              <div
                className="clickable"
                onClick={() => route.push('/shipping')}
                style={{ display: 'block', fontSize: '0.8em' }}
              >
                Shipping and Delivery
              </div>
            </TextContainer>
          </div>
          <div style={{ display: 'flex', gap: '30px' }}>
            <TextContainer
              style={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                margin: '20px 0px',
              }}
            >
              <div
                className="clickable"
                onClick={() => route.push('/about-us')}
                style={{ display: 'block', fontSize: '0.8em' }}
              >
                About us
              </div>
              <div
                className="clickable"
                onClick={() => route.push('/collaborate')}
                style={{ display: 'block', fontSize: '0.8em' }}
              >
                Collaborate with us
              </div>
            </TextContainer>
          </div>
        </div>
        <div
          style={{
            fontSize: '12px',
            textAlign: 'center',
            opacity: '0.5',
            margin: '10px 0px',
          }}
        >
          ® Myaha, 2025. All rights reserved
        </div>
      </FooterContainer>
    );
  }

  return (
    <FooterContainer>
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid white',
          width: '100%',
          gap: '100px',
          padding: '20px 0px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <StyleLogo
            height={isMobile ? '120' : '60'}
            width={isMobile ? '350' : '175'}
          />
          <div style={{ display: 'flex', gap: '20px' }}>
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
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
              alt="Pinterest"
              style={{ width: '30px', height: '30px' }}
            />
          </div>
          <TextContainer
            style={{
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              margin: '20px 0px',
            }}
          >
            <div style={{ display: 'block' }}>MYAHA INDIA</div>
            <div style={{ display: 'block' }}>Plot No. B-26, Mathurawala,</div>
            <div style={{ display: 'block' }}>Jagatpura, Jaipur 303903,</div>
            <div style={{ display: 'block' }}>Rajasthan, India.</div>
          </TextContainer>
          <div
            style={{ fontSize: '12px', textAlign: 'center', opacity: '0.5' }}
          >
            ® Myaha, 2025. All rights reserved
          </div>
        </div>
        <div style={{ display: 'flex', gap: '30px', marginLeft: 'auto' }}>
          <TextContainer
            style={{
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              margin: '20px 0px',
            }}
          >
            <div
              className="clickable"
              onClick={() => route.push('/contact')}
              style={{ display: 'block', fontSize: '1.3em' }}
            >
              CONTACT US
            </div>
            <div style={{ display: 'block', fontSize: '1.2em' }}>
              +91 6350533372
            </div>
            <div style={{ display: 'block', fontSize: '1.2em' }}>
              hello@myahaliving.com{' '}
            </div>
          </TextContainer>
        </div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <TextContainer
            style={{
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              margin: '20px 0px',
            }}
          >
            <div
              className="clickable"
              onClick={() => route.push('/about-us')}
              style={{ display: 'block', fontSize: '1.3em' }}
            >
              About us
            </div>
            <div
              className="clickable"
              onClick={() => route.push('/collaborate')}
              style={{ display: 'block', fontSize: '1.3em' }}
            >
              Collaborate with us
            </div>
          </TextContainer>
        </div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <TextContainer
            style={{
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              margin: '20px 0px',
            }}
          >
            <div
              className="clickable"
              onClick={() => route.push('/terms')}
              style={{ display: 'block', fontSize: '1.3em' }}
            >
              Terms and Conditions
            </div>
            <div
              className="clickable"
              onClick={() => route.push('/privacy')}
              style={{ display: 'block', fontSize: '1.3em' }}
            >
              Privacy Policy
            </div>
            <div
              className="clickable"
              onClick={() => route.push('cancellation')}
              style={{ display: 'block', fontSize: '1.3em' }}
            >
              Cancellation and Refund
            </div>
            <div
              className="clickable"
              onClick={() => route.push('/shipping')}
              style={{ display: 'block', fontSize: '1.3em' }}
            >
              Shipping and Delivery
            </div>
          </TextContainer>
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;
