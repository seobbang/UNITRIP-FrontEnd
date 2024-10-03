import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import getReviews from '@/apis/supabase/getReviews';
import getUserData from '@/apis/supabase/getUserData';
import Loading from '@/components/Loading';
import ToastMessage from '@/components/ToastMessage';
import { useAsyncEffect } from '@/hooks/use-async-effect';
import { ReviewResponse } from '@/types/api/review';
import { UserDataResponse } from '@/types/userAPI';
import { isGuideShown } from '@/utils/storageHideGuide';
import {
  getFilterList,
  INITIAL_FILTER_STATE,
} from '@/views/Search/constants/category';
import { category, filterState } from '@/views/Search/types/category';

import { STORAGE_KEY } from '../constants/localStorageKey';
import CategoryBottomSheet from './review/CategoryBottomSheet';
import Guide from './review/Guide';
import NoReview from './review/NoReview';
import ReviewCard from './review/ReviewCard';
import SelectedCategory from './review/SelectedCategory';
import TotalReview from './review/TotalReview';
import TotalScore from './review/TotalScore';

const Review = () => {
  const { contentId } = useParams();
  const location = useLocation();

  const [userData, setUserData] = useState<UserDataResponse | null>(null);
  const [reviewData, setReviewData] = useState<ReviewResponse[]>();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(() =>
    isGuideShown(STORAGE_KEY.hideReviewFilterGuide),
  );
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };
  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleSetShowGuide = (value: boolean) => {
    setShowGuide(value);
    document.body.style.overflow = '';
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

  const handleFilterStateObject = (value: filterState) => {
    setFilterState(value);
  };

  const selectedFilterList = getFilterList(filterState);

  useEffect(() => {
    if (showGuide) document.body.style.overflow = 'hidden';
    if (sessionStorage.getItem(STORAGE_KEY.successToast)) {
      setToast(true);
      sessionStorage.removeItem(STORAGE_KEY.successToast);
    }
  }, []);

  useAsyncEffect(async () => {
    setLoading(true);
    try {
      const data = await getReviews(contentId as string);
      setReviewData(data);
    } finally {
      setLoading(false);
    }

    const kakaoId = sessionStorage.getItem('kakao_id');
    if (!kakaoId) return;
    const userData = await getUserData(Number(kakaoId));
    setUserData(userData);
  }, [location.pathname]);

  if (loading) return <Loading />;

  return (
    <>
      {!reviewData || reviewData.length === 0 ? (
        <NoReview />
      ) : (
        <>
          <TotalScore reviewData={reviewData} />
          <TotalReview reviewCount={reviewData.length} />
          <SelectedCategory
            filterState={filterState}
            handleFilterState={handleFilterState}
            openBottomSheet={openBottomSheet}
            defaultCategory={userData?.universal_type}
          />
          <ul css={reviewCardContainerCss}>
            {reviewData
              ?.filter(({ convenience }) =>
                selectedFilterList.every((c) => convenience.includes(c)),
              )
              .map((item) => {
                return <ReviewCard key={item.id} {...item} />;
              })}
          </ul>
        </>
      )}

      {showGuide && <Guide handleSetShowGuide={handleSetShowGuide} />}
      {isBottomSheetOpen && (
        <CategoryBottomSheet
          closeBottomSheet={closeBottomSheet}
          filterState={filterState}
          handleFilterState={handleFilterStateObject}
        />
      )}

      {toast && (
        <ToastMessage setToast={setToast}>리뷰가 저장되었습니다.</ToastMessage>
      )}
    </>
  );
};

export default Review;

const reviewCardContainerCss = css`
  padding: 2.3rem 2rem 0;
`;
