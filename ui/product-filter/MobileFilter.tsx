'use client';
import Sidebar from '../components/Sidebar';
import Filter from './Filter';

interface FilterProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sort: string;
  setSort: (sort: string) => void;
  avaialble: string;
  setAvailable: (available: string) => void;
  setCurrentPage: (page: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileFilter = ({
  avaialble,
  isOpen,
  priceRange,
  setAvailable,
  setCurrentPage,
  setIsOpen,
  setPriceRange,
  setSort,
  sort,
}: FilterProps) => {
  return (
    <Sidebar
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      side="right"
      width={'85%'}
      title="Cart"
    >
      <Filter
        setSort={setSort}
        setAvailable={setAvailable}
        setPriceRange={setPriceRange}
        setCurrentPage={setCurrentPage}
        priceRange={priceRange}
        sort={sort}
        avaialble={avaialble}
      />
    </Sidebar>
  );
};

export default MobileFilter;
