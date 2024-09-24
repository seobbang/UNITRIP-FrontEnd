import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChevronLeftIcon } from '@/assets/icon';
import ToastMessage from '@/components/ToastMessage';
import { COLORS, FONTS } from '@/styles/constants';
import {
  getFilterList,
  INITIAL_FILTER_STATE,
} from '@/views/Search/constants/category';
import { category } from '@/views/Search/types/category';

import CategoryBottomSheet from '../components/review/CategoryBottomSheet';
import ExperienceInput from '../components/review/write/ExperienceInput';
import Facilities from '../components/review/write/Facilities';
import ImageInput from '../components/review/write/ImageInput';
import ScoreSection from '../components/review/write/ScoreSection';

const WriteReviewPage = () => {
  const navigate = useNavigate();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [toast, setToast] = useState(false);

  const [score, setScore] = useState(0);
  const [experience, setExperience] = useState('');
  const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);
  const [imgList, setImgList] = useState<string[]>([]);

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

  const addImg = (imgUrl: string) => {
    setImgList((prev) => [...prev, imgUrl]);
  };

  const removeImg = (imgUrl: string) => {
    const filteredImgList = imgList.filter((item) => item !== imgUrl);
    setImgList(filteredImgList);
  };

  const handleOnClick = () => {
    console.log({
      rate: score,
      description: experience,
      convenience: getFilterList(filterState),
      imgUrl: imgList,
    });
    setToast(true);
  };

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
        {toast && (
          <ToastMessage setToast={setToast}>
            리뷰가 저장되었습니다.
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
  margin: 7.2rem 0 0.5rem;
  border-radius: 1.2rem;

  background-color: ${COLORS.brand1};

  color: ${COLORS.white};
  ${FONTS.Body2};
`;
