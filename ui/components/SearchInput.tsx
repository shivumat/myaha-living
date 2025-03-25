'use client';

import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';

// Styled input field
const SearchWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const StyledInput = styled.input`
  position: relative;
  width: 100%;
  padding: 10px 14px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  transition: border-color 0.2s ease-in-out;

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

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Debounce function
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      onSearch(searchTerm);
    }, 300),
    [],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <SearchWrapper>
      <StyledInput
        autoFocus
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
    </SearchWrapper>
  );
};

export default SearchInput;
