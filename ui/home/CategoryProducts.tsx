import { useProduct } from '#/context/ProductContext';
import { getRandomSubArray } from '#/lib/util';
import newStyled from '@emotion/styled';
import ProductWithVariants from '../components/ProductWithVariants';
// import ProductWithDetails from "../components/ProductWithDetails";

const Conatiner = newStyled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    width: 100%;
    margin: 20px 0px 0px 0px; 
    padding-bottom: 20px; 
    @media (max-width: 800px) {
        grid-template-columns: 1fr;
    }
`;

const CategoryProducts = () => {
  const { products, collections } = useProduct();

  const productsCollection = collections
    .map((productCollection) => {
      const collectionProducts = products.filter((product) =>
        product.collections.some(
          (collection) =>
            collection.id === 'gid://shopify/Collection/479846564087',
        ),
      );
      return {
        title: productCollection.title,
        products: collectionProducts,
      };
    })
    .sort((a, b) => b.products.length - a.products.length)[0];

  const featuredProducts = getRandomSubArray(
    productsCollection?.products ?? [],
    6,
  );

  if (!productsCollection) return null;
  return (
    <>
      <div
        style={{
          fontSize: '24px',
          fontWeight: 500,
          width: '100%',
          textAlign: 'center',
          padding: '20px 0px',
        }}
      >
        View our {productsCollection.title} collection
      </div>
      <Conatiner>
        {featuredProducts.map((product) => (
          <ProductWithVariants key={product.id} product={product} />
        ))}
      </Conatiner>
    </>
  );
};

export default CategoryProducts;
