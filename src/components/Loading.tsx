import { css } from '@emotion/react';

import { BlackSpinnerGIF } from '@/assets/image';

const Loading = () => {
  return (
    <div css={dataContainer}>
      <img css={img} src={BlackSpinnerGIF} alt="spinner" />
    </div>
  );
};

export default Loading;

const dataContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 2rem;
`;

const img = css`
  width: 8rem;
  height: 8rem;
`;
