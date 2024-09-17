import { css } from '@emotion/react';

import BottomSheet from '@/components/BottomSheet';
import { COLORS, FONTS } from '@/styles/constants';

import { category, filterState } from '../../types/category';
import FacilitiesAccordian from './FacilitiesAccordian';

interface FilterBottomSheetProps {
  closeBottomSheet: () => void;
  filterState: filterState;
  handleFilterState: (category: category, facility: string) => void;
}

const FilterBottomSheet = (props: FilterBottomSheetProps) => {
  const { closeBottomSheet, filterState, handleFilterState } = props;

  return (
    <BottomSheet
      closeBottomSheet={closeBottomSheet}
      height={'80vh'}
      buttonText={'해당 조건 적용하기'}
      bottomSheetCss={css`
        padding: 4.2rem 2rem 7rem 2rem;
      `}>
      <header css={titleCss}>
        <h3>필터 상세 설정</h3>
      </header>
      <ul>
        <FacilitiesAccordian
          category={'physical'}
          filterState={filterState}
          handleFilterState={handleFilterState}
        />
        <hr css={lineCss} />
        <FacilitiesAccordian
          category={'visual'}
          filterState={filterState}
          handleFilterState={handleFilterState}
        />
        <hr css={lineCss} />
        <FacilitiesAccordian
          category={'hearing'}
          filterState={filterState}
          handleFilterState={handleFilterState}
        />
        <hr css={lineCss} />
        <FacilitiesAccordian
          category={'infant'}
          filterState={filterState}
          handleFilterState={handleFilterState}
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
  border-top: 1px solid rgba(241, 241, 241, 1);
`;
