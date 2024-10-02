import { css } from '@emotion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import getUserData from '@/apis/supabase/getUserData';
import EmptyFavList from '@/components/EmptyFavList';
import { useAsyncEffect } from '@/hooks/use-async-effect';
import { COLORS, FONTS } from '@/styles/constants';

import FavoritePlaceList from './FavoritePlaceList';

const Favorite = () => {
  const [favoriteList, setFavoriteList] = useState<number[]>([]);

  useAsyncEffect(async () => {
    const kakaoId = sessionStorage.getItem('kakao_id');
    if (!kakaoId) return;

    const userData = await getUserData(Number(kakaoId));
    if (userData) {
      setFavoriteList(userData.favorite_list);
    }
  }, []);

  return (
    <>
      {favoriteList.length <= 1 ? (
        <div css={messageContainer}>
          <EmptyFavList />
          <Link to="/" css={homeBtn}>
            홈으로 이동하기
          </Link>
        </div>
      ) : (
        <FavoritePlaceList favoriteList={favoriteList} />
      )}
    </>
  );
};

export default Favorite;

const messageContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-top: 15rem;
`;

const homeBtn = css`
  padding: 0.8rem 1.6rem 1rem;
  border-radius: 1rem;

  background-color: ${COLORS.brand1};

  color: ${COLORS.white};

  ${FONTS.Body3};
`;
