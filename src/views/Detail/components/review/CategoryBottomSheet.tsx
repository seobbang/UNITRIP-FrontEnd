import { css } from '@emotion/react';

import BottomSheet from '@/components/BottomSheet';
import { COLORS, FONTS } from '@/styles/constants';
import { category, filterState } from '@/views/Search/types/category';

import CategoryList from './CategoryList';

interface CategoryBottomSheetProps {
  closeBottomSheet: () => void;
  filterState: filterState;
  handleFilterState: (category: category, facility: string) => void;
}

const CategoryBottomSheet = (props: CategoryBottomSheetProps) => {
  const { closeBottomSheet, ...filterProps } = props;

  return (
    <BottomSheet
      closeBottomSheet={closeBottomSheet}
      height={'80vh'}
      buttonText={'확인'}
      bottomSheetCss={css`
        padding: 4rem 2rem 7rem 2rem;
      `}>
      <header css={titleCss}>
        <h3>리뷰 필터</h3>
      </header>
      <ul>
        <CategoryList category={'physical'} {...filterProps} />
        <CategoryList category={'visual'} {...filterProps} />
        <CategoryList category={'hearing'} {...filterProps} />
        <CategoryList category={'infant'} {...filterProps} />
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
