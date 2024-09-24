import { css } from '@emotion/react';

import { COLORS, FONTS } from '@/styles/constants';
import { filterState } from '@/views/Search/types/category';

import { categoryButtonCss as categoryCss } from '../../../styles/review';
import Description from './Description';
import Question from './Question';

interface FacilitiesProps {
  openBottomSheet: () => void;
  filterState: filterState;
}

const Facilities = (props: FacilitiesProps) => {
  const { openBottomSheet, filterState } = props;

  const renderSelectedCategoryList = () => {
    const categoryList = Object.values(filterState)
      .flatMap((object) =>
        Object.entries(object)
          .filter(([, value]) => value)
          .map(([key]) => key),
      )
      .map((name) => (
        <li key={name} css={categoryCss(false)}>
          {name}
        </li>
      ));

    return (
      categoryList.length > 0 && (
        <ul css={categoryContainerCss}>{categoryList}</ul>
      )
    );
  };

  return (
    <div>
      <Question>어떤 편의시설이 있었나요?</Question>
      <Description>남겨주신 정보는 다른 사용자에게 큰 도움이 돼요</Description>
      {renderSelectedCategoryList()}
      <button css={categoryButtonCss} onClick={openBottomSheet}>
        편의시설 선택하기 &gt;
      </button>
    </div>
  );
};

export default Facilities;

const categoryButtonCss = css`
  height: 5.6rem;
  padding: 1.2rem 2.4rem;
  margin-top: 1.6rem;

  border: 1px solid ${COLORS.gray3};
  border-radius: 1.2rem;
  width: 100%;

  color: ${COLORS.gray9};
  ${FONTS.Body2};
`;

const categoryContainerCss = css`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  margin-top: 1.6rem;
`;
