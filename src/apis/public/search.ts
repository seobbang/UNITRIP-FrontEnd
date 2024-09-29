// 검색 관련 공공 데이터 API

import { Response } from '@/types/public';
import { SearchItem } from '@/types/search';

import { publicDataClient } from '..';

interface searchKeywordParams {
  pageNo: number;
  numOfRows: number;
  MobileOS: 'IOS' | 'AND' | 'WIN' | 'ETC';
  keyword: string;
  contentTypeId: number;
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
