import { Products } from '#/context/ProductContext';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from './ModalComponent';
import ProductDropdownItem from './ProductDropDownItem';

interface CommandBarProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => Products;
}

export default function CommandBar({
  isOpen,
  onClose,
  onSearch,
}: CommandBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedProducts, setSearchedProducts] = useState<Products>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSearchedProducts([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchedProducts(onSearch(query));
    setSelectedIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) =>
        Math.min(prev + 1, searchedProducts.length - 1),
      );
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && searchedProducts[selectedIndex]) {
      router.push(
        `/product/${searchedProducts[selectedIndex].id.replace('gid://shopify/Product/', '')}`,
      );
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <SearchInput
          autoFocus
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Search for products..."
        />
        <ResultsContainer>
          {searchedProducts.map((product) => (
            <div
              onClick={() => {
                router.push(
                  `/product/${product.id.replace('gid://shopify/Product/', '')}`,
                );
                onClose();
              }}
            >
              <ProductDropdownItem product={product} />
            </div>
          ))}
        </ResultsContainer>
      </Container>
    </Modal>
  );
}

// Styled components
const Container = styled.div`
  background: white;
  padding: 16px;
  width: 50%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  @media (max-width: 800px) {
    width: 80%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;

  &:focus {
    border: none;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #007bff;
  }
  &:active {
    border: none;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #007bff;
  }
`;

const ResultsContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
