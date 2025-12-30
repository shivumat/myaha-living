import { Collection, useProduct } from '#/context/ProductContext';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { Dropdown } from '../components/Dropdown';

const Container = newStyled.div`
    padding: 20px;
    height: 100%;
    margin: 0px auto;
    align-items: center;
    justify-content: center;
    width: min-content;
`;

const Collections = ({ toggle: onToggle }: { toggle?: () => void }) => {
  const { collections, materialCollections } = useProduct();
  const router = useRouter();

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          width: '100%',
          height: '100%',
          overflowX: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            cursor: 'pointer',
            fontWeight: '500',
            width: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => {
            router.push('/category');
            onToggle?.();
          }}
          className="clickable hover_underline"
        >
          SHOP ALL
        </div>
        <Dropdown
          openOnHover
          options={collections}
          onSelect={(item: Collection) => {
            router.push(
              `/category/${item.id.replace('gid://shopify/Collection/', '')}`,
            );
            onToggle?.();
          }}
          renderTrigger={(toggle) => (
            <div
              style={{ cursor: 'pointer', fontWeight: '500', width: '200px' }}
              onClick={(e) => toggle(e)}
              className="clickable hover_underline"
            >
              SHOP BY CATEGORY
            </div>
          )}
          renderOption={(option) => <span> {option.title}</span>}
        />
        <Dropdown
          openOnHover
          options={materialCollections}
          onSelect={(item: Collection) => {
            router.push(
              `/category/${item.id.replace('gid://shopify/Collection/', '')}`,
            );
            onToggle?.();
          }}
          renderTrigger={(toggle) => (
            <div
              style={{ cursor: 'pointer', fontWeight: '500', width: '200px' }}
              onClick={(e) => toggle(e)}
              className="clickable hover_underline"
            >
              SHOP BY MATERIAL
            </div>
          )}
          renderOption={(option) => <span> {option.title}</span>}
        />
      </div>
    </Container>
  );
};

export default Collections;
