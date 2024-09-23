import { locType } from '../pages/MapPage';

const { kakao } = window;

export const createKakaoMap = (loc: locType | undefined, level: number) => {
  if (loc?.lat && loc?.lng) {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(loc.lat, loc.lng),
      level: level,
    };
    const kakaoMap = new kakao.maps.Map(container, options);
    return kakaoMap;
  }
};
