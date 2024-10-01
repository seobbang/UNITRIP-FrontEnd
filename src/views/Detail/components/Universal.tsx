import { css } from '@emotion/react';

import { COLORS } from '@/styles/constants';

import {
  HEARING_FACILITIES,
  INFANT_FACILITIES,
  PHYSICAL_FACILITIES,
  VISUAL_FACILITIES,
} from '../../../constants/facilities';
import FacilityIconList from './FacilityIconList';

const Universal = () => {
  return (
    <section css={universalContainer}>
      <div css={iconListContainer}>
        <FacilityIconList title="지체장애" facilities={PHYSICAL_FACILITIES} />
        <div css={borderLine} />
        <FacilityIconList title="시각장애" facilities={VISUAL_FACILITIES} />
        <div css={borderLine} />
        <FacilityIconList title="청각장애" facilities={HEARING_FACILITIES} />
        <div css={borderLine} />
        <FacilityIconList title="영유아 가족" facilities={INFANT_FACILITIES} />
      </div>
    </section>
  );
};
export default Universal;

const universalContainer = css`
  width: 100%;
  padding: 1.7rem 2rem 2.4rem;
`;

const iconListContainer = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const borderLine = css`
  width: 100%;
  margin: 1.2rem 0;
  border: 1px solid ${COLORS.gray1};
`;
