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

export const MAP_UNIVERSAL_TYPE: Record<category, string> = {
  physical: '지체장애인',
  visual: '시각장애인',
  infant: '영유아가족',
  hearing: '청각장애인',
};

export const INITIAL_FILTER_STATE: filterState = {
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

export const INITIAL_FILTER_INDEX_INFO = {
  wheelchair: [],
  exit: [],
  elevator: [],
  restroom: [],
  guidesystem: [],
  blindhandicapetc: [],
  signguide: [],
  videoguide: [],
  hearingroom: [],
  hearinghandicapetc: [],
  stroller: [],
  lactationroom: [],
  babysparechair: [],
  infantsfamilyetc: [],
  auditorium: [],
  room: [],
  handicapetc: [],
  braileblock: [],
  helpdog: [],
  guidehuman: [],
  audioguide: [],
  bigprint: [],
  brailepromotion: [],
  parking: [],
  route: [],
  publictransport: [],
  ticketoffice: [],
  promotion: [],
};

export const getFilterList = (filterState: filterState) => {
  return Object.values(filterState).flatMap((obj) =>
    Object.entries(obj)
      .filter(([, value]) => value)
      .map(([key]) => key),
  );
};

export const createInitialFilterState = (initialCategory: string[]) => {
  const tempFilterObj = { ...INITIAL_FILTER_STATE };

  initialCategory.forEach((categoryItem) => {
    const targetCategory = Object.keys(MAP_UNIVERSAL_TYPE).find(
      (key) => MAP_UNIVERSAL_TYPE[key as category] === categoryItem,
    );

    if (targetCategory) {
      Object.keys(tempFilterObj[targetCategory as category]).forEach((key) => {
        tempFilterObj[targetCategory as category][key] = true;
      });
    }
  });

  return tempFilterObj;
};
