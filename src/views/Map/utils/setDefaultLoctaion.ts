import { POSITION_LATLNG } from '../constants/POSITION_LATLNG';

/** 저장된 유저 정보로 default 위도, 경도 검색 */
export const setDefaultLocation = (city: string, town: string) => {
  const currentCity = POSITION_LATLNG.find((item) => item.city === city);
  const currentTown = currentCity?.town.find((item) => item.key === town);

  return currentTown;
};
