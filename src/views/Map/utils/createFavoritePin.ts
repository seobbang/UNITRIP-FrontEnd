import { FavPinImage } from '@/assets/image';

import { bottomSheetType, mapType } from '../pages/MapPage';
import { favoriteListType, getDetailCommonRes } from './getDetailCommon';

export interface contentIdListType {
  contentId: number;
}

export interface bottomSheetInfoType {
  title: string;
  address: string;
  image: string;
  contentId: string;
}

export const createFavoritePin = async (
  idList: number[],
  kakaoMap: mapType | undefined,
  setBottomSheetContent: React.Dispatch<React.SetStateAction<bottomSheetType>>,
  openPinBottomSheet: (state: string) => void,
) => {
  const markers: kakao.maps.Marker[] = [];
  let favoriteList: favoriteListType[] = [];

  if (idList.length === 0) {
    console.log('저장한 여행지가 없습니다');
  } else {
    const res = await getDetailCommonRes(idList);

    if (res) {
      favoriteList = res.favoriteList;
    }

    const imageSrc = FavPinImage;
    const imageSize = new kakao.maps.Size(30, 30);
    const imageOption = { offset: new kakao.maps.Point(0, 0) };

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption,
    );

    favoriteList.forEach((item) => {
      const marker = new kakao.maps.Marker({
        map: kakaoMap,
        position: new kakao.maps.LatLng(Number(item.mapY), Number(item.mapX)),
        image: markerImage,
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        setBottomSheetContent({
          title: item.title,
          address: item.address,
          image: item.image,
          contentId: item.contentId,
        });
        openPinBottomSheet('favorite');
      });

      markers.push(marker);
    });
  }

  return { defaultMarker: markers, favoriteList };
};
