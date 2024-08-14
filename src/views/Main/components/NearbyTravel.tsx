import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import { COLORS, FONTS } from '@/styles/constants';

import { cardContainer, scrollContainer } from '../styles/main';
import TravelCard from './TravelCard';

const NearbyTravel = () => {
  const isLoggedIn = true;
  return (
    <section css={container}>
      <h2 css={title}>{isLoggedIn && '서울'} 주변 갈 만한 여행지 🗺️</h2>
      {isLoggedIn ? (
        <>
          <div css={scrollContainer}>
            <li css={cardContainer}>
              <TravelCard
                name="대전 오월드"
                address="대전 중구 사정공원로 70"
              />
              <TravelCard
                name="대전 오월드"
                address="대전 중구 사정공원로 70"
              />
              <TravelCard
                name="대전 오월드"
                address="대전 중구 사정공원로 70"
              />
              <TravelCard
                name="대전 오월드"
                address="대전 중구 사정공원로 70"
              />
            </li>
          </div>
          <Link to="" css={link}>
            서울 여행지 둘러보기
          </Link>
        </>
      ) : (
        <div css={infoBox}>
          <p css={infoMessage}>
            지역 기반 인기 여행지 추천받고 싶다면
            <br />
            카카오톡 로그인이 필요해요!
          </p>
          <button css={button}>여행지 추천받기</button>
        </div>
      )}
    </section>
  );
};

export default NearbyTravel;

const container = css`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  width: 100%;
  padding-bottom: 3.2rem;
  margin: 2.4rem 0 0;
`;

const title = css`
  margin-left: 2rem;

  color: ${COLORS.gray9};
  ${FONTS.H4};
`;

const link = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(100% - 4rem);
  height: 5.6rem;
  margin-top: 1.6rem;
  margin-left: 2rem;
  border: 1px solid ${COLORS.gray3};
  border-radius: 1.2rem;

  color: ${COLORS.gray9};
  ${FONTS.Body2};
`;

const infoBox = css`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: calc(100% - 4rem);
  padding: 3.2rem 0;
  margin: 1.6rem 0 0 2rem;
  border-radius: 1.2rem;

  background-color: ${COLORS.gray0};
`;

const infoMessage = css`
  color: ${COLORS.gray6};
  text-align: center;
  ${FONTS.Body3};
`;

const button = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 12.7rem;
  height: 3.9rem;
  border-radius: 1rem;

  background-color: ${COLORS.brand1};

  color: ${COLORS.white};

  cursor: pointer;
  ${FONTS.Body3};
`;
