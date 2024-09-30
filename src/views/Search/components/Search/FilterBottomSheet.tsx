import { css } from '@emotion/react';
import { useState } from 'react';

import BottomSheet from '@/components/BottomSheet';
import { COLORS, FONTS } from '@/styles/constants';

import { category, filterState } from '../../types/category';
import FacilitiesAccordian from './FacilitiesAccordian';

interface FilterBottomSheetProps {
  closeBottomSheet: () => void;
  filterState: filterState;
  handleFilterState: (value: filterState) => void;
}

const FilterBottomSheet = (props: FilterBottomSheetProps) => {
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
      buttonText={'해당 조건 적용하기'}
      bottomSheetCss={css`
        padding: 4.2rem 2rem 7rem;
      `}>
      <header css={titleCss}>
        <h3>필터 상세 설정</h3>
      </header>
      <ul>
        <FacilitiesAccordian
          category={'physical'}
          filterState={selectedFilterState}
          handleFilterState={handleSelectedFilterState}
        />
        <hr css={lineCss} />
        <FacilitiesAccordian
          category={'visual'}
          filterState={selectedFilterState}
          handleFilterState={handleSelectedFilterState}
        />
        <hr css={lineCss} />
        <FacilitiesAccordian
          category={'hearing'}
          filterState={selectedFilterState}
          handleFilterState={handleSelectedFilterState}
        />
        <hr css={lineCss} />
        <FacilitiesAccordian
          category={'infant'}
          filterState={selectedFilterState}
          handleFilterState={handleSelectedFilterState}
        />
      </ul>
    </BottomSheet>
  );
};

export default FilterBottomSheet;

const titleCss = css`
  margin-bottom: 1.2rem;

  color: ${COLORS.brand1};
  ${FONTS.H4};
`;

const lineCss = css`
  border-top: 1px solid rgb(241 241 241 / 100%);
`;
