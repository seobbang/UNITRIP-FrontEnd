import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import EmptyFavList from '@/components/EmptyFavList';
import { COLORS, FONTS } from '@/styles/constants';

import FavoritePlaceList from './FavoritePlaceList';

const favoriteList = [];

const Favorite = () => {
  return (
    <>
      {favoriteList.length === 0 ? (
        <div css={messageContainer}>
          <EmptyFavList />
          <Link to="/" css={homeBtn}>
            홈으로 이동하기
          </Link>
        </div>
      ) : (
        <FavoritePlaceList />
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
