import newStyled from '@emotion/styled';
import { useRef } from 'react';

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

const Video = newStyled.video`
    display: none;
    height: 600px;
    @media (max-width: 800px) {
        width: 100%;
    }
`;

const OurStory = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbNailRef = useRef<HTMLDivElement>(null);

  const playVideo = () => {
    if (!videoRef.current || !thumbNailRef.current) return;
    thumbNailRef.current.style.display = 'none';
    videoRef.current.style.display = 'block';
    videoRef.current.play();
    videoRef.current.setAttribute('controls', 'controls');
    videoRef.current.addEventListener('ended', function () {
      if (!videoRef.current || !thumbNailRef.current) return;
      videoRef.current.removeAttribute('controls');
      thumbNailRef.current.style.display = 'flex';
      videoRef.current.style.display = 'none';
    });
  };

  return (
    <Container onClick={playVideo}>
      <Thumbnail
        ref={thumbNailRef}
        id="thumbnail"
        style={{ backgroundImage: `url('/images/thumbnail.png')` }}
      >
        Our Story
        <img
          src="/images/play.png"
          alt="play"
          style={{ height: '50px', width: '50px' }}
        />
      </Thumbnail>
      <Video ref={videoRef} preload="metadata">
        <source src="/images/our_story.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </Video>
    </Container>
  );
};

export default OurStory;
