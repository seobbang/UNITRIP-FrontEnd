import { css } from '@emotion/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { SearchSetIcon } from '@/assets/icon';
import MenuBar from '@/components/MenuBar';
import { COLORS, FONTS } from '@/styles/constants';
import { isGuideShown } from '@/utils/storageHideGuide';

import RelatedWordList from '../components/RelatedWordList';
import Guide from '../components/Result/Guide';
import SearchResult from '../components/Result/SearchResult';
import SearchBar from '../components/SearchBar';

const SearchResultPage = () => {
  const { word: initialWord } = useParams();
  const [searchWord, setSearchWord] = useState(initialWord || '');

  const [showGuide, setShowGuide] = useState(() => isGuideShown());

  const handleSearchWord = (word: string) => {
    setSearchWord(word);
  };

  const handleSetShowGuide = (value: boolean) => {
    setShowGuide(value);
  };

  return (
    <div
      css={css`
        position: relative;
      `}>
      <SearchBar searchWord={searchWord} handleSearchWord={handleSearchWord} />
      {searchWord !== '' && searchWord !== initialWord ? (
        <RelatedWordList searchWord={searchWord} />
      ) : (
        <>
          <button type="button" css={buttonCss}>
            <SearchSetIcon /> 기본 편의시설, 지체장애
          </button>
          <SearchResult />
        </>
      )}

      {showGuide && <Guide handleSetShowGuide={handleSetShowGuide} />}
      <MenuBar />
    </div>
  );
};

export default SearchResultPage;

const buttonCss = css`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  width: 100%;
  height: 4.6rem;
  padding-left: 2.3rem;
  margin-top: 0.8rem;

  background-color: ${COLORS.gray1};

  color: ${COLORS.brand1};

  ${FONTS.Body3};
`;
