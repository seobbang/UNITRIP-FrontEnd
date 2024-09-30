import { css } from '@emotion/react';
import { useState } from 'react';

import {
  ArrowBackIconIosDownIcon,
  ArrowBackIconIosUpIcon,
} from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

import { MAP_CATEGORY_FACILITIES } from '../../constants/category';
import { category, filterState } from '../../types/category';

interface FacilitiesIconListProps {
  category: category;
  filterState: filterState;
  handleFilterState: (category: category, facility: string) => void;
}

const FacilitiesAccordian = (props: FacilitiesIconListProps) => {
  const { category, filterState, handleFilterState } = props;

  const [isOpen, setIsOpen] = useState(true);

  const facilityState = filterState[category];
  const handleOnClick = (facility: string) => {
    handleFilterState(category, facility);
  };

  const iconList = MAP_CATEGORY_FACILITIES[category].iconList.map(
    ({ name, default: defaultIcon, selected: selectedIcon }) => {
      return (
        <li css={iconListCss} key={name}>
          <button onClick={() => handleOnClick(name)}>
            {facilityState[name] ? selectedIcon : defaultIcon}
          </button>
          <span>{name}</span>
        </li>
      );
    },
  );

  return (
    <li>
      <button css={categoryTitleCss} onClick={() => setIsOpen((prev) => !prev)}>
        {MAP_CATEGORY_FACILITIES[category].categoryName}
        {isOpen ? <ArrowBackIconIosUpIcon /> : <ArrowBackIconIosDownIcon />}
      </button>
      {isOpen && <ul css={iconListContainerCss}>{iconList}</ul>}
    </li>
  );
};

export default FacilitiesAccordian;

const categoryTitleCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin: 1.2rem 0;

  color: ${COLORS.brand1};
  ${FONTS.H5};
`;

const iconListContainerCss = css`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;

  margin-bottom: 1.2rem;
`;

const iconListCss = css`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  flex-direction: column;

  color: ${COLORS.brand1};
  ${FONTS.Small2};
`;
