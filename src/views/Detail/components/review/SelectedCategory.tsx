import { css } from '@emotion/react';

import { COLORS, FONTS } from '@/styles/constants';
import { category, filterState } from '@/views/Search/types/category';

import { categoryButtonCss } from '../../styles/review';
import { MAP_CATEGORY_FACILITIES } from './CategoryList';

interface SelectedCategoryProps {
  openBottomSheet: () => void;
  filterState: filterState;
  handleFilterState: (category: category, facility: string) => void;
}

const SelectedCategory = (props: SelectedCategoryProps) => {
  const { openBottomSheet, filterState, handleFilterState } = props;

  const renderSelectedCategoryList = () => {
    const categoryList = Object.entries(filterState).filter(
      ([, objectValue]) => {
        return Object.values(objectValue).some((value) => value);
      },
    ) as [category, Record<string, boolean>][];

    return categoryList.map(([category, facilityList]) => {
      const facilityState = filterState[category];

      return (
        <div key={category} css={selectedCategoryContainerCss}>
          <div css={categoryNameCss}>
            {MAP_CATEGORY_FACILITIES[category].categoryName}
          </div>
          <ul css={facilitiesContainerCss}>
            {Object.keys(facilityList).map((facility) => {
              return (
                <button
                  key={facility}
                  css={categoryButtonCss(facilityState[facility])}
                  onClick={() => handleFilterState(category, facility)}>
                  {facility}
                </button>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <div css={containerCss}>
      {renderSelectedCategoryList()}
      <button css={buttonCss} onClick={openBottomSheet}>
        필터 더보기
      </button>
    </div>
  );
};

export default SelectedCategory;

const containerCss = css`
  padding-top: 0.94rem;
`;

const selectedCategoryContainerCss = css`
  display: flex;
  gap: 2rem;
  align-items: center;
  overflow: auto;

  padding: 0 0 0.94rem 1.9rem;
`;

const buttonCss = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1.2rem 0;

  background-color: ${COLORS.gray0};

  color: ${COLORS.brand1};
  ${FONTS.Body1}
`;

const categoryNameCss = css`
  min-width: 7.4rem;

  color: ${COLORS.brand1};
  ${FONTS.Body2};
`;

const facilitiesContainerCss = css`
  display: flex;
  gap: 1rem;
  overflow: auto;
`;
