import { css } from '@emotion/react';

import { COLORS, FONTS } from '@/styles/constants';

const myCss1 = css`
  display: flex;
  justify-content: center;

  width: 100%;
  padding: 1rem;
  border: solid 1px black;

  color: ${COLORS.star};

  cursor: pointer;

  ${FONTS.Small1};
`;

const MainPage = () => {
  return <div css={myCss1}>유니트립</div>;
};

export default MainPage;
