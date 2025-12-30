import { Collection, useProduct } from '#/context/ProductContext';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Colors from '../colors/colors';
import ProductWithVariants from '../components/ProductWithVariants';

const Container = newStyled.div`
  width: 100%;
  background: ${Colors.white};
`;

const Heading = newStyled.h2`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
  letter-spacing: 2px;
  color: ${Colors.black};
`;

const Nav = newStyled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 40px;
  font-size: 18px;
`;

const NavItem = newStyled.button<{ selected: boolean }>`
  background: none;
  border: none;
  font-weight: 500;
  color: ${({ selected }) => (selected ? Colors.black : '#555')};
  position: relative;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 0;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    height: 2px;
    width: ${({ selected }) => (selected ? '100%' : '0')};
    background-color: ${Colors.black};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const Grid = newStyled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  justify-items: center;

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Button = newStyled.button`
  display: block;
  margin: 40px auto 0;
  background: ${Colors.black};
  color: ${Colors.white};
  padding: 12px 32px;
  border: none;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 1px;

  &:hover {
    background: #222;
  }
`;

const ShopWickerSection: React.FC = () => {
  const { materialCollections } = useProduct();
  const [selectedMaterial, setSelectedMaterial] = useState<Collection>(
    materialCollections[0],
  );
  const router = useRouter();
  const hasMore = selectedMaterial?.products?.length > 4;
  const handleLinkClick = (path: string) => {
    router.push(path);
  };

  return (
    <Container>
      <Heading>SHOP BY MATERIAL</Heading>
      <Nav>
        {materialCollections.map((material) => (
          <NavItem
            key={material?.id}
            selected={selectedMaterial === material}
            onClick={() => setSelectedMaterial(material)}
          >
            {material?.title?.toUpperCase()}
          </NavItem>
        ))}
      </Nav>
      <Grid>
        {selectedMaterial?.products
          ?.slice(0, 4)
          ?.map((product) => (
            <ProductWithVariants key={product.id} product={product} />
          ))}
      </Grid>
      {hasMore && (
        <Button
          onClick={() =>
            handleLinkClick(
              `/category/${selectedMaterial?.id.replace('gid://shopify/Collection/', '')}`,
            )
          }
        >
          Load More
        </Button>
      )}
    </Container>
  );
};

export default React.memo(ShopWickerSection);
