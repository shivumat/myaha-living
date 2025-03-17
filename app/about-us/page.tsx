'use client';
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
    >img{
      height: 750px;
    }
    >div {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        background-color: #5F1E1E;
        margin: 40px 0px;
        height: 680px;
        padding: 250px 180px 250px 50px;
        font-size: 16px;
        font-weight: lighter;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    
    @media (max-width: 1350px) {
      >div {
        padding: 250px 70px 250px 50px;
      }
      >img{
        height: 450px;
      }
    }

    @media (max-width: 1150px) {
      >img {
          width: 550px;
      }
        >div { 
            width: 400px;
            padding: 10px 30px;
            height: 400px;
            font-size: 10px;
        }   
    }
    @media (max-width: 800px) {
        flex-direction: column; 
        >img{
          width: 100%;
        }
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
    >img{
      height: 450px;
      object-fit: cover;
      object-position: 0% 100%;
    }
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
    >img{
      height: 500px;
    }
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
        >img{
          height: auto;
        }
    }
`;

const Div4 = newStyled.div`
    position: relative;
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    justify-content: center;
    align-items: center;
    >img {
        width: 100%;
        object-fit: cover;
        height: 700px;
    }
    >div {
        position: absolute;
        top: 120px;
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
            top: 20px;
            padding: 20px;
            font-size: 10px;
        }
        >img {
            width: 100%;
            object-fit: cover;
            height: auto;
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
  return (
    <Container>
      <Div1>
        <img src="/images/about-us/about-us1.png" alt="about-us" />
        <div>
          Myaha was crafted as a movement where we believe that home decor
          should be as versatile and expressive as our own personality. We have
          our own individualities & our spaces should reflect that.
        </div>
      </Div1>
      <Div2>
        <img src="/images/about-us/about-us3.png" alt="about-us-2" />
        <div>
          From bold, expressive, and unconventional designs to elegant,
          details-rich compositions- Myaha creates on all fronts. Why follow the
          rules when you can mold them to be your own? Our collection blends
          high-end craftsmanship with playful elegance, breaking away from the
          ordinary to bring you designs that spark curiosity, conversation, and
          joy.
        </div>
        <div className="colored">
          From sculptural vases to avant-garde lighting, our pieces have a
          playful take on traditional aesthetics as well, inviting you to
          experiment, mix, and redefine your space. Whether you’re drawn to the
          daring or the delightfully unexpected, we offer decor that transforms
          homes into reflections of individual personalities.
        </div>
      </Div2>
      <Div3>
        <div>
          With a focus on promoting sustainable choices and homegrown art, Myaha
          features collections that are thoughtfully crafted and curated.
        </div>
        <div className="colored">
          Let your individuality find its Myaha & let your space tell your story
        </div>
        <img src="/images/about-us/about-us4.png" alt="about-us-3" />
      </Div3>
      <Div4>
        <img src="/images/about-us/about-us2.png" alt="about-us-4" />
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
