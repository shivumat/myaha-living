import { useProduct } from '#/context/ProductContext';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';

const Container = newStyled.div`
    padding: 20px;
    margin: 0px auto;
    align-items: center;
    justify-content: center;
    width: min-content;
`;

const Collections = ({ toggle }: { toggle?: () => void }) => {
  const { collections } = useProduct();
  const router = useRouter();
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          width: '100%',
          overflowX: 'auto',
        }}
      >
        {collections.map((collection) => (
          <div
            className="clickable"
            onClick={() => {
              toggle && toggle();
              router.push(
                `/products/${collection.id.replace('gid://shopify/Collection/', '')}`,
              );
            }}
            key={collection.id}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <img
              src={collection.productImage}
              alt={collection.title}
              style={{
                minWidth: '200px',
                width: '280px',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {collection.title}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Collections;
