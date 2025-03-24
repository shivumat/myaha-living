import newStyled from '@emotion/styled';
import { useState } from 'react';

const Container = newStyled.div`
    position: relative;
    height: 600px;
    width: 100%;
    cursor: pointer;
    border-radius: 10px;
    margin: 20px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #5B1D1D;
`;

const Thumbnail = newStyled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 36px;
    @media (max-width: 800px) {
        font-size: 28px;
    }
`;

const IframeContainer = newStyled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;

    iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
`;

const OurStory = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = () => {
    setIsPlaying(true);
  };

  return (
    <Container id="our_story">
      {!isPlaying ? (
        <Thumbnail
          onClick={playVideo}
          style={{ backgroundImage: `url('/images/thumbnail.png')` }}
        >
          Our Story
          <img
            className="clickable"
            src="/images/play.png"
            alt="play"
            style={{ height: '50px', width: '50px' }}
          />
        </Thumbnail>
      ) : (
        <IframeContainer>
          <iframe
            src="https://www.youtube-nocookie.com/embed/dYvlWflohiM?autoplay=1&rel=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </IframeContainer>
      )}
    </Container>
  );
};

export default OurStory;
