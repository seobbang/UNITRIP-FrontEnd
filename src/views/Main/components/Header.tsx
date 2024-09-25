import { css } from '@emotion/react';

import { SearchMonoIcon, UnitripIcon } from '@/assets/icon';
import { COLORS } from '@/styles/constants';

const Header = () => {
  return (
    <header css={header}>
      <UnitripIcon />
      <button css={searchCss}>
        <SearchMonoIcon />
      </button>
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
