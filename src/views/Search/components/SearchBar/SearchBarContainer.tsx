import { ReactNode, useCallback, useState } from 'react';

import { SearchItem } from '@/types/search';

import { useDebounceGetWordList } from '../../hooks/use-debounce-get-word-list';
import RelatedWordList from './RelatedWordList';
import SearchBar from './SearchBar';

interface SearchBarContainerProps {
  children: ReactNode;
  initialWord?: string;
}

const SearchBarContainer = (props: SearchBarContainerProps) => {
  const { children, initialWord } = props;

  const [searchInput, setSearchInput] = useState(initialWord ?? '');
  const [relatedWordList, setRelatedWordList] = useState<SearchItem[]>([]);

  const debounceGetWordList = useDebounceGetWordList(setRelatedWordList);

  const handleSearchInputValue = (value: string) => {
    setSearchInput(value);
  };

  const resetRelatedWordList = useCallback(() => {
    setRelatedWordList([]);
  }, []);

  return (
    <>
      <SearchBar
        initialWord={initialWord}
        searchInput={searchInput}
        debounceGetWordList={debounceGetWordList}
        resetRelatedWordList={resetRelatedWordList}
        handleSearchInputValue={handleSearchInputValue}
      />

      {initialWord !== searchInput && searchInput && (
        <RelatedWordList
          searchWord={searchInput}
          relatedWordList={relatedWordList}
          handleSearchInputValue={handleSearchInputValue}
        />
      )}

      {children}
    </>
  );
};

export default SearchBarContainer;
