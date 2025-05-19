'use client';
import Colors from '#/ui/colors/colors';
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
      border-radius: 10px;
      min-width: 800px;
      max-width: 800px;
      min-height: 800px;
      max-height: 800px;
      object-fit: cover;
      object-position: 40% 100%;
    }
    >div {
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${Colors.white};
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
        min-width: 600px;
        max-width: 600px;
        min-height: 600px;
        max-height: 600px;
        object-fit: cover;
        object-position: 0% 50%;
      }
         >div { 
            width: 500px;
            padding: 10px 30px;
            height: 400px;
            font-size: 14px;
        }   
    }

    @media (max-width: 1150px) {
        >div { 
            width: 400px;
            padding: 10px 30px;
            height: 400px;
            font-size: 14px;
        }   
    }
    @media (max-width: 800px) {
        flex-direction: column; 
        >img{
          min-width: auto;
          max-width: auto;
          min-height: auto;
          max-height: auto;
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
      object-position: 0% 50%;
    }
    >div{
        padding:40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: lighter;
        border-radius: 10px;
    }
    .colored{
        font-size: 16px;
        background-color: ${Colors.black};
        color: ${Colors.white};
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
        font-size: 16px;
        font-weight: lighter;
        border-radius: 10px;
        border: 1px solid ${Colors.white};
    }
    .colored{
        border: 1px solid transparent;
        font-size: 16px;
        background-color: #213017;
        color: ${Colors.white};
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
        object-position: 0% 85%;
        height: 700px;
    }
    >div {
        position: absolute;
        top: 120px;
        max-width: 90%;
        font-weight: lighter;
        font-size: 32px;
        position: absolute;
        text-align: center;
        justify-content: center;
        align-items: center;
        color: ${Colors.white};
    }
    .italize {
        font-style: italic;
        font-weight: 400;
    }
    @media (max-width: 800px) {
        >div {
            top: 20px;
            padding: 20px;
            font-size: 14px;
        }
        >img {
            width: 100%;
            object-fit: cover;
            height: 300px;
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
        <img
          height={500}
          width={500}
          src="https://i.postimg.cc/2SG8536P/DSCF4911.jpg"
          alt="about-us"
        />
        <div>
          A commune where we bend limits, break rules and come up with designs
          that inspire. Our spaces become an integral part of our identity over
          time, and they must reflect our individualities unapologetically.
          Myaha welcomes this idea with experimentation in concepts, designs &
          curations.
          <br />
          With a larger focus on promoting local and sustainable, our work
          leaves a mark on every home it accentuates. Explore the ranges of
          variation in decor and experiment until you find your Myaha.
        </div>
      </Div1>
      <Div2>
        <img
          src="https://i.postimg.cc/FKnrjq0p/DSCF5605.jpg"
          alt="about-us-2"
        />
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
        <img
          src="https://i.postimg.cc/JnD1KqqL/DSCF5640.jpg"
          alt="about-us-3"
        />
      </Div3>
      <Div4>
        <img
          src="https://i.postimg.cc/QMMNKsKV/DSCF4991.jpg"
          alt="about-us-4"
        />
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
