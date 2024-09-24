import { css } from '@emotion/react';

import { COLORS, FONTS } from '@/styles/constants';

export const categoryButtonCss = (isSelected: boolean) => css`
  border-radius: 1.7rem;
  border: 1px solid #d6d6d6;
  padding: 0.7rem 1.5rem;
  color: ${isSelected ? COLORS.white : '#616671'};
  ${FONTS.Body3};

  min-width: fit-content;

  background-color: ${isSelected && COLORS.brand1};
`;
