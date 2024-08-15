import { css } from '@emotion/react';

import { COLORS } from '@/styles/constants';

import {
  BASIC_FACILITIES,
  HEARING_FACILITIES,
  INFANT_FACILITIES,
  OTHERS_FACILITIES,
  PHYSICAL_FACILITIES,
  VISUAL_FACILITIES,
} from '../constants/constants';
import FacilityIconList from './FacilityIconList';

function Universal() {
  return (
    <section css={universalContainer}>
      <div css={iconListContainer}>
        <FacilityIconList
          title="기본 편의시설"
          facilities={BASIC_FACILITIES}
          toggleKey="basic"
        />
        <div css={borderLine} />
        <FacilityIconList
          title="지체장애"
          facilities={PHYSICAL_FACILITIES}
          toggleKey="physical"
        />
        <div css={borderLine} />
        <FacilityIconList
          title="시각장애"
          facilities={VISUAL_FACILITIES}
          toggleKey="visual"
        />
        <div css={borderLine} />
        <FacilityIconList
          title="청각장애"
          facilities={HEARING_FACILITIES}
          toggleKey="hearing"
        />
        <div css={borderLine} />
        <FacilityIconList
          title="영유아 가족"
          facilities={INFANT_FACILITIES}
          toggleKey="infantFamily"
        />
        <div css={borderLine} />
        <FacilityIconList
          title="기타"
          facilities={OTHERS_FACILITIES}
          toggleKey="others"
        />
      </div>
    </section>
  );
}
export default Universal;

const universalContainer = css`
  width: 100%;
  padding: 1.7rem 2rem 3rem;
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
