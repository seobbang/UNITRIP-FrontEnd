import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import postReview from '@/apis/supabase/postReview';
import { ChevronLeftIcon } from '@/assets/icon';
import ToastMessage from '@/components/ToastMessage';
import { COLORS, FONTS } from '@/styles/constants';
import {
  getFilterList,
  INITIAL_FILTER_STATE,
} from '@/views/Search/constants/category';
import { filterState } from '@/views/Search/types/category';

import CategoryBottomSheet from '../components/review/CategoryBottomSheet';
import ExperienceInput from '../components/review/write/ExperienceInput';
import Facilities from '../components/review/write/Facilities';
import ImageInput from '../components/review/write/ImageInput';
import ScoreSection from '../components/review/write/ScoreSection';
import { STORAGE_KEY } from '../constants/localStorageKey';

const WriteReviewPage = () => {
  const navigate = useNavigate();
  const { contentId } = useParams();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [errorType, setErrorType] = useState<'score' | 'experience'>('score');

  const [score, setScore] = useState(0);
  const [experience, setExperience] = useState('');
  const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);
  const [imgList, setImgList] = useState<File[]>([]);

  const handleScore = (score: number) => {
    setScore(score);
  };

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleExperience = (value: string) => {
    setExperience(value);
  };

  const handleFilterState = (value: filterState) => {
    setFilterState(value);
  };

  const addImg = (file: File) => {
    setImgList((prev) => [...prev, file]);
  };

  const removeImg = (name: string) => {
    const filteredImgList = imgList.filter((item) => item.name !== name);
    setImgList(filteredImgList);
  };

  const handleOnClick = async () => {
    if (!score) {
      setErrorType('score');
      setErrorToast(true);
      return;
    }
    if (experience.length < 10) {
      setErrorType('experience');
      setErrorToast(true);
      return;
    }

    try {
      const status = await postReview({
        rate: score,
        description: experience,
        convenience: getFilterList(filterState),
        imgs: imgList,
        contentId: Number(contentId),
      });

      if (status === 201) {
        sessionStorage.setItem(STORAGE_KEY.successToast, 'true');
        navigate(`/${contentId}/review`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div css={containerCss}>
        <header css={headerCss}>
          <button type="button" onClick={() => navigate(-1)}>
            <ChevronLeftIcon />
          </button>
          <span>리뷰 작성</span>
        </header>

        <div css={writeContainerCss}>
          <ScoreSection score={score} handleScore={handleScore} />
          <ExperienceInput
            experience={experience}
            handleExperience={handleExperience}
          />
          <Facilities
            openBottomSheet={openBottomSheet}
            filterState={filterState}
          />
          <ImageInput imgList={imgList} addImg={addImg} removeImg={removeImg} />
        </div>

        <button css={submitCss} onClick={handleOnClick}>
          등록하기
        </button>
        {errorToast && (
          <ToastMessage setToast={setErrorToast}>
            {errorType === 'score'
              ? '별점을 남겨주세요'
              : '느낀 점을 10자 이상 입력해주세요'}
          </ToastMessage>
        )}
        {isBottomSheetOpen && (
          <CategoryBottomSheet
            closeBottomSheet={closeBottomSheet}
            filterState={filterState}
            handleFilterState={handleFilterState}
          />
        )}
      </div>
    </>
  );
};

export default WriteReviewPage;

const containerCss = css`
  padding: 0 2rem;
`;

const headerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 100%;
  padding: 1.2rem 0;
  margin-bottom: 2rem;

  color: ${COLORS.gray9};

  ${FONTS.Body2};

  & > button {
    position: absolute;
    left: 0;
  }
`;

const writeContainerCss = css`
  display: flex;
  gap: 2.8rem;
  flex-direction: column;
`;

const submitCss = css`
  width: 100%;
  height: 5.6rem;
  margin: 7.2rem 0 1.2rem;
  border-radius: 1.2rem;

  background-color: ${COLORS.brand1};

  color: ${COLORS.white};
  ${FONTS.Body2};
`;
