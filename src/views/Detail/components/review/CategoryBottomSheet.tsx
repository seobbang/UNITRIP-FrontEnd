import { css } from '@emotion/react';
import { useState } from 'react';

import BottomSheet from '@/components/BottomSheet';
import { COLORS, FONTS } from '@/styles/constants';
import { category, filterState } from '@/views/Search/types/category';

import CategoryList from './CategoryList';

interface CategoryBottomSheetProps {
  closeBottomSheet: () => void;
  filterState: filterState;
  handleFilterState: (value: filterState) => void;
}

const CategoryBottomSheet = (props: CategoryBottomSheetProps) => {
  const { closeBottomSheet, filterState, handleFilterState } = props;

  const [selectedFilterState, setSelectedFilterState] =
    useState<filterState>(filterState);

  const handleSelectedFilterState = (category: category, facility: string) => {
    const categoryFacilities = selectedFilterState[category];

    setSelectedFilterState((prev) => ({
      ...prev,
      [category]: {
        ...categoryFacilities,
        [facility]: !categoryFacilities[facility],
      },
    }));
  };

  return (
    <BottomSheet
      closeBottomSheet={closeBottomSheet}
      onClickButton={() => handleFilterState(selectedFilterState)}
      height={'80vh'}
      buttonText={'확인'}
      bottomSheetCss={css`
        padding: 4rem 2rem 7rem;
      `}>
      <header css={titleCss}>
        <h3>리뷰 필터</h3>
      </header>
      <ul css={listContainerCss}>
        {['physical', 'visual', 'hearing', 'infant'].map((category) => (
          <CategoryList
            key={category}
            category={category as category}
            filterState={selectedFilterState}
            handleFilterState={handleSelectedFilterState}
          />
        ))}
      </ul>
    </BottomSheet>
  );
};

export default CategoryBottomSheet;

const titleCss = css`
  margin-bottom: 1.2rem;

  color: ${COLORS.brand1};
  ${FONTS.H4};
`;

const listContainerCss = css`
  overflow: auto;

  height: calc(100% - 4rem);
`;
