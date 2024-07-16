import { css } from '@emotion/react';

import { COLORS } from '@/styles/constants';

const myCss1 = css`
  display: flex;
  justify-content: center;

  width: 100%;
  padding: 1rem;
  border: solid 1px black;

  color: ${COLORS.blue};
  font-size: 10rem;

  cursor: pointer;
`;

const MainPage = () => {
  return <div css={myCss1}>main</div>;
};

export default MainPage;
