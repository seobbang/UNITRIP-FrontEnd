import { css } from '@emotion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getPlaceBasedArea } from '@/apis/public/main';
import Loading from '@/components/Loading';
import LoginModal from '@/components/LoginModal';
import { useAsyncEffect } from '@/hooks/use-async-effect';
import { COLORS, FONTS } from '@/styles/constants';
import { PlaceBasedAreaItem } from '@/types/main';

import { cardContainer, scrollContainer } from '../styles/main';
import TravelCard from './TravelCard';

interface NearbyTravelProps {
  isLoggedIn: boolean;
  region?: string;
  favoriteList?: number[];
}

const NearbyTravel = (props: NearbyTravelProps) => {
  const { isLoggedIn, region, favoriteList } = props;
  const [activateModal, setActivateModal] = useState(false);
  const [placeList, setPlaceList] = useState<PlaceBasedAreaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    setActivateModal(false);
  };

  const showModal = () => {
    setActivateModal(true);
  };

  useAsyncEffect(async () => {
    if (!region) return;

    setIsLoading(true);
    try {
      const placeList = await getPlaceBasedArea({
        region: region || '서울',
      });
      setPlaceList(placeList === '' ? [] : placeList.item);
    } finally {
      setIsLoading(false);
    }
  }, [region]);

  return (
    <section css={container}>
      <h2 css={title}>
        {isLoggedIn && (region || '서울')} 주변 갈 만한 여행지 🗺️
      </h2>
      {isLoggedIn ? (
        isLoading ? (
          <Loading />
        ) : (
          <>
            <div css={scrollContainer}>
              <ul css={cardContainer}>
                {placeList.map(
                  ({ title, addr1, addr2, contentid, firstimage }) => (
                    <TravelCard
                      key={contentid}
                      contentid={contentid}
                      name={title}
                      address={`${addr1} ${addr2}`}
                      imgUrl={firstimage}
                      isHeart={!!favoriteList?.includes(Number(contentid))}
                    />
                  ),
                )}
              </ul>
            </div>
            <Link to="/map" css={link}>
              {region || '서울'} 여행지 둘러보기
            </Link>
          </>
        )
      ) : (
        <div css={infoBox}>
          <p css={infoMessage}>
            지역 기반 인기 여행지 추천받고 싶다면
            <br />
            카카오톡 로그인이 필요해요!
          </p>
          <button type="button" css={button} onClick={showModal}>
            여행지 추천받기
          </button>
        </div>
      )}
      {activateModal && <LoginModal onClick={closeModal} />}
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
