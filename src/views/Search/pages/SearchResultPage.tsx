import { css } from '@emotion/react';
import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import getUserData from '@/apis/supabase/getUserData';
import { SearchSetIcon } from '@/assets/icon';
import MenuBar from '@/components/MenuBar';
import { useAsyncEffect } from '@/hooks/use-async-effect';
import { COLORS, FONTS } from '@/styles/constants';
import { UserDataResponse } from '@/types/userAPI';
import { isGuideShown } from '@/utils/storageHideGuide';

import Guide from '../components/Result/Guide';
import ResultContainer from '../components/Result/ResultContainer';
import FilterBottomSheet from '../components/Search/FilterBottomSheet';
import SearchBarContainer from '../components/SearchBar/SearchBarContainer';
import {
  createInitialFilterState,
  INITIAL_FILTER_STATE,
  MAP_CATEGORY_FACILITIES,
} from '../constants/category';
import { STORAGE_KEY } from '../constants/localStorageKey';
import { category, filterState } from '../types/category';

const SearchResultPage = () => {
  const { word: searchWord } = useParams();

  const [userData, setUserData] = useState<UserDataResponse | null>(null);

  const [filterState, setFilterState] = useState<filterState>({
    ...INITIAL_FILTER_STATE,
  });

  // modal, bottom sheet state
  const [showGuide, setShowGuide] = useState(() =>
    isGuideShown(STORAGE_KEY.hideSearchGuide),
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useAsyncEffect(async () => {
    const kakaoId = sessionStorage.getItem('kakao_id');
    if (!kakaoId) return;

    const userData = await getUserData(Number(kakaoId));
    setUserData(userData);
    setFilterState(createInitialFilterState(userData?.universal_type || []));
  }, []);

  // 검색 가이드
  const handleSetShowGuide = useCallback((value: boolean) => {
    setShowGuide(value);
  }, []);

  const openFilter = () => {
    setIsFilterOpen(true);
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  const handleFilterState = (value: filterState) => {
    setFilterState({ ...value });
  };

  // render
  const selectedCategory = useMemo(() => {
    const category: string[] = [];

    Object.entries(filterState).forEach(([key, entries]) => {
      if (Object.values(entries).some((item) => item))
        category.push(MAP_CATEGORY_FACILITIES[key as category].categoryName);
    });

    return category.join(', ');
  }, [filterState]);

  return (
    <>
      <div css={containerCss}>
        <SearchBarContainer initialWord={searchWord}>
          <button type="button" css={buttonCss} onClick={openFilter}>
            <SearchSetIcon />
            {selectedCategory}
          </button>
          <ResultContainer
            key={searchWord}
            searchWord={searchWord || ''}
            filterState={filterState}
            heartList={userData?.favorite_list || []}
          />
        </SearchBarContainer>

        {showGuide && <Guide handleSetShowGuide={handleSetShowGuide} />}
        <MenuBar />

        {isFilterOpen && (
          <FilterBottomSheet
            closeBottomSheet={closeFilter}
            filterState={filterState}
            handleFilterState={handleFilterState}
          />
        )}
      </div>
    </>
  );
};

export default SearchResultPage;

const containerCss = css`
  position: relative;
`;

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
