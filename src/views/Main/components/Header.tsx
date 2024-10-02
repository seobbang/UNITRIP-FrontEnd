import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import { SearchMonoIcon, UnitripIcon } from '@/assets/icon';
import { COLORS } from '@/styles/constants';

const Header = () => {
  return (
    <header css={header}>
      <UnitripIcon />
      <Link to="/search" css={searchCss}>
        <SearchMonoIcon />
      </Link>
    </header>
  );
};

export default Header;

const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100vw;
  height: 4.8rem;
  padding: 0 2rem;
`;

const searchCss = css`
  color: ${COLORS.gray5};
`;
