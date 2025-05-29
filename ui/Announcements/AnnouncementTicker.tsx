/** @jsxImportSource @emotion/react */
import { AnnouncementData } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import Colors from '../colors/colors';
import Container from '../components/ContainerBox';

type Props = {
  announcements: AnnouncementData[];
  interval?: number; // in ms
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  color: ${Colors.white};
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  color: ${Colors.white};
  padding: 6px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const LeftButton = styled(NavButton)`
  left: 10px;
`;

const RightButton = styled(NavButton)`
  right: 10px;
`;

export const AnnouncementTicker: React.FC<Props> = ({
  announcements,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = announcements.length;
  const isMobile = useIsMobile();

  useEffect(() => {
    if (total <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, interval);

    return () => clearInterval(timer);
  }, [total, interval]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  if (total === 0) return null;

  return (
    <Wrapper>
      <Container
        padding="12px 48px"
        height="38px"
        fontSize={isMobile ? '14px' : '16px'}
        color={Colors.white}
        horizontalCenter
        verticalCenter
        bgColor={announcements[currentIndex].color}
      >
        {announcements[currentIndex].text}
      </Container>

      {total > 1 && (
        <>
          <LeftButton onClick={handlePrev} aria-label="Previous">
            <HiOutlineChevronLeft />
          </LeftButton>
          <RightButton onClick={handleNext} aria-label="Next">
            <HiOutlineChevronRight />
          </RightButton>
        </>
      )}
    </Wrapper>
  );
};
