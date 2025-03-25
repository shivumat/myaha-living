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
    padding: 10px;
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
  right: 30px;
  @media (max-width: 800px) {
    right: 0px;
  }
`;

const Footer = () => {
  const isMobile = useIsMobile();
  const route = useRouter();

  if (isMobile) {
    return (
      <FooterContainer>
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '15px',
          }}
        >
          <StyleLogo height={'60'} width={'175'} />
          <div style={{ display: 'flex', gap: '30px' }}>
            <TextContainer
              style={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                margin: '20px 0px',
                fontSize: '18px',
              }}
            >
              <div
                className="clickable"
                onClick={() => route.push('/contact')}
                style={{
                  display: 'block',
                  fontSize: '0.8em',
                  textAlign: 'center',
                }}
              >
                CONTACT
              </div>
              <div
                className="clickable"
                onClick={() => route.push('/terms')}
                style={{
                  display: 'block',
                  fontSize: '0.8em',
                  textAlign: 'center',
                }}
              >
                T&C
              </div>
              <div
                className="clickable"
                onClick={() => route.push('/privacy')}
                style={{
                  display: 'block',
                  fontSize: '0.8em',
                  textAlign: 'center',
                }}
              >
                PRIVACY
              </div>
              <div
                className="clickable"
                onClick={() => route.push('/shipping')}
                style={{
                  display: 'block',
                  fontSize: '0.8em',
                  textAlign: 'center',
                }}
              >
                SHIPPING
              </div>
              <div
                className="clickable"
                onClick={() => route.push('cancellation')}
                style={{
                  display: 'block',
                  fontSize: '0.8em',
                  textAlign: 'center',
                }}
              >
                RETURN
              </div>
            </TextContainer>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a
              href={`https://www.instagram.com/myaha.co?igsh=MXVneTY0cnl3a2ZwNQ==`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '2px', borderRadius: '2px' }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Instagram-Gradient-Logo-PNG.png"
                alt="Instagaram"
                style={{ width: '15px', height: '15px' }}
              />
            </a>
            <a
              href={`https://x.com/MyahaIndia`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: 'white',
                padding: '2px',
                borderRadius: '2px',
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Twitter_X.png"
                alt="Twitter"
                style={{ width: '15px', height: '15px' }}
              />
            </a>
            <a
              href={`https://in.pinterest.com/06espov87v6s4p8p49qexdj4fnqr6h/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '2px', borderRadius: '2px' }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
                alt="Pinterest"
                style={{ width: '15px', height: '15px' }}
              />
            </a>
            <a
              href={`https://www.linkedin.com/company/myaha-home/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '2px', borderRadius: '2px' }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Linkedin-logo-blue-In-square-40px.png"
                alt="Linkedin"
                style={{ width: '15px', height: '15px' }}
              />
            </a>
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
          ® Myaha, 2023. All rights reserved
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
          <StyleLogo height={'120'} width={'350'} />
          <div style={{ display: 'flex', gap: '20px' }}>
            <a
              href={`https://www.instagram.com/myaha.co?igsh=MXVneTY0cnl3a2ZwNQ==`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '5px', borderRadius: '5px' }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Instagram-Gradient-Logo-PNG.png"
                alt="Instagaram"
                style={{ width: '30px', height: '30px' }}
              />
            </a>
            <a
              href={`https://x.com/MyahaIndia`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: 'white',
                padding: '5px',
                borderRadius: '5px',
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Twitter_X.png"
                alt="Twitter"
                style={{ width: '30px', height: '30px' }}
              />
            </a>
            <a
              href={`https://in.pinterest.com/06espov87v6s4p8p49qexdj4fnqr6h/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '5px', borderRadius: '5px' }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
                alt="Pinterest"
                style={{ width: '30px', height: '30px' }}
              />
            </a>
            <a
              href={`https://www.linkedin.com/company/myaha-home/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '5px', borderRadius: '5px' }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Linkedin-logo-blue-In-square-40px.png"
                alt="Linkedin"
                style={{ width: '30px', height: '30px' }}
              />
            </a>
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
            ® Myaha, 2023. All rights reserved
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
