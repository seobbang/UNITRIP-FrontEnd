import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import { MypageHeartIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

import FavoritePlaceList from './FavoritePlaceList';

const favoriteList = [];

const Favorite = () => {
  return (
    <>
      {favoriteList.length === 0 ? (
        <div css={emptyContainer}>
          <MypageHeartIcon />
          <p css={emptyText}>
            아직 저장한 여행지가 없어요
            <br />
            유니트립 여행지를 더 둘러볼까요?
          </p>
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

const emptyContainer = css`
  display: flex;
  align-items: center;
  flex-direction: column;

  padding-top: 15rem;
`;

const emptyText = css`
  padding: 1.6rem 0 2.8rem;

  color: ${COLORS.gray9};
  text-align: center;

  ${FONTS.Body4};
`;

const homeBtn = css`
  padding: 0.8rem 1.6rem 1rem;
  border-radius: 1rem;

  background-color: ${COLORS.brand1};

  color: ${COLORS.white};

  ${FONTS.Body3};
`;
