import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ErrorIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

const Error = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state?.message || '알 수 없는 오류가 발생했습니다.';

  return (
    <div css={errorContainer}>
      <ErrorIcon />
      <span css={errorDetail}>{message}</span>
      <button
        css={moveBtn}
        onClick={() => {
          navigate(-2);
        }}>
        이전 페이지로
      </button>
    </div>
  );
};

export default Error;

const errorContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100dvh;
`;

const errorDetail = css`
  margin: 1.6rem 0 2.4rem;

  color: ${COLORS.gray9};
  ${FONTS.Body2};
`;

const moveBtn = css`
  padding: 1rem 1.6rem;
  border-radius: 10px;

  background-color: ${COLORS.brand1};

  color: ${COLORS.white};
  ${FONTS.Body3};
`;
