import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowLeftIcon, HeartFilledIcon, HeartGrayIcon } from '@/assets/icon';

const Header = () => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const navigate = useNavigate();

  const favoriteOnClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <header css={headerContainer}>
      <button type="button" onClick={() => navigate('/')}>
        <ArrowLeftIcon />
      </button>
      <button type="button" onClick={favoriteOnClick}>
        {isFavorite ? <HeartFilledIcon /> : <HeartGrayIcon />}
      </button>
    </header>
  );
};

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
