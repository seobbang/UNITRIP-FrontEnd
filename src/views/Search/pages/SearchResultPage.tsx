import { css } from '@emotion/react';
import { MutableRefObject, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { getBarrierFreeInfo, getSearchKeyword } from '@/apis/public/search';
import getUserData from '@/apis/supabase/getUserData';
import { SearchSetIcon } from '@/assets/icon';
import MenuBar from '@/components/MenuBar';
import { useAsyncEffect } from '@/hooks/use-async-effect';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { COLORS, FONTS } from '@/styles/constants';
import { BarrierFreeItem, SearchItem } from '@/types/search';
import { UserDataResponse } from '@/types/userAPI';
import { isGuideShown } from '@/utils/storageHideGuide';

import Guide from '../components/Result/Guide';
import SearchResult from '../components/Result/SearchResult';
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
  const { word: initialWord } = useParams();

  const { pathname } = useLocation();
  const [userData, setUserData] = useState<UserDataResponse | null>(null);
  const [placeData, setPlaceData] = useState<(SearchItem & BarrierFreeItem)[]>(
    [],
  );

  const [filterState, setFilterState] =
    useState<filterState>(INITIAL_FILTER_STATE);

  // modal, bottom sheet state
  const [showGuide, setShowGuide] = useState(() =>
    isGuideShown(STORAGE_KEY.hideSearchGuide),
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // state handling func
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPlaceData([]);
  }, [pathname]);

  useAsyncEffect(async () => {
    const kakaoId = sessionStorage.getItem('kakao_id');
    if (!kakaoId) return;

    const userData = await getUserData(Number(kakaoId));
    setUserData(userData);
    setFilterState(createInitialFilterState(userData?.universal_type || []));
  }, []);

  // 무한스크롤
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  const handleObserver = async (
    observer: IntersectionObserver,
    target: MutableRefObject<HTMLElement | null>,
    page: MutableRefObject<number>,
  ) => {
    setLoading(true);
    const pageNo = page.current;

    try {
      const items = await getSearchKeyword({
        pageNo,
        numOfRows: 50,
        MobileOS: 'ETC',
        keyword: pathname.split('/')[2],
        contentTypeId: 12,
      });

      if (items === '') {
        if (pageNo === 0) setPlaceData([]);
        target.current && observer.unobserve(target.current);
      } else {
        const placeData: (SearchItem & BarrierFreeItem)[] = [];
        const promises = items.item.map(({ contentid }) =>
          getBarrierFreeInfo({
            MobileOS: 'ETC',
            contentId: Number(contentid),
          }),
        );
        const promiseResult = await Promise.allSettled(promises);
        promiseResult.forEach((result) => {
          if (result.status === 'fulfilled' && result.value !== '') {
            const item = result.value.item;
            const targetPlace = items.item.find(
              ({ contentid }) => contentid === item[0].contentid,
            );
            if (!targetPlace) return;
            placeData.push({ ...targetPlace, ...result.value.item[0] });
          }
        });

        setPlaceData((prev) => [...prev, ...placeData]);
        page.current++;
      }
    } finally {
      setLoading(false);
    }
  };

  const targetElement = useInfiniteScroll({
    options,
    handleObserver,
    deps: [pathname],
  });

  // 검색 가이드
  const handleSetShowGuide = (value: boolean) => {
    setShowGuide(value);
  };

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
  const selectedCategory = () => {
    const category: string[] = [];

    Object.entries(filterState).forEach(([key, entries]) => {
      if (Object.values(entries).some((item) => item))
        category.push(MAP_CATEGORY_FACILITIES[key as category].categoryName);
    });

    return category.join(', ');
  };

  return (
    <div css={containerCss}>
      <SearchBarContainer initialWord={initialWord}>
        <button type="button" css={buttonCss} onClick={openFilter}>
          <SearchSetIcon />
          {selectedCategory()}
        </button>
        <SearchResult
          placeData={placeData}
          targetElement={targetElement}
          loading={loading}
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
