import { KakaoMarkerImage } from '@/assets/image';
import { locationBasedList1Res } from '@/types/locationBasedList1';

import { bottomSheetType, mapType } from '../pages/MapPage';

interface responseType {
  title: string;
  latlng: kakao.maps.LatLng;
  address: string;
  image: string;
  contentId: string;
}

export const createMapPin = (
  apiRes: locationBasedList1Res[] | undefined,
  kakaoMap: mapType | undefined,
  setBottomSheet: React.Dispatch<React.SetStateAction<bottomSheetType>>,
  openPinBottomSheet: (state: string) => void,
) => {
  if (!apiRes || apiRes.length === 0) {
    console.log('검색 결과가 없습니다.');
    return { markers: [], kakaoMap: null };
  }

  const response: responseType[] = [];
  const imageSrc = KakaoMarkerImage;
  const imageSize = new kakao.maps.Size(25, 40);
  const imageOption = { offset: new kakao.maps.Point(0, 0) };

  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption,
  );

  apiRes?.forEach((item) => {
    response.push({
      title: item.title,
      latlng: new kakao.maps.LatLng(Number(item.mapy), Number(item.mapx)),
      address: item.addr1,
      image: item.firstimage,
      contentId: item.contentid,
    });
  });

  const markers: kakao.maps.Marker[] = [];

  response.forEach((item) => {
    const marker = new kakao.maps.Marker({
      map: kakaoMap,
      position: item.latlng,
      image: markerImage,
    });

    /** 마커마다 클릭 이벤트 생성 */
    kakao.maps.event.addListener(marker, 'click', function () {
      setBottomSheet({
        title: item.title,
        address: item.address,
        image: item.image,
        contentId: item.contentId,
      });
      openPinBottomSheet('search');
    });

    markers.push(marker);
  });

  return { curMarkers: markers };
};
