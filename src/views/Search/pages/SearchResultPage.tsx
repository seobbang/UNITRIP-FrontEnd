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
import FilterBottomSheet from '../components/Search/FilterBottomSheet';
import SearchBar from '../components/SearchBar';
import {
  createInitialFilterState,
  MAP_CATEGORY_FACILITIES,
} from '../constants/category';
import { category } from '../types/category';

const SearchResultPage = () => {
  const { word: initialWord } = useParams();

  const [searchWord, setSearchWord] = useState(initialWord || '');
  const [filterState, setFilterState] = useState(() =>
    createInitialFilterState(),
  );

  // modal, bottom sheet state
  const [showGuide, setShowGuide] = useState(() => isGuideShown());
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // state handling func
  const handleSearchWord = (word: string) => {
    setSearchWord(word);
  };

  const handleSetShowGuide = (value: boolean) => {
    setShowGuide(value);
  };

  const openFilter = () => {
    setIsFilterOpen(true);
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  const handleFilterState = (category: category, facility: string) => {
    const categoryFacilities = filterState[category];

    setFilterState((prev) => ({
      ...prev,
      [category]: {
        ...categoryFacilities,
        [facility]: !categoryFacilities[facility],
      },
    }));
  };

  // render
  const selectedCategory = () => {
    const category: string[] = [];

    Object.entries(filterState).forEach(([key, entries]) => {
      if (Object.values(entries).some((item) => item))
        category.push(MAP_CATEGORY_FACILITIES[key as category].categoryName);
    });

    return category.join(', ');
  };

  return (
    <>
      <div
        css={css`
          position: relative;
        `}>
        <SearchBar
          searchWord={searchWord}
          handleSearchWord={handleSearchWord}
        />
        {searchWord !== '' && searchWord !== initialWord ? (
          <RelatedWordList searchWord={searchWord} />
        ) : (
          <>
            <button type="button" css={buttonCss} onClick={openFilter}>
              <SearchSetIcon />
              {selectedCategory()}
            </button>
            <SearchResult />
          </>
        )}

        {showGuide && <Guide handleSetShowGuide={handleSetShowGuide} />}
        <MenuBar />
      </div>

      {isFilterOpen && (
        <FilterBottomSheet
          closeBottomSheet={closeFilter}
          filterState={filterState}
          handleFilterState={handleFilterState}
        />
      )}
    </>
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
