// 검색 관련 공공 데이터 API

import { AreaCodeItem, PlaceBasedAreaItem } from '@/types/main';
import { Response } from '@/types/public';

import { publicDataClient } from '..';

interface placeBasedAreaParams {
  region: string;
}

export const getAreaCode = async () => {
  const params = `MobileApp=UNITRIP&_type=json&numOfRows=20&MobileOS=ETC&serviceKey=${import.meta.env.VITE_PUBLIC_DATA_SERVICE_KEY}`;

  const {
    data: {
      response: {
        body: { items },
      },
    },
  } = await publicDataClient.get<Response<AreaCodeItem[]>>(
    `/areaCode1?${params}`,
  );
  return items;
};

export const getPlaceBasedArea = async (paramsInfo: placeBasedAreaParams) => {
  const areaItem = await getAreaCode();

  const areaCode =
    areaItem === ''
      ? '1'
      : areaItem.item.find(({ name }) => paramsInfo.region.startsWith(name))
          ?.code;

  const params = `MobileApp=UNITRIP&_type=json&arrange=Q&contentTypeId=12&areaCode=${areaCode || '1'}&MobileOS=ETC&serviceKey=${import.meta.env.VITE_PUBLIC_DATA_SERVICE_KEY}`;

  const {
    data: {
      response: {
        body: { items },
      },
    },
  } = await publicDataClient.get<Response<PlaceBasedAreaItem[]>>(
    `/areaBasedList1?${params}`,
  );
  return items;
};
