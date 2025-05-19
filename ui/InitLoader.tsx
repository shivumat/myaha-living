// components/FlowerLoader.tsx

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import Image from 'next/image';

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation:
    sway 1000ms ease-in-out infinite,
    bloom 1000ms ease-in-out infinite;
  transform-origin: bottom center;
  width: 120px;

  @keyframes sway {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(5deg);
    }
    50% {
      transform: rotate(-5deg);
    }
    75% {
      transform: rotate(5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes bloom {
    0%,
    100% {
      scale: 1;
    }
    50% {
      scale: 1.05;
    }
  }
`;

const InitLoader = () => {
  return (
    <LoaderWrapper>
      <Image
        src="/images/floral.png"
        alt="Flower Loader"
        width={120}
        height={180}
        priority
      />
    </LoaderWrapper>
  );
};

export default InitLoader;
