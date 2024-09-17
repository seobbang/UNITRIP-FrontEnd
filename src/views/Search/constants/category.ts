import {
  Facility,
  HEARING_FACILITIES,
  INFANT_FACILITIES,
  PHYSICAL_FACILITIES,
  VISUAL_FACILITIES,
} from '@/constants/facilities';

import { category, filterState } from '../types/category';

export const MAP_CATEGORY_FACILITIES: Record<
  category,
  { categoryName: string; iconList: Facility[] }
> = {
  physical: { categoryName: '지체장애', iconList: PHYSICAL_FACILITIES },
  visual: { categoryName: '시각장애', iconList: VISUAL_FACILITIES },
  hearing: { categoryName: '청각장애', iconList: HEARING_FACILITIES },
  infant: { categoryName: '영유아 가족', iconList: INFANT_FACILITIES },
};

const INITIAL_FILTER_STATE: filterState = {
  physical: {
    주차장: false,
    접근로: false,
    대중교통: false,
    매표소: false,
    홍보물: false,
    휠체어: false,
    출입통로: false,
    엘리베이터: false,
    화장실: false,
    관람석: false,
  },
  visual: {
    '점형/선형 블록': false,
    안내견: false,
    '안내 요원': false,
    오디오가이드: false,
    '큰 활자': false,
    '점자 표지판': false,
    '유도·안내': false,
  },
  hearing: {
    '수화 안내': false,
    자막: false,
  },
  infant: {
    유모차: false,
    수유실: false,
    '유아용 의자': false,
  },
};

export const createInitialFilterState = () => {
  return INITIAL_FILTER_STATE;
};
