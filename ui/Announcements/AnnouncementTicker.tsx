/** @jsxImportSource @emotion/react */
import { AnnouncementData } from '#/context/ProductContext';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Conatiner from '../components/Conatiner';

type Props = {
  announcements: AnnouncementData[];
  interval?: number; // in ms
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.2);
  border: none;
  color: white;
  padding: 6px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
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
      <Conatiner
        padding="12px 48px"
        horizontalCenter
        bgColor={announcements[currentIndex].color}
      >
        {announcements[currentIndex].text}
      </Conatiner>

      {total > 1 && (
        <>
          <LeftButton onClick={handlePrev} aria-label="Previous">
            <FaChevronLeft />
          </LeftButton>
          <RightButton onClick={handleNext} aria-label="Next">
            <FaChevronRight />
          </RightButton>
        </>
      )}
    </Wrapper>
  );
};
