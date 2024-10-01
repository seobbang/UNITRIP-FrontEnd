/** 공통정보 조회 API */

import { detailCommon1Res } from '@/types/detailCommon1';
import { Response } from '@/types/public';

import { publicDataClient } from '..';

interface detailCommon1Params {
  numOfRows: number;
  pageNo: number;
  MobileOS: 'IOS' | 'AND' | 'WIN' | 'ETC';
  contentId: number;
  defaultYN: 'Y' | 'N';
  firstImageYN: 'Y' | 'N';
  addrinfoYN: 'Y' | 'N';
  mapinfoYN: 'Y' | 'N';
}

export const getDetailCommon1 = async (paramsInfo: detailCommon1Params) => {
  let params = `MobileApp=UNITRIP&_type=json&serviceKey=${import.meta.env.VITE_PUBLIC_DATA_SERVICE_KEY}`;

  for (const [key, value] of Object.entries(paramsInfo)) {
    params += `&${key}=${value}`;
  }

  const {
    data: {
      response: {
        body: { items },
      },
    },
  } = await publicDataClient.get<Response<detailCommon1Res[]>>(
    `/detailCommon1?${params}`,
  );

  return items;
};
