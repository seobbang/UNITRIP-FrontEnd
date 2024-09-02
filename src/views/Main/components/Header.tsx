import { css } from '@emotion/react';

import { SearchMonoIcon, UnitripIcon } from '@/assets/icon';
import { COLORS } from '@/styles/constants';

const Header = () => {
  const handleLogin = () => {
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.authorize({
        redirectUri:
          import.meta.env.VITE_LOCAL_REDIRECT_URI ||
          import.meta.env.VITE_REDIRECT_URI,
      });
    }
  };

  return (
    <header css={header}>
      <UnitripIcon />
      <button onClick={handleLogin} css={searchCss}>
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
