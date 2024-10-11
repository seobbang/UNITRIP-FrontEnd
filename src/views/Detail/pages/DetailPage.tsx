import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import getUserData from '@/apis/supabase/getUserData';
import { DefaultImage } from '@/assets/image';
import { useAsyncEffect } from '@/hooks/use-async-effect';
import { COLORS, FONTS } from '@/styles/constants';

import DetailHeader from '../components/DetailHeader';
import ErrorReport from '../components/ErrorReport';
import PlaceInfo from '../components/PlaceInfo';
import Tab from '../components/Tab';
import { getDetailCommonRes } from '../utils/getDetailCommon1';
import { getDetailIntroRes } from '../utils/getDetailIntro1';

export interface placeInfoType {
  title: string;
  info: {
    addr: string;
    tel: string;
    useTime: string;
  };
  imageUrl: string;
}

export interface detailInfoType {
  restDate: string;
  useTime: string;
  useFee: string;
}

const DetailPage = () => {
  const { pathname } = useLocation();
  const { contentId } = useParams();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(
    pathname.endsWith('review') ? '리뷰' : '상세정보',
  );

  const [placeInfo, setPlaceInfo] = useState<placeInfoType>({
    title: '',
    info: {
      addr: '',
      tel: '',
      useTime: '',
    },
    imageUrl: '',
  });

  const [latlng, setLatLng] = useState({
    lat: '',
    lng: '',
  });

  const [detailInfo, setDetailInfo] = useState({
    restDate: '',
    useTime: '',
    useFee: '',
  });

  const [isFavorite, setIsFavorite] = useState(false);

  const contentTypeId = useRef('12');
  const contentIdList = useRef<number[]>([]); //서버에서 받아온 contentnId List
  const kakaoId = sessionStorage.getItem('kakao_id');
  const changeCnt = useRef(1);

  useAsyncEffect(async () => {
    await getDetailCommon1Res();
    await getDetailIntro1Res();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  /** 서버 통신 -> favorite_list 받아오기 */
  useAsyncEffect(async () => {
    if (!kakaoId) return;

    const userData = await getUserData(Number(kakaoId));
    if (userData) {
      contentIdList.current = userData.favorite_list;

      contentIdList.current.includes(Number(contentId))
        ? setIsFavorite(true)
        : setIsFavorite(false);
    }
  }, [isFavorite]);

  const getDetailCommon1Res = async () => {
    const res = await getDetailCommonRes(Number(contentId));

    if (res) {
      const { item } = res;
      setPlaceInfo({
        title: item[0].title,
        info: {
          addr: item[0].addr1 !== '' ? item[0].addr1 : '-',
          tel: item[0].tel !== '' ? item[0].tel : '-',
          useTime: '-',
        },
        imageUrl: item[0].firstimage !== '' ? item[0].firstimage : DefaultImage,
      });

      contentTypeId.current = item[0].contenttypeid;

      setLatLng({
        lat: item[0].mapy,
        lng: item[0].mapx,
      });
    }
  };

  const getDetailIntro1Res = async () => {
    const res = await getDetailIntroRes(
      Number(contentId),
      contentTypeId.current,
    );

    if (res) {
      const { item } = res;

      setPlaceInfo((prev) => ({
        ...prev,
        info: {
          ...prev.info,
          useTime:
            contentTypeId.current === '12'
              ? item[0].usetime && item[0].usetime !== ''
                ? item[0].usetime
                : '-'
              : contentTypeId.current === '14'
                ? item[0].usetimeculture && item[0].usetimeculture !== ''
                  ? item[0].usetimeculture
                  : '-'
                : '-',
        },
      }));

      setDetailInfo({
        restDate: item[0].restdate
          ? item[0].restdate !== ''
            ? item[0].restdate
            : '-'
          : '-',
        useTime:
          contentTypeId.current === '12'
            ? item[0].usetime && item[0].usetime !== ''
              ? item[0].usetime
              : '-'
            : contentTypeId.current === '14'
              ? item[0].usetimeculture && item[0].usetimeculture !== ''
                ? item[0].usetimeculture
                : '-'
              : '-',
        useFee: item[0].usefee
          ? item[0].usefee !== ''
            ? item[0].usefee
            : '-'
          : '-',
      });
    }
  };

  const handleTabChange = (tab: string) => {
    changeCnt.current++;

    if (tab === '리뷰') navigate(`/${contentId}/review`);
    else navigate(`/${contentId}`);
    setSelectedTab(tab);
  };

  return (
    <div css={detailContainer}>
      <div css={backgroundImg(placeInfo.imageUrl)}>
        <div css={backgroundCss}>
          <DetailHeader
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            changeCnt={changeCnt.current}
          />
          <span css={title}>{placeInfo.title || '-'}</span>
        </div>
      </div>
      <PlaceInfo placeInfo={placeInfo.info} />
      <div css={gapLine}></div>
      <Tab
        selectedTab={selectedTab}
        setSelectedTab={handleTabChange}
        latlng={latlng}
        detailInfo={detailInfo}
      />
      <div css={gapLine}></div>
      {selectedTab === '상세정보' ||
      selectedTab === '유니버설' ||
      selectedTab === '지도' ||
      selectedTab === '사진' ? (
        <>
          <div css={gapLine}></div>
          <ErrorReport />
        </>
      ) : null}
    </div>
  );
};

export default DetailPage;

const detailContainer = css`
  width: 100dvw;
`;

const backgroundImg = (url: string) => css`
  width: auto;

  background-position: center center;
  background-size: cover;
  background-image: url(${url || DefaultImage});
  background-repeat: no-repeat;
`;

const backgroundCss = css`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  height: 26.3rem;

  background: linear-gradient(
    180deg,
    rgb(0 0 0 / 0%) 0%,
    rgb(0 0 0 / 34%) 100%
  );
`;

const title = css`
  padding: 1.2rem 2rem;

  color: ${COLORS.white};

  ${FONTS.H2};
`;

const gapLine = css`
  width: 100%;
  height: 1.3rem;

  background-color: ${COLORS.gray1};
`;
