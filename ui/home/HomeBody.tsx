'use client';
import newStyled from '@emotion/styled';
import FooterCarousel from '../components/FooterCarousel';
import Categories from './Categories';
import CategoryProducts from './CategoryProducts';
import OurStory from './OurStory';
import FeaturedProducts from './ProductsFeatured';

const Container = newStyled.div`
  padding: 20px;
`;

const Div1 = newStyled.div`
  padding: 40px;
  border-radius: 10px;
  color: white;
  background-color: #5B1D1D;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: lighter;
  .title{
    font-size: 36px;
    margin-bottom: 5px;
  }
  @media (max-width: 800px) {
    padding: 20px;
    font-size: 12px;
    .title{
      font-size: 20px;
    }
  }

`;

const FetaureConstainer = newStyled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100%;
  .title{
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    width: 100%;
  }
`;

const HomeBody = () => {
  return (
    <Container>
      <Div1>
        <div className="title">
          Crafting emotions, not just essentials – where every design tells your
          story
        </div>
        <div>
          Elevate your indoor or outdoor greenery with our Sage Green Ceramic
          Planter. Its soft, soothing hue and clean lines add a touch of
          elegance to any space, blending seamlessly with a variety of decor
          styles.
        </div>
      </Div1>
      <Categories />
      <FetaureConstainer>
        <div className="title">Featured products</div>
        <FeaturedProducts />
      </FetaureConstainer>
      <FooterCarousel />
      <OurStory />
      <CategoryProducts />
    </Container>
  );
};

export default HomeBody;
