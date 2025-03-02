'use client';
import { useIsMobile } from '#/hooks/useMobile';
import FooterCarousel from '#/ui/components/FooterCarousel';
import newStyled from '@emotion/styled';

const Container = newStyled.div`
    padding: 100px 20px 20px;
    @media (max-width: 800px) {
        padding: 60px 20px 20px;
    }
`;

const Div1 = newStyled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    >div {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        background-color: #5F1E1E;
        margin: 40px 0px;
        height: 680px;
        padding: 250px 180px 250px 50px;
        font-size: 14px;
        font-weight: lighter;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    @media (max-width: 800px) {
        flex-direction: column; 
        >div {
            width: 90%;
            border-top-right-radius: 0px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            margin: 0px;
            padding: 30px;
            height: min-content;
        }
    }
`;

const Div2 = newStyled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-gap: 10px;
    place-items: stretch;
    >div{
        padding:40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: lighter;
        border-radius: 10px;
    }
    .colored{
        font-size: 12px;
        background-color: black;
        color: white;
    }
    @media (max-width: 800px) {
        display: flex;
        flex-direction: column;
    }
`;

const Div3 = newStyled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    grid-gap: 10px;
    place-items: stretch;
    >div{
        padding:40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: lighter;
        border-radius: 10px;
        border: 1px solid black;
    }
    .colored{
        border: 1px solid transparent;
        font-size: 12px;
        background-color: #213017;
        color: white;
    }
    @media (max-width: 800px) {
        display: flex;
        flex-direction: column;
    }
`;

const Div4 = newStyled.div`
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    justify-content: center;
    align-items: center;
    >img {
        width: 100%;
        object-fit: cover;
    }
    >div {
        max-width: 90%;
        font-weight: lighter;
        font-size: 36px;
        position: absolute;
        text-align: center;
        justify-content: center;
        align-items: center;
        color: white;
    }
    .italize {
        font-style: italic;
        font-weight: 400;
    }
    @media (max-width: 800px) {
        >div {
            padding: 20px;
            font-size: 10px;
        }
    }
`;

const Div5 = newStyled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
    .header{
        font-size: 30px;
        font-weight: 500;
    }
    >div {
        text-align: center;
        font-size: 18px;
        font-weight: lighter;
    }
    @media (max-width: 800px) {
        >div {
            font-size: 14px;
        }
        .header{
            font-size: 20px;
        }
    }
`;

const AboutUs = () => {
  const isMobile = useIsMobile();
  return (
    <Container>
      <Div1>
        <img
          src="/images/about-us/about-us1.png"
          alt="about-us"
          style={{ width: isMobile ? '100%' : '805px' }}
        />
        <div>
          Myaha was born from a deep love for art and design, where raw beauty
          meets modern creativity. Founded by Saumya, Myaha is a reflection of
          her passion for crafting unique, character-filled home decor that
          tells a story. Our pieces blend traditional craftsmanship with a
          contemporary twist, offering a hint of playful pop. Each item is
          thoughtfully designed to bring warmth, vibrancy, and originality into
          your home. From Jaipur to the world, Myaha is about more than just
          decor—it’s about creating spaces that feel personal and alive. Welcome
          to Myaha, where every piece is crafted with care and meant to be
          cherished.
        </div>
      </Div1>
      <Div2>
        <img src="/images/about-us/about-us2.png" alt="about-us-2" />
        <div>
          Myaha inspires customers to see their homes as reflections of their
          personal journeys warm, inviting spaces that evoke a sense of
          belonging.
        </div>
        <div className="colored">
          Each product is designed to tell a unique narrative, allowing
          customers to express their individuality and create a home that feels
          truly their own.
        </div>
      </Div2>
      <Div3>
        <div>
          Our pieces blend traditional craftsmanship with a contemporary twist,
          offering a hint of playful pop. Each item is thoughtfully designed to
          bring warmth, vibrancy, and originality into your home. From Jaipur to
          the world, Myaha is about more than just decor—it’s about creating
          spaces that feel personal and alive.
        </div>
        <div className="colored">
          The brand merges timeless craftsmanship with modern design, ensuring
          products that are both high-quality and innovative.
        </div>
        <img src="/images/about-us/about-us5.png" alt="about-us-3" />
      </Div3>
      <Div4>
        <img src="/images/about-us/about-us4.png" alt="about-us-4" />
        <div>
          <div>At Myaha, we don't just create decor,</div>
          <div className="italize">
            we craft stories that transform your house into a home, one timeless
            piece at a time.
          </div>
        </div>
      </Div4>
      <FooterCarousel />
      <Div5>
        <div className="header">
          Bringing our vision to life , One step at a time
        </div>
        <div>
          At Myaha, our vision is to transform the way people experience home
          decor by creating pieces that are not only beautiful but deeply
          personal. We aim to blend timeless craftsmanship with modern
          creativity, offering products that resonate with individuality and
          evoke a sense of belonging. Our goal is to inspire people to see their
          homes as reflections of their unique stories, where each piece tells a
          narrative and every space feels like a warm embrace.
        </div>
      </Div5>
    </Container>
  );
};

export default AboutUs;
