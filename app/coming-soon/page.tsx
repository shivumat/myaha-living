'use client';
import ComingSoonComponent from '#/ui/coming-soon';
import { useIsMobile } from '#/ui/useMobile';
import newStyled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

interface ImageData {
  src: string;
  height: number;
  fullImage: boolean;
}

const columnWidth = 400; // Fixed width for each column
const scrollSpeed = 1.5; // Adjust scrolling speed

const Backdrop = newStyled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #5F1E1E48; /* Blue tint with transparency */
  z-index: 500; /* Ensure it appears above content */
`;

const Modal = newStyled.div<{ isMobile: boolean }>`
  position: fixed;
  top: ${({ isMobile }) => (isMobile ? '15%' : '25%')};
  left: ${({ isMobile }) => (isMobile ? '15%' : '25%')};
  width: ${({ isMobile }) => (isMobile ? '70vw' : '50vw')};
  height: ${({ isMobile }) => (isMobile ? '70vh' : '50vh')};
  background: #5F1E1E; /* Blue tint with transparency */
  z-index: 600; /* Ensure it appears above content */
`;

export default function ComingSoonPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [columns, setColumns] = useState<ImageData[][]>([]);
  const isMobile = useIsMobile();

  const images: string[] = [
    '/images/whitelist/1.png',
    '/images/whitelist/2.png',
    '/images/whitelist/3.png',
    '/images/whitelist/4.png',
    '/images/whitelist/5.png',
    '/images/whitelist/6.png',
    '/images/whitelist/7.png',
    '/images/whitelist/8.png',
    '/images/whitelist/9.png',
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const containerHeight = window.innerHeight;
    let tempColumns: ImageData[][] = [[]];
    let currentHeight = 0;
    let colIndex = 0;

    // Duplicate images for seamless scrolling effect
    const copiedImages = [...images, ...images];

    const processImages = async () => {
      for (const src of copiedImages) {
        const img = new Image();
        img.src = src;
        await img.decode(); // Ensure image is loaded

        const aspectRatio = img.width / img.height;
        const imgHeight = columnWidth / aspectRatio;

        if (currentHeight + imgHeight > containerHeight) {
          // Handle cropped image continuation
          const visibleHeight = containerHeight - currentHeight;
          const croppedHeight = imgHeight - visibleHeight;

          tempColumns[colIndex].push({
            src,
            height: visibleHeight,
            fullImage: false,
          });

          colIndex++;
          if (!tempColumns[colIndex]) tempColumns[colIndex] = [];
          tempColumns[colIndex].push({
            src,
            height: croppedHeight,
            fullImage: false,
          });

          currentHeight = croppedHeight;
        } else {
          tempColumns[colIndex].push({
            src,
            height: imgHeight,
            fullImage: true,
          });
          currentHeight += imgHeight;
        }
      }

      setColumns([...tempColumns]);
    };

    processImages();
  }, []);

  // Auto-scroll effect using requestAnimationFrame
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let scrollLeft = 0;
    let animationFrameId: number;

    const smoothScroll = () => {
      if (!container) return;

      scrollLeft += scrollSpeed;
      if (scrollLeft >= container.scrollWidth / 2) {
        scrollLeft = 0; // Reset scroll for a seamless loop
      }
      container.scrollLeft = scrollLeft;
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <>
      <Backdrop />
      <Modal isMobile={isMobile} className="rounded-lg">
        <ComingSoonComponent />
      </Modal>
      <div
        ref={containerRef}
        className="image-grid"
        style={{
          display: 'flex',
          overflowX: 'hidden', // Hide scrollbar
          whiteSpace: 'nowrap',
          position: 'relative',
          width: '100vw',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content', // Ensures content overflows horizontally
          }}
        >
          {[...columns, ...columns].map((col, index) => (
            <div
              key={index}
              className="column"
              style={{
                width: `${columnWidth}px`,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {col.map((img, i) => (
                <div
                  key={i}
                  style={{
                    width: '100%',
                    height: `${img.height}px`,
                    backgroundImage: `url(${img.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: img.fullImage ? 'center' : 'top',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
