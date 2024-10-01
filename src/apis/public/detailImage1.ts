/** 이미지정보 조회 API */

import { detailImage1ResItem } from '@/types/detailImage1';
import { Response } from '@/types/public';

import { publicDataClient } from '..';

interface detailImage1Params {
  numOfRows: number;
  pageNo: number;
  MobileOS: 'IOS' | 'AND' | 'WIN' | 'ETC';
  contentId: number;
  imageYN: 'Y' | 'N';
  subImageYN: 'Y' | 'N';
}

export const getDetailImage1 = async (paramsInfo: detailImage1Params) => {
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
  } = await publicDataClient.get<Response<detailImage1ResItem[]>>(
    `/detailImage1?${params}`,
  );

  return items;
};
