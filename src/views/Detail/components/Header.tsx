import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import toggleFavorite from '@/apis/supabase/toggleFavorite';
import { ArrowLeftIcon, HeartFilledIcon, HeartGrayIcon } from '@/assets/icon';
import LoginModal from '@/components/LoginModal';

interface headerProps {
  isFavorite: boolean;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = (props: headerProps) => {
  const { isFavorite, setIsFavorite } = props;
  const { contentId } = useParams();

  const [activateModal, setActivateModal] = useState(false);

  const isLoggedIn = sessionStorage.getItem('kakao_id');
  const navigate = useNavigate();

  const favoriteOnClick = async () => {
    if (isLoggedIn) {
      await toggleFavorite(Number(contentId));
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
