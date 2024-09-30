// 검색 관련 공공 데이터 API

import { Response } from '@/types/public';
import { BarrierFreeItem, SearchItem } from '@/types/search';

import { publicDataClient } from '..';

interface searchKeywordParams {
  pageNo: number;
  numOfRows: number;
  MobileOS: 'IOS' | 'AND' | 'WIN' | 'ETC';
  keyword: string;
  contentTypeId: number;
}

interface BarrierFreeInfoParams {
  MobileOS: 'IOS' | 'AND' | 'WIN' | 'ETC';
  contentId: number;
}

export const getSearchKeyword = async (paramsInfo: searchKeywordParams) => {
  let params = `MobileApp=UNITRIP&_type=json&arrange=O&serviceKey=${import.meta.env.VITE_PUBLIC_DATA_SERVICE_KEY}`;

  for (const [key, value] of Object.entries(paramsInfo)) {
    params += `&${key}=${value}`;
  }

  const {
    data: {
      response: {
        body: { items },
      },
    },
  } = await publicDataClient.get<Response<SearchItem[]>>(
    `/searchKeyword1?${params}`,
  );
  return items;
};

export const getBarrierFreeInfo = async (paramsInfo: BarrierFreeInfoParams) => {
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
  } = await publicDataClient.get<Response<BarrierFreeItem[]>>(
    `/detailWithTour1?${params}`,
  );
  return items;
};
