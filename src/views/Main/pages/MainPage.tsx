import { css } from '@emotion/react';

import MenuBar from '@/components/MenuBar';
import { COLORS, FONTS } from '@/styles/constants';

import Header from '../components/Header';
import NearbyTravel from '../components/NearbyTravel';
import RecommendedTravel from '../components/RecommendedTravel';

const MainPage = () => {
  const isLoggedIn = true;
  return (
    <>
      <Header />
      <main css={container}>
        <h1 css={mainText}>
          {isLoggedIn && (
            <>
              서현님,
              <br />
            </>
          )}
          오늘 어디로 떠날까요?
        </h1>
        <NearbyTravel />

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
