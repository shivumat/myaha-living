import { useSearch } from '#/context/SearchContext';
import { useEffect } from 'react';

export function useScrollToSearchId(_breakpoint: number = 800) {
  const { searchText } = useSearch();

  useEffect(() => {
    if (!!searchText) {
      setTimeout(() => {
        const element = document.getElementById(searchText);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          element.click();
        }
      }, 100);
    }
  }, [searchText]);

  return;
}
