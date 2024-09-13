import { css } from '@emotion/react';
import _ from 'lodash';
import { useState } from 'react';

import { HeaderBackIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

import { currentPageType } from '../types/errorReportType';

interface ExplanationProps {
  handleSetErrorContent: (content: string) => void;
  handleSetCurrentPage: (page: currentPageType) => void;
}

const Explanation = (props: ExplanationProps) => {
  const { handleSetErrorContent, handleSetCurrentPage } = props;

  const [isActive, setIsActive] = useState(false);

  const handleSetIsActive = (length: number) => {
    length === 0 ? setIsActive(false) : setIsActive(true);
  };

  const onChangeInput = _.debounce(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleSetErrorContent(e.target.value);
      handleSetIsActive(e.target.value.trim().length);
    },
    200,
  );

  return (
    <div css={explanationContainer}>
      <header css={header}>
        <HeaderBackIcon onClick={() => handleSetCurrentPage('errorType')} />
      </header>

      <div css={mainContainer}>
        <section css={contentSection}>
          <p css={text('main')}>
            제보할 정보에 대해
            <br />
            자세히 설명해주세요
          </p>
          <p css={text('sub')}>
            주신 의견을 빠르게 반영할 수 있도록 노력할게요
          </p>

          <textarea
            placeholder="내용 입력"
            onChange={(e) => onChangeInput(e)}
            css={input}
          />
        </section>

        <button
          type="submit"
          css={button(isActive)}
          onClick={() => handleSetCurrentPage('complete')}>
          제보하기
        </button>
      </div>
    </div>
  );
};

export default Explanation;

const explanationContainer = css`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  width: 100%;
`;

const header = css`
  display: flex;
  align-items: center;

  width: 100%;
  height: 4.8rem;
`;

const mainContainer = css`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  width: 100%;
  height: calc(100dvh - 4.8rem);
  padding-bottom: 1.2rem;
`;

const contentSection = css`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding-top: 1.2rem;
`;

const text = (variant: string) => css`
  margin-bottom: ${variant === 'main' ? '0.8rem' : '3.2rem'};

  color: ${variant === 'main' ? COLORS.gray9 : COLORS.gray6};

  ${variant === 'main' ? FONTS.H3 : FONTS.Body5};
`;

const input = css`
  width: calc(100dvw - 4rem);
  height: 12rem;
  padding: 1.6rem;
  border: 1px solid ${COLORS.gray3};
  border-radius: 1rem;

  resize: none;
  outline: none;

  color: ${COLORS.gray9};
  ${FONTS.Body2};
  font-weight: 400;
`;

const button = (state: boolean) => css`
  width: 100%;
  padding: 1.7rem 13.95rem;
  border-radius: 1.2rem;

  background-color: ${state ? COLORS.brand1 : COLORS.gray1};

  color: ${state ? COLORS.white : COLORS.gray4};

  ${FONTS.Body2};
`;
