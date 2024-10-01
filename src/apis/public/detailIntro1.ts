/** 소개정보 조회 API */

import { detailIntro1ResItem } from '@/types/detailIntro1';
import { Response } from '@/types/public';

import { publicDataClient } from '..';

interface detailIntro1Params {
  numOfRows: number;
  pageNo: number;
  MobileOS: 'IOS' | 'AND' | 'WIN' | 'ETC';
  contentId: number;
  contentTypeId: string;
}

export const getdetailIntro1 = async (paramsInfo: detailIntro1Params) => {
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
  } = await publicDataClient.get<Response<detailIntro1ResItem[]>>(
    `/detailIntro1?${params}`,
  );

  return items;
};
