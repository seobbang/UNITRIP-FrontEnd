/** 위치기반 관광정보 조회 API */
import { locationBasedList1Res } from '@/types/locationBasedList1';
import { Response } from '@/types/public';

import { publicDataClient } from '..';

interface locationBasedList1Params {
  pageNo: number;
  numOfRows: number;
  MobileOS: 'IOS' | 'AND' | 'WIN' | 'ETC';
  mapX: string | undefined;
  mapY: string | undefined;
  radius: string;
  contentTypeId: number;
}

export const getLocationBasedList1 = async (
  paramsInfo: locationBasedList1Params,
) => {
  let params = `MobileApp=UNITRIP&_type=json&arrange=S&serviceKey=${import.meta.env.VITE_PUBLIC_DATA_SERVICE_KEY}`;

  for (const [key, value] of Object.entries(paramsInfo)) {
    params += `&${key}=${value}`;
  }

  const {
    data: {
      response: {
        body: { items },
      },
    },
  } = await publicDataClient.get<Response<locationBasedList1Res[]>>(
    `/locationBasedList1?${params}`,
  );

  return items;
};
