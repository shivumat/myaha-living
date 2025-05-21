import newStyled from '@emotion/styled';
import React, { JSX } from 'react';
import Colors from '../colors/colors';

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const PaginationWrapper = newStyled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const PageNumber = newStyled.button<{ active: boolean }>`
  padding: 8px 12px;
  border: none;
  background-color: ${(props) => (props.active ? '#000000' : '#f0f0f0')};
  color: ${(props) => (props.active ? Colors.white : 'black')};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? '#000000' : '#d6d6d6')};
  }
`;

const Ellipsis = newStyled.span`
  padding: 8px 12px;
  color: #666;
`;

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPageNumbers = () => {
    const pages: JSX.Element[] = [];
    const maxPagesToShow = 5;

    if (totalPages < 2) return null;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PageNumber
            key={i}
            active={i === currentPage}
            onClick={() => onPageChange(i)}
          >
            {i}
          </PageNumber>,
        );
      }
    } else {
      pages.push(
        <PageNumber
          key={1}
          active={1 === currentPage}
          onClick={() => onPageChange(1)}
        >
          1
        </PageNumber>,
      );

      if (currentPage > 3) pages.push(<Ellipsis key="start">...</Ellipsis>);

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <PageNumber
            key={i}
            active={i === currentPage}
            onClick={() => onPageChange(i)}
          >
            {i}
          </PageNumber>,
        );
      }

      if (currentPage < totalPages - 2)
        pages.push(<Ellipsis key="end">...</Ellipsis>);

      pages.push(
        <PageNumber
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </PageNumber>,
      );
    }

    return pages;
  };

  return (
    <PaginationWrapper className={className}>
      {renderPageNumbers()}
    </PaginationWrapper>
  );
};

export default Pagination;
