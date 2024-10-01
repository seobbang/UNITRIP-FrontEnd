import { css } from '@emotion/react';
import { useState } from 'react';

import getUserData from '@/apis/supabase/getUserData';
import MenuBar from '@/components/MenuBar';
import { useAsyncEffect } from '@/hooks/use-async-effect';
import { COLORS, FONTS } from '@/styles/constants';
import { UserDataResponse } from '@/types/userAPI';

import Header from '../components/Header';
import NearbyTravel from '../components/NearbyTravel';
import RecommendedTravel from '../components/RecommendedTravel';

const MainPage = () => {
  const [userData, setUserData] = useState<UserDataResponse | null>(null);
  const isLoggedIn = sessionStorage.getItem('kakao_id');

  useAsyncEffect(async () => {
    if (!isLoggedIn) return;

    try {
      const response = await getUserData(Number(isLoggedIn));
      setUserData(response);
    } catch (err) {
      console.log(err);
    }
  }, [isLoggedIn]);

  return (
    <>
      <Header />
      <main css={container}>
        <h1 css={mainText}>
          {userData && (
            <>
              {userData.name}님,
              <br />
            </>
          )}
          오늘 어디로 떠날까요?
        </h1>
        <NearbyTravel
          isLoggedIn={Boolean(isLoggedIn)}
          region={userData?.region}
          favoriteList={userData?.favorite_list}
        />
        <div css={graySpacing} />
        <RecommendedTravel />
      </main>
      <MenuBar />
    </>
  );
};

export default MainPage;

const container = css`
  width: 100vw;
`;

const mainText = css`
  padding-top: 2rem;
  margin-left: 2rem;

  color: ${COLORS.gray9};
  ${FONTS.H3};
`;

const graySpacing = css`
  width: 100vw;
  height: 1.2rem;

  background-color: ${COLORS.gray0};
`;
