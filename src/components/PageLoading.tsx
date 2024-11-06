import { css } from '@emotion/react';

import { WhiteSpinnerGIF } from '@/assets/image';
import { COLORS, FONTS } from '@/styles/constants';

const PageLoading = () => {
  return (
    <div css={dataContainer}>
      <img css={img} src={WhiteSpinnerGIF} alt="spinner" />
      <p css={text}>여행지를 찾고 있어요!</p>
    </div>
  );
};

export default PageLoading;

const dataContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  z-index: 999;

  width: 100%;
  width: 100dvw;
  height: 100%;
  height: 100dvh;

  background-color: rgb(82 82 82 / 72%);
`;

const img = css`
  width: 16rem;
  height: 16rem;
`;

const text = css`
  padding-top: 2rem;
  margin-left: 2rem;

  color: ${COLORS.white};

  ${FONTS.H5};
`;
