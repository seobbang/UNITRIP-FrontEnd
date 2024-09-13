import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { RequestImage } from '@/assets/image';
import { COLORS, FONTS } from '@/styles/constants';

function ErrorReport() {
  const navigate = useNavigate();

  return (
    <div css={errorReportContainer}>
      <button
        css={reportButton}
        type="button"
        onClick={() => {
          navigate('/error-report');
        }}>
        <div css={textContainer}>
          <span css={text('main')}>
            알고 계신 정보와 다른 정보가 있나요?
            <br />
            유니트립에 제보해 주세요!
          </span>
          <span css={text('sub')}>함께 만드는 유니트립 {'>'}</span>
        </div>
        <img src={RequestImage} alt="오류" />
      </button>
    </div>
  );
}

export default ErrorReport;

const errorReportContainer = css`
  width: 100%;
  padding: 2rem 2rem 3.4rem;

  background-color: ${COLORS.white};
`;

const reportButton = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  width: 100%;
  height: 10.5rem;
  padding: 1.6rem 1.2rem 1.6rem 2rem;
  border-radius: 1.2rem;

  background-color: ${COLORS.gray0};
`;

const textContainer = css`
  display: flex;
  gap: 0.8rem;
  justify-content: space-between;
  flex-direction: column;
`;

const text = (variant: string) => css`
  color: ${variant === 'main' ? COLORS.gray9 : COLORS.brand1};
  text-align: left;

  ${variant === 'main' ? FONTS.Body2 : FONTS.Small1};
`;
