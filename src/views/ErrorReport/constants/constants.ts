import { listType } from '../types/errorReportType';

export const LIST_CONTENT: listType[] = [
  {
    type: 'detail',
    title: '상세정보',
    explain: '장소명, 주소, 휴무일, 이용시간 등',
  },
  {
    type: 'universal',
    title: '유니버설',
    explain: '편의시설, 장애시설 구분 등',
  },
  { type: 'map', title: '지도', explain: '시설 위치, 외부 지도 앱 링크 등' },
  { type: 'photo', title: '사진', explain: '제공 사진, 카테고리 등' },
  { type: 'etc', title: '기타', explain: '위 항목에 포함되지 않는 정보' },
];
