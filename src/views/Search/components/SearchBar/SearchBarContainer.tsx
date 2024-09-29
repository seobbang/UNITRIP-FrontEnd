import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

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

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [relatedWordList, setRelatedWordList] = useState<SearchItem[]>([]);

  const debounceGetWordList = useDebounceGetWordList(setRelatedWordList);

  const handleSearchInputValue = (value: string) => {
    if (!searchInputRef.current) return;
    searchInputRef.current.value = value;
  };

  const resetRelatedWordList = useCallback(() => {
    setRelatedWordList([]);
  }, []);

  useEffect(() => {
    if (!searchInputRef.current || !initialWord) return;
    searchInputRef.current.value = initialWord;
  }, [initialWord]);

  return (
    <>
      <SearchBar
        initialWord={initialWord}
        searchInputRef={searchInputRef}
        debounceGetWordList={debounceGetWordList}
        resetRelatedWordList={resetRelatedWordList}
        handleSearchInputValue={handleSearchInputValue}
      />

      {initialWord !== searchInputRef.current?.value &&
        searchInputRef.current?.value && (
          <RelatedWordList
            searchWord={searchInputRef.current.value}
            relatedWordList={relatedWordList}
            handleSearchInputValue={handleSearchInputValue}
          />
        )}
      {!initialWord && relatedWordList.length === 0 && children}
      {initialWord && children}
    </>
  );
};

export default SearchBarContainer;
