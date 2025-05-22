import Pagination from '#/ui/components/PaginationComponent';
import newStyled from '@emotion/styled';

export const ListBody = newStyled.div`
    padding: 20px;
`;

export const Conatiner = newStyled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    width: 100%;
    margin: 20px 0px 0px 0px; 
    padding-bottom: 20px; 
    @media (max-width: 1400px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 800px) {
        grid-template-columns: 1fr 1fr;
    }
`;

export const StyledPagination = newStyled(Pagination)`
  margin-bottom: 16px;
`;
