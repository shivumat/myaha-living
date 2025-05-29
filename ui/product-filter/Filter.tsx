import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import Colors from '../colors/colors';
import Container from '../components/ContainerBox';
import { Dropdown } from '../components/Dropdown';
import PriceFilter from '../components/PriceDropdown';

const SortDropdown = newStyled(Dropdown)`
  margin-left: auto;
  width: 400px;
  @media (max-width: 800px) {
    margin-left: 0px;
    width: 100%;
  }
`;

const AvailabilityDropdown = newStyled(Dropdown)`
  @media (max-width: 800px) {
    margin-left: 0px;
    width: 100%;
  }
`;

interface FilterProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sort: string;
  setSort: (sort: string) => void;
  avaialble: string;
  setAvailable: (available: string) => void;
  setCurrentPage: (page: number) => void;
}

const Filter = ({
  avaialble,
  priceRange,
  setAvailable,
  setCurrentPage,
  setPriceRange,
  setSort,
  sort,
}: FilterProps) => {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: !isMobile ? 'center' : 'flex-start',
        columnGap: '20px',
        padding: '20px 0',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      <Container
        padding="0px"
        {...(!isMobile
          ? { flexRow: true, style: { gap: '20px' } }
          : { width: '100%' })}
      >
        <PriceFilter
          min={0}
          max={10000}
          value={priceRange}
          onChange={(v) => {
            setCurrentPage(1);
            setPriceRange(v);
          }}
        />
        <AvailabilityDropdown
          options={['Available', 'Out of Stock']}
          onSelect={(option) => {
            setCurrentPage(1);
            setAvailable(option);
          }}
          renderTrigger={(toggle) => (
            <Container
              width={isMobile ? '100%' : 'auto'}
              padding="0px"
              margin={isMobile ? '10px 0px 0px' : '0px'}
              style={{ gap: '10px', justifyContent: 'space-between' }}
              flexRow
              horizontalCenter
            >
              Availability :
              <div
                onClick={toggle}
                style={{
                  cursor: 'pointer',
                  width: '200px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  border: `1px solid ${Colors.black}`,
                  alignItems: 'center',
                  padding: '3.5px 10px',
                  borderRadius: '4px',
                }}
              >
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    padding: '5px 0px',
                  }}
                >
                  {avaialble}
                </div>
                <img
                  src="/images/caret.png"
                  alt="sort"
                  style={{ width: '20px', height: '20px' }}
                />
              </div>
            </Container>
          )}
          renderOption={(option: any) => <span> {option}</span>}
        />
      </Container>
      <SortDropdown
        options={[
          'Featured',
          'Name: (A-Z)',
          'Name: (Z-A)',
          'Price: Low to High',
          'Price: High to Low',
        ]}
        onSelect={(option) => {
          setCurrentPage(1);
          setSort(option);
        }}
        renderTrigger={(toggle) => (
          <Container
            width={isMobile ? '100%' : 'auto'}
            padding="0px"
            margin={isMobile ? '10px 0px 0px' : '0px'}
            style={{
              gap: '10px',
              justifyContent: isMobile ? 'space-between' : 'flex-end',
            }}
            flexRow
            horizontalCenter
          >
            Sort By :
            <div
              onClick={toggle}
              style={{
                cursor: 'pointer',
                width: '200px',
                display: 'flex',
                justifyContent: 'space-between',
                border: `1px solid ${Colors.black}`,
                alignItems: 'center',
                padding: '3.5px 10px',
                borderRadius: '4px',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  padding: '5px 0px',
                }}
              >
                {sort}
              </div>
              <img
                src="/images/caret.png"
                alt="sort"
                style={{ width: '20px', height: '20px' }}
              />
            </div>
          </Container>
        )}
        renderOption={(option: any) => <span> {option}</span>}
      />
    </div>
  );
};

export default Filter;
