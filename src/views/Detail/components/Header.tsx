import { css } from '@emotion/react';
import { useState } from 'react';

import { ArrowLeftIcon, HeartFilledIcon, HeartGrayIcon } from '@/assets/icon';

function Header() {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const favoriteOnClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <header css={headerContainer}>
      <button type="button">
        <ArrowLeftIcon />
      </button>
      <button type="button" onClick={favoriteOnClick}>
        {isFavorite ? <HeartFilledIcon /> : <HeartGrayIcon />}
      </button>
    </header>
  );
}

export default Header;

const headerContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 4.8rem;
  padding: 1.2rem 2rem;

  background-color: transparent;
`;
