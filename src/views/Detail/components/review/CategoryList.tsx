import { css } from '@emotion/react';

import {
  HEARING_FACILITIES,
  INFANT_FACILITIES,
  PHYSICAL_FACILITIES,
  VISUAL_FACILITIES,
} from '@/constants/facilities';
import { COLORS, FONTS } from '@/styles/constants';
import { filterState } from '@/views/Search/types/category';

import { categoryButtonCss } from '../../styles/review';

type category = 'physical' | 'visual' | 'hearing' | 'infant';
interface Facility {
  name: string;
  active: JSX.Element;
  inactive: JSX.Element;
}

export const MAP_CATEGORY_FACILITIES: Record<
  category,
  { categoryName: string; iconList: Facility[] }
> = {
  physical: { categoryName: '지체장애', iconList: PHYSICAL_FACILITIES },
  visual: { categoryName: '시각장애', iconList: VISUAL_FACILITIES },
  hearing: { categoryName: '청각장애', iconList: HEARING_FACILITIES },
  infant: { categoryName: '영유아 가족', iconList: INFANT_FACILITIES },
};

interface CategoryListProps {
  category: category;
  filterState: filterState;
  handleFilterState: (category: category, facility: string) => void;
}

const CategoryList = (props: CategoryListProps) => {
  const { category, filterState, handleFilterState } = props;

  const facilityState = filterState[category];
  const handleOnClick = (facility: string) => {
    handleFilterState(category, facility);
  };

  const categoryList = MAP_CATEGORY_FACILITIES[category].iconList.map(
    ({ name }) => {
      return (
        <button
          key={name}
          css={categoryButtonCss(facilityState[name])}
          onClick={() => handleOnClick(name)}>
          {name}
        </button>
      );
    },
  );

  return (
    <li css={containerCss}>
      <h3 css={categoryNameCss}>
        {MAP_CATEGORY_FACILITIES[category].categoryName}
      </h3>
      <div css={categoryContainerCss}>{categoryList}</div>
    </li>
  );
};

export default CategoryList;

const containerCss = css`
  margin: 2.4rem 0;
`;

const categoryNameCss = css`
  margin-bottom: 0.8rem;

  color: ${COLORS.brand1};
  ${FONTS.Body2};
`;

const categoryContainerCss = css`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
