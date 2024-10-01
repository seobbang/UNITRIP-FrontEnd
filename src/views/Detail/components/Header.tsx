import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowLeftIcon, HeartFilledIcon, HeartGrayIcon } from '@/assets/icon';
import LoginModal from '@/components/LoginModal';

const Header = () => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [activateModal, setActivateModal] = useState(false);

  const isLoggedIn = sessionStorage.getItem('kakao_id');
  const navigate = useNavigate();

  const favoriteOnClick = () => {
    if (isLoggedIn) {
      setIsFavorite(!isFavorite);
    } else {
      setActivateModal(true);
    }
  };

  const closeModal = () => {
    setActivateModal(false);
  };

  return (
    <>
      <header css={headerContainer}>
        <button type="button" onClick={() => navigate('/')}>
          <ArrowLeftIcon />
        </button>
        <button type="button" onClick={favoriteOnClick}>
          {isFavorite ? <HeartFilledIcon /> : <HeartGrayIcon />}
        </button>
      </header>
      {activateModal && <LoginModal onClick={closeModal} />}
    </>
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
