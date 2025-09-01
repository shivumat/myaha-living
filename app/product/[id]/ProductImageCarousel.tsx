import { mergeHexColorsWithWeights } from '#/lib/util';
import Colors from '#/ui/colors/colors';
import Container from '#/ui/components/ContainerBox';
import Image from 'next/image';
import React from 'react';

const ProductImageCarousel = (props: { images: string[] }) => {
  const { images } = props;
  const [index, setIndex] = React.useState(0);
  const scrollRef = React.useRef<NodeJS.Timeout | null>(null);
  const { length } = images;

  const startAutoScroll = () => {
    if (scrollRef.current) return;
    scrollRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (scrollRef.current) {
      clearInterval(scrollRef.current);
      scrollRef.current = null;
    }
  };

  React.useEffect(() => {
    stopAutoScroll();
    startAutoScroll();
    return () => {
      stopAutoScroll();
    };
  }, [length]);

  return (
    <Container flexRow>
      <Image
        src={images[index]}
        alt={`Image ${index + 1}`}
        objectFit="cover"
        height={660}
        width={440}
        style={{ borderRadius: '10px' }}
      />
      <Container
        padding="5px 10px"
        style={{
          gap: '10px',
          marginLeft: '10px',
          overflowY: 'scroll',
          height: '660px',
        }}
      >
        {images.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`Image ${idx + 1}`}
            objectFit="cover"
            height={150}
            width={100}
            onClick={() => {
              setIndex(idx);
              stopAutoScroll();
              startAutoScroll();
            }}
            style={{
              border:
                idx === index
                  ? `2.5px solid ${mergeHexColorsWithWeights([
                      { hex: Colors.black, weight: 2 },
                      { hex: Colors.white, weight: 1 },
                    ])}`
                  : 'none',
              cursor: 'pointer',
              borderRadius: '5px',
              transform: idx === index ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s ease-in-out',
            }}
          />
        ))}
      </Container>
    </Container>
  );
};

export default ProductImageCarousel;
