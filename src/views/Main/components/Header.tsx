import { css } from '@emotion/react';

import { SearchMonoIcon, UnitripIcon } from '@/assets/icon';

const Header = () => {
  return (
    <header css={header}>
      <UnitripIcon />
      <button onClick={() => {}}>
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
