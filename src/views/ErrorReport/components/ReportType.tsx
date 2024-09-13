import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CheckEmptyIcon, CheckFilledIcon, HeaderBackIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

import { LIST_CONTENT } from '../constants/constants';
import {
  checkType,
  currentPageType,
  errorContent,
} from '../types/errorReportType';

interface ReportTypeProps {
  errorContent: errorContent;
  handleSetErrorType: (errorType: checkType) => void;
  handleSetCurrentPage: (page: currentPageType) => void;
}

const ReportType = (props: ReportTypeProps) => {
  const { errorContent, handleSetErrorType, handleSetCurrentPage } = props;

  const [isActive, setIsActive] = useState(Boolean(errorContent.errorType));

  const navigate = useNavigate();

  const handleSetCheckedType = (checkedType: checkType) => {
    setIsActive(true);
    handleSetErrorType(checkedType);
  };

  return (
    <div css={ReportTypeContainer}>
      <header css={header}>
        <HeaderBackIcon onClick={() => navigate(-1)} />
      </header>

      <section css={mainContainer}>
        <div>
          <h1 css={mainText}>어떤 정보를 제보하시나요?</h1>

          <ul css={selectList}>
            {LIST_CONTENT.map(({ title, explain, type }) => (
              <li
                key={type}
                onClick={() => handleSetCheckedType(type)}
                css={listItem}>
                <div css={textSection}>
                  <span css={text('title')}>{title}</span>
                  <p css={text('explain')}>{explain}</p>
                </div>
                {errorContent.errorType === type ? (
                  <CheckFilledIcon />
                ) : (
                  <CheckEmptyIcon />
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          css={button(isActive)}
          onClick={() => handleSetCurrentPage('explanation')}>
          다음
        </button>
      </section>
    </div>
  );
};

export default ReportType;

const ReportTypeContainer = css`
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

const mainText = css`
  padding: 1.2rem 0 2rem;

  color: ${COLORS.gray9};

  ${FONTS.H3};
`;

const selectList = css`
  display: flex;
  flex-direction: column;
`;

const listItem = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 1.2rem 0.4rem;
`;

const textSection = css`
  display: flex;
  gap: 0.4rem;
  flex-direction: column;
`;

const text = (variant: string) => css`
  color: ${variant === 'title' ? COLORS.gray9 : COLORS.gray5};

  ${variant === 'title' ? FONTS.H5 : FONTS.Small1}
`;

const button = (state: boolean) => css`
  width: 100%;
  padding: 1.7rem 15.35rem;
  border-radius: 1.2rem;

  background-color: ${state ? COLORS.brand1 : COLORS.gray1};

  color: ${state ? COLORS.white : COLORS.gray4};

  ${FONTS.Body2};
`;
