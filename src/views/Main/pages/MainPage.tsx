import { css } from '@emotion/react';

import { COLORS, FONTS } from '@/styles/constants';

const myCss1 = css`
  display: flex;
  justify-content: center;

  width: 100dvw;
  height: 100dvh;

  background-color: white;

  color: ${COLORS.star};

  ${FONTS.Body3};
`;

const MainPage = () => {
  return <div css={myCss1}>유니트립</div>;
};

export default MainPage;
