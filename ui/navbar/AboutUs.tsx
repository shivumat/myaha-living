import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import Colors from '../colors/colors';

const Container = newStyled.div`
    padding: 0px 60px;
    display: grid;
    grid-template-columns: 2fr 7fr;
    color: ${Colors.white};
    gap: 20px;
`;

const Button = newStyled.button`
    width: 200px;
    padding: 12px;
    background: transparent;
    border: 1px solid ${Colors.white};
    color: ${Colors.white};
    font-size: 16px;
    cursor: pointer;
    border-radius: 6px;
    transition: background 0.3s;
    margin-top: 20px;
    &:hover {
        background: ${Colors.white};
        color: ${Colors.black};
    }
`;

const AboutUs = ({ toggle }: { toggle?: () => void }) => {
  const router = useRouter();

  const gotoAboutUs = () => {
    toggle && toggle();
    router.push('/about-us');
  };
  return (
    <Container>
      <div>
        <img
          src="https://i.postimg.cc/2SG8536P/DSCF4911.jpg"
          alt="about-us"
          style={{ width: '100%', height: '350px', objectFit: 'cover' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <div
          style={{ fontWeight: 'bold', fontSize: '36px', color: '#FFFFFF45' }}
        >
          <span style={{ display: 'block' }}>Crafted like emotions.</span>
          <span>Raw, composed, edgy, wild.</span>
        </div>
        <Button className="clickable" onClick={gotoAboutUs}>
          View More
        </Button>
      </div>
    </Container>
  );
};

export default AboutUs;
