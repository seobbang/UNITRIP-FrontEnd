import { css } from '@emotion/react';

import SelectRegion from '@/components/SelectRegion';
import { COLORS, FONTS } from '@/styles/constants';

import { currentTabType } from '../pages/Mypage';
import MypageHeader from './MypageHeader';

interface PersonalInfoProps {
  handleSetCurrentTab: (clicked: currentTabType) => void;
}

const PersonalInfo = (props: PersonalInfoProps) => {
  const { handleSetCurrentTab } = props;

  return (
    <>
      <MypageHeader
        handleSetCurrentTab={handleSetCurrentTab}
        state={'personalInfo'}
      />

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

          <li css={formItem}>
            <span css={title}>성별</span>
            <input type="text" css={input} value="선택안함" disabled />
          </li>

          <SelectRegion />
        </ul>
        <button type="submit" css={submitBtn}>
          저장
        </button>
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
`;

const itemList = css`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  flex-direction: column;

  width: 100%;
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

const submitBtn = css`
  width: 100%;
  padding: 1.7rem 0;
  border-radius: 1.2rem;

  background-color: ${COLORS.brand1};

  color: ${COLORS.white};
  text-align: center;

  ${FONTS.Body2};
`;
