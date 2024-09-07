import { useState } from 'react';

import MenuBar from '@/components/MenuBar';

import RelatedWordList from '../components/RelatedWordList';
import PopularSearch from '../components/Search/PopularSearch';
import RecentSearch from '../components/Search/RecentSearch';
import SearchBar from '../components/SearchBar';

const SearchPage = () => {
  const [searchWord, setSearchWord] = useState('');

  const handleSearchWord = (word: string) => {
    setSearchWord(word);
  };

  return (
    <>
      <SearchBar searchWord={searchWord} handleSearchWord={handleSearchWord} />
      {searchWord ? (
        <RelatedWordList searchWord={searchWord} />
      ) : (
        <>
          <RecentSearch />
          <PopularSearch />
        </>
      )}
      <MenuBar />
    </>
  );
};

export default SearchPage;
