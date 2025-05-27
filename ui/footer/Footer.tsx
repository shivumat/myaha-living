'use client';
import { useIsMobile } from '#/hooks/useMobile';
// import { mergeHexColorsWithWeights } from '#/lib/util';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { BiMailSend, BiPhoneCall } from 'react-icons/bi';
import {
  LiaInstagram,
  LiaLinkedinIn,
  LiaPinterestSquare,
  LiaTwitter,
} from 'react-icons/lia';
import Colors from '../colors/colors';
import Container from '../components/ContainerBox';
import Textbox, { TextboxProps } from '../components/Textbox';
import MyahaLogo from '../svg/myaha-logo';

const FooterContainer = newStyled.div`
  width: 100%;
  display: flex;
  background-color: #5b1d1d;
  color: ${Colors.white};
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
  position: relative;
  bottom: 15px;
   right: 30px;
  @media (max-width: 800px) {
    right: 0px;
    bottom: 0px;
  }
`;

const StyledTextbox = (props: TextboxProps & { route: string }) => {
  const route = useRouter();
  const handleClick = () => {
    if (props.route) {
      route.push(props.route);
    }
  };

  return (
    <Textbox
      onClick={handleClick}
      className="clickable hover_underline"
      {...props}
    />
  );
};

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
                className="clickable hover_underline"
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
                className="clickable hover_underline"
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
                className="clickable hover_underline"
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
                className="clickable hover_underline"
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
                className="clickable hover_underline"
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
              <LiaInstagram />
            </a>
            <a
              href={`https://x.com/MyahaIndia`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '2px',
                borderRadius: '2px',
              }}
            >
              <LiaTwitter />
            </a>
            <a
              href={`https://in.pinterest.com/06espov87v6s4p8p49qexdj4fnqr6h/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '2px', borderRadius: '2px' }}
            >
              <LiaPinterestSquare />
            </a>
            <a
              href={`https://www.linkedin.com/company/myaha-home/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '2px', borderRadius: '2px' }}
            >
              <LiaLinkedinIn />
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
          width: '100%',
          gap: '100px',
          padding: '20px 0px',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Container height="35px" padding="0px" margin="0px 0px 20px">
            {''}
          </Container>
          <Textbox color={Colors.white} fontWeight="lighter">
            MYAHA INDIA
          </Textbox>
          <Textbox color={Colors.white} fontWeight="lighter">
            Plot No. B-26, Mathurawala,
          </Textbox>
          <Textbox color={Colors.white} fontWeight="lighter">
            Jagatpura, Jaipur 303903,
          </Textbox>
          <Textbox
            style={{ marginBottom: '40px' }}
            color={Colors.white}
            fontWeight="lighter"
          >
            Rajasthan, India.
          </Textbox>
          <Container horizontalCenter flexRow padding="0px" margin="0px">
            <BiMailSend color={Colors.white} />
            <Textbox
              style={{ marginLeft: '10px' }}
              color={Colors.white}
              fontSize="14px"
              fontWeight="lighter"
            >
              hello@myahaliving.com
            </Textbox>
          </Container>
          <Container horizontalCenter flexRow padding="0px" margin="0px">
            <BiPhoneCall color={Colors.white} />
            <Textbox
              style={{ marginLeft: '10px' }}
              color={Colors.white}
              fontSize="14px"
              fontWeight="lighter"
            >
              +91 6350533372
            </Textbox>
          </Container>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Container height="35px" padding="0px" margin="0px 0px 20px">
            <Textbox color={Colors.white} fontWeight="600" fontSize="20px">
              About us
            </Textbox>
          </Container>
          <StyledTextbox
            route="/about-us"
            color={Colors.white}
            fontWeight="lighter"
          >
            Our story
          </StyledTextbox>
          <StyledTextbox
            route="/contact"
            color={Colors.white}
            fontWeight="lighter"
          >
            Contact us
          </StyledTextbox>
          <StyledTextbox
            route="/collaborate"
            color={Colors.white}
            fontWeight="lighter"
          >
            Collaborate with us
          </StyledTextbox>
          <StyledTextbox
            route="/gifting"
            style={{ marginBottom: '40px' }}
            color={Colors.white}
            fontWeight="lighter"
          >
            Gifting
          </StyledTextbox>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <a
              href={`https://www.instagram.com/myaha.co?igsh=MXVneTY0cnl3a2ZwNQ==`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '2px', borderRadius: '2px' }}
            >
              <LiaInstagram size={'32px'} />
            </a>
            <a
              href={`https://x.com/MyahaIndia`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '2px',
                borderRadius: '2px',
              }}
            >
              <LiaTwitter size={'32px'} />
            </a>
            <a
              href={`https://in.pinterest.com/06espov87v6s4p8p49qexdj4fnqr6h/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '2px', borderRadius: '2px' }}
            >
              <LiaPinterestSquare size={'32px'} />
            </a>
            <a
              href={`https://www.linkedin.com/company/myaha-home/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '2px', borderRadius: '2px' }}
            >
              <LiaLinkedinIn size={'32px'} />
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Container height="35px" padding="0px" margin="0px 0px 20px">
            <Textbox color={Colors.white} fontWeight="600" fontSize="20px">
              Quick Links
            </Textbox>
          </Container>
          <StyledTextbox
            route="/shipping"
            color={Colors.white}
            fontWeight="lighter"
          >
            Shipping & delivery
          </StyledTextbox>
          <StyledTextbox
            route="/cancellation"
            color={Colors.white}
            fontWeight="lighter"
          >
            Cancellation & refunds
          </StyledTextbox>
          <StyledTextbox
            route="/terms"
            color={Colors.white}
            fontWeight="lighter"
          >
            Terms & Conditions
          </StyledTextbox>
          <StyledTextbox
            route="/privacy"
            color={Colors.white}
            fontWeight="lighter"
          >
            Provacy Policy
          </StyledTextbox>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyleLogo height={'90'} width={'281.25'} />
          <Textbox
            style={{ marginTop: 'auto' }}
            fontSize="12px"
            color={Colors.white}
            fontWeight="lighter"
          >
            ® Myaha, 2023. All rights reserved
          </Textbox>
        </div>
        {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <StyleLogo height={'120'} width={'350'} />
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
          <div style={{ fontSize: '12px', textAlign: 'left', opacity: '0.5' }}>
            ® Myaha, 2023. All rights reserved
          </div>
        </div>
        <div style={{ display: 'flex', gap: '30px'}}>
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
              className="clickable hover_underline"
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
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <a
                href={`https://www.instagram.com/myaha.co?igsh=MXVneTY0cnl3a2ZwNQ==`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '2px', borderRadius: '2px' }}
              >
                <LiaInstagram size={'32px'} />
              </a>
              <a
                href={`https://x.com/MyahaIndia`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '2px',
                  borderRadius: '2px',
                }}
              >
                <LiaTwitter size={'32px'} />
              </a>
              <a
                href={`https://in.pinterest.com/06espov87v6s4p8p49qexdj4fnqr6h/`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '2px', borderRadius: '2px' }}
              >
                <LiaPinterestSquare size={'32px'} />
              </a>
              <a
                href={`https://www.linkedin.com/company/myaha-home/`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '2px', borderRadius: '2px' }}
              >
                <LiaLinkedinIn size={'32px'} />
              </a>
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
              className="clickable hover_underline"
              onClick={() => route.push('/about-us')}
              style={{ display: 'block', fontSize: '1.3em' }}
            >
              About us
            </div>
            <div
              className="clickable hover_underline"
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
              className="clickable hover_underline"
              onClick={() => route.push('/terms')}
              style={{ display: 'block', fontSize: '1.3em' }}
            >
              Terms and Conditions
            </div>
            <div
              className="clickable hover_underline"
              onClick={() => route.push('/privacy')}
              style={{ display: 'block', fontSize: '1.3em' }}
            >
              Privacy Policy
            </div>
            <div
              className="clickable hover_underline"
              onClick={() => route.push('cancellation')}
              style={{ display: 'block', fontSize: '1.3em' }}
            >
              Cancellation and Refund
            </div>
            <div
              className="clickable hover_underline"
              onClick={() => route.push('/shipping')}
              style={{ display: 'block', fontSize: '1.3em' }}
            >
              Shipping and Delivery
            </div>
          </TextContainer>
        </div> */}
      </div>
    </FooterContainer>
  );
};

export default Footer;
