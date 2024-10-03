import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import toggleFavorite from '@/apis/supabase/toggleFavorite';
import { ArrowLeftIcon, HeartFilledIcon, HeartGrayIcon } from '@/assets/icon';
import Header from '@/components/Header';
import LoginModal from '@/components/LoginModal';

interface headerProps {
  isFavorite: boolean;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  changeCnt: number;
}

const DetailHeader = (props: headerProps) => {
  const { isFavorite, setIsFavorite, changeCnt } = props;
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
      <Header
        leftIcon={ArrowLeftIcon}
        leftFn={() => navigate(-Math.abs(changeCnt))}
        rightIcon={isFavorite ? HeartFilledIcon : HeartGrayIcon}
        rightFn={favoriteOnClick}
      />
      {activateModal && <LoginModal onClick={closeModal} />}
    </>
  );
};

export default DetailHeader;
