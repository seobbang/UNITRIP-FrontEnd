import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';

import {
  CloseBottomSheetIcon,
  MapFavoirteIcon,
  MapSearchActiveIcon,
  MapSearchInactiveIcon,
  RefreshMonoIcon,
} from '@/assets/icon';
import LoginModal from '@/components/LoginModal';
import MenuBar from '@/components/MenuBar';
import { COLORS, FONTS } from '@/styles/constants';
import { locationBasedList1Res } from '@/types/locationBasedList1';

import FavoriteBottomSheet from '../components/FavoriteBottomSheet';
import PinBottomSheet from '../components/PinBottomSheet';
import { DUMMY } from '../constants/DUMMY';
import { createFavoritePin } from '../utils/createFavoritePin';
import { createKakaoMap } from '../utils/createKakaoMap';
import { createMapPin } from '../utils/createMapPin';
import { getMapCenter } from '../utils/getMapCenter';
import { setDefaultLocation } from '../utils/setDefaultLoctaion';

export interface locType {
  lat: number | undefined;
  lng: number | undefined;
}

export interface bottomSheetType {
  title: string;
  address: string;
  image: string;
  contentId: string;
}

export type mapType = kakao.maps.Map | undefined;

const MapPage = () => {
  const [map, setMap] = useState<mapType>(); // 카카오맵 관리

  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]); // 주변여행지 검색 시 마커 리스트
  const [favMarkers, setFavMarkers] = useState<kakao.maps.Marker[]>([]); // 저장한 여행지 마커 리스트

  const [region, setRegion] = useState({ city: '', town: '' }); // 사용자 지정 지역
  const [defaultLoc, setDefaultLoc] = useState<locType>(); // 사용자 지정 지역 좌표

  const [getLocActive, setGetLocActive] = useState(false); // 위치 허용에 따른 아이콘 변화
  const [activateModal, setActivateModal] = useState(false);

  const isLoggedIn = sessionStorage.getItem('kako_id');

  // 바텀시트 내용
  const [bottomSheetContent, setBottomSheetContent] = useState<bottomSheetType>(
    {
      title: '',
      address: '',
      image: '',
      contentId: '',
    },
  );

  const [isPinClicked, setIsPinClicked] = useState(false); // 핀 클릭 바텀시트
  const [isFavClicked, setIsFavClicked] = useState(false); // 저장한 여행지 버튼
  const [isFavPinClicked, setIsFavPinClicked] = useState(false); // 저장한 여행지 리스트 중 핀 버튼 클릭

  const apiRes = useRef<locationBasedList1Res[]>([]); // 주변 여행지 검색 플로우 결과 저장
  const favoriteList = useRef<bottomSheetType[]>([]); // 저장한 여행지(공통정보api) 플로우 결과 저장

  /** 기본 사용자의 위치에 따른 위도, 경도 값 업데이트 */
  useEffect(() => {
    // 서버에서 사용자 위치 받아와 저장하는 set하는 로직 필요
    setRegion({ city: '서울특별시', town: '광진구' });
    const currentTown = setDefaultLocation(region.city, region.town);
    setDefaultLoc({
      lat: currentTown?.lat,
      lng: currentTown?.lng,
    });
  }, [region.city, region.town]);

  /** '/map' 진입시, 사용자가 회원가입 할 때 등록했던 지역을 기준으로 지도 띄우기 */
  useEffect(() => {
    const kakaoMap = createKakaoMap(defaultLoc, 5);
    setMap(kakaoMap);
  }, [defaultLoc]);

  /** 저장한 여행지 목록 버튼 클릭 */
  const onClickFavorite = async () => {
    if (isLoggedIn) {
      if (map) {
        clearMarker();

        const res = await createFavoritePin(
          DUMMY, // 서버에서 받아온 contentId list로 대체 필요
          map,
          setBottomSheetContent,
          openPinBottomSheet,
        );

        if (res) {
          favoriteList.current = res.favoriteList;
          setFavMarkers(res.defaultMarker);
        }

        openFavoriteBottomSheet();
      }
    } else {
      setActivateModal(true);
    }
  };

  const openFavoriteBottomSheet = () => {
    setIsFavClicked(true);
  };

  const closeFavoriteBottomSheet = () => {
    setIsFavClicked(false);
  };

  /** 핀 클릭 시 보여지는 content 1개짜리 바텀시트 open */
  const openPinBottomSheet = (state: string) => {
    if (state === 'search') {
      setIsPinClicked(true);
    } else if (state === 'favorite') {
      setIsFavPinClicked(true);
    }
  };

  /** 사용자의 현재 위치 (위도, 경도) 받아오기 */
  const getCurrentLoc = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latlng = new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          );
          if (map) {
            clearMarker();
            clearFavMarkers();
            map.setCenter(latlng);
            map.setLevel(4);
          }
          setGetLocActive(true);
        },
        (err) => {
          alert('동의 거부 - 권한 재설정 필요');
          console.log(err);
        },
      );
    } else {
      //브라우저가 geolocation 지원 X
      alert('해당 브라우저에서 현재 위치를 가져올 수 없습니다.');
    }
  };

  /** 지도에서 마커 제거, 마커 state 초기화 */
  const clearMarker = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  /** 지도에서 하트 마커 제거, 하트 마커 state 초기화 */
  const clearFavMarkers = () => {
    favMarkers.forEach((marker) => marker.setMap(null));
    setFavMarkers([]);
  };

  /** 주변 여행지 찾기 클릭 시 지도 중심좌표 값 받아오기 & 공공api 검색 / 지도에 핀 생성 */
  const onClickSearch = async () => {
    const response = await getMapCenter(map);

    if (map && response && response.item) {
      clearMarker();
      clearFavMarkers();

      apiRes.current = response.item;

      const { curMarkers } = createMapPin(
        apiRes.current,
        map,
        setBottomSheetContent,
        openPinBottomSheet,
      );

      if (curMarkers) {
        curMarkers.forEach((marker) => {
          marker.setMap(map);
        });

        setMarkers(curMarkers);
        map.setLevel(6);
      }
    }
  };

  const closeModal = () => {
    setActivateModal(false);
  };

  return (
    <>
      <div id="map" css={MapContainer}>
        <section css={buttonSection}>
          <div css={topButtonSection}>
            {isFavClicked ? (
              <CloseBottomSheetIcon />
            ) : (
              <MapFavoirteIcon onClick={onClickFavorite} />
            )}
          </div>
          {!isPinClicked && (
            <div css={bottomButtonSection}>
              <button css={searchButton} type="button" onClick={onClickSearch}>
                주변 여행지 찾아보기
                <RefreshMonoIcon />
              </button>
              <button css={rightButton} onClick={getCurrentLoc} type="button">
                {getLocActive ? (
                  <MapSearchActiveIcon />
                ) : (
                  <MapSearchInactiveIcon />
                )}
              </button>
            </div>
          )}
        </section>
        <div css={bottomSection}>
          {isPinClicked && (
            <PinBottomSheet
              title={bottomSheetContent.title}
              address={bottomSheetContent.address}
              image={bottomSheetContent.image}
              contentId={bottomSheetContent.contentId}
              closeBottomSheet={() => {
                setIsPinClicked(false);
              }}
            />
          )}

          {isFavClicked && (
            <FavoriteBottomSheet
              favoriteList={favoriteList.current}
              closeBottomSheet={closeFavoriteBottomSheet}
            />
          )}

          {isFavPinClicked && (
            <PinBottomSheet
              title={bottomSheetContent.title}
              address={bottomSheetContent.address}
              image={bottomSheetContent.image}
              contentId={bottomSheetContent.contentId}
              closeBottomSheet={() => setIsFavPinClicked(false)}
            />
          )}

          <nav css={menuBarCss}>
            <MenuBar />
          </nav>
        </div>
      </div>
      {activateModal && <LoginModal onClick={closeModal} />}
    </>
  );
};

export default MapPage;

const MapContainer = css`
  position: relative;

  width: 100%;
  height: 100dvh;
`;

const buttonSection = css`
  position: absolute;
  z-index: 2;

  width: 100%;
`;

const topButtonSection = css`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  padding: 0.5rem 1.3rem 0.5rem 0;
`;

const bottomButtonSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  position: fixed;
  bottom: 10.3rem;

  width: 100%;
  padding-right: 1.3rem;
`;

const searchButton = css`
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 1.4rem;

  width: 17.7rem;
  height: 3.9rem;
  padding: 0.9rem 1.6rem;
  border-radius: 1rem;

  background-color: ${COLORS.brand1};

  color: ${COLORS.white};

  ${FONTS.Body3};
`;

const rightButton = css`
  position: absolute;
  right: 1.3rem;
  bottom: 1.1rem;
`;

const bottomSection = css`
  position: relative;
`;

const menuBarCss = css`
  position: absolute;
  z-index: 1000;
`;
