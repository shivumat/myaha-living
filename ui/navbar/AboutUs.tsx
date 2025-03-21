import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';

const Container = newStyled.div`
    padding: 0px 60px;
    display: grid;
    grid-template-columns: 2fr 7fr;
    color: white;
    gap: 20px;
`;

const Button = newStyled.button`
    width: 200px;
    padding: 12px;
    background: transparent;
    border: 1px solid white;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-radius: 6px;
    transition: background 0.3s;
    margin-top: 20px;
    &:hover {
        background: white;
        color: black;
    }
`;

const AboutUs = ({ toggle }: { toggle?: () => void }) => {
  console.log(toggle);

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
        <div style={{ fontWeight: 'lighter', fontSize: '12px' }}>
          Myaha was born from a deep love for art and design, where raw beauty
          meets modern creativity. Founded by Saumya, Myaha is a reflection of
          her passion for crafting unique, character-filled home decor that
          tells a story. Our pieces blend traditional craftsmanship with a
          contemporary twist, offering a hint of playful pop. Each item is
          thoughtfully designed to bring warmth, vibrancy, and originality into
          your home. From Jaipur to the world, Myaha is about more than just
          decor—it’s about creating spaces that feel personal and alive. Welcome
          to Myaha, where every piece is crafted with care and meant to be
          cherished. At Myaha, our vision is to transform the way people
          experience home decor by creating pieces that are not only beautiful
          but deeply personal. We aim to blend timeless craftsmanship with
          modern creativity, offering products that resonate with individuality
          and evoke a sense of belonging. Our goal is to inspire people to see
          their homes as reflections of their unique stories, where each piece
          tells a narrative and every space feels like a warm embrace.
        </div>
        <Button className="clickable" onClick={gotoAboutUs}>
          View More
        </Button>
      </div>
    </Container>
  );
};

export default AboutUs;
