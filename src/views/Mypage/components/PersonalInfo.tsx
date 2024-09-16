import { css } from '@emotion/react';
import { useState } from 'react';

import SelectRegion, { Region } from '@/components/SelectRegion';
import { COLORS, FONTS } from '@/styles/constants';

const PersonalInfo = () => {
  const [region, setRegion] = useState<Region>({ city: '', town: '' });

  return (
    <>
      <form action="submit" css={PersonalInfoContainter}>
        <ul css={itemList}>
          <li css={formItem}>
            <span css={title}>이름*</span>

            <input type="text" css={input} value="이돌이" disabled />
          </li>

          <li css={formItem}>
            <span css={title}>생년월일*</span>

            <div css={multiInputSection}>
              <input type="number" css={birth('year')} disabled value="2015" />
              <input type="number" css={birth('month')} disabled value="9" />
              <input type="number" css={birth('date')} disabled value="7" />
            </div>
          </li>

          <SelectRegion region={region} setRegion={setRegion} />
        </ul>
      </form>
    </>
  );
};

export default PersonalInfo;

const PersonalInfoContainter = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: calc(100dvh - 6.2rem);
  overflow-y: hidden;
`;

const itemList = css`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;
  overflow-y: hidden;

  padding-top: 2.7rem;
`;

const formItem = css`
  display: flex;
  gap: 1.2rem;
  flex-direction: column;

  width: 100%;

  ${FONTS.Body2};
`;

const title = css`
  color: ${COLORS.brand1};
`;

const inputDefault = css`
  padding: 1.6rem;
  border: 1px solid ${COLORS.gray3};
  border-radius: 1rem;

  background-color: ${COLORS.gray0};

  color: ${COLORS.gray4};
`;

const input = css`
  width: 100%;

  ${inputDefault};
`;

const multiInputSection = css`
  display: flex;
  justify-content: space-between;
`;

const birth = (variant: string) => css`
  ${inputDefault};
  width: ${variant === 'year' ? '38%' : '28%'};
`;
