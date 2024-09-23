export interface locationBasedList1Res {
  tel: 'string';
  title: 'string';
  firstimage: 'string';
  createdtime: 'string';
  dist: 'string';
  cat2: 'string';
  contentid: 'string';
  contenttypeid: 'string';
  addr1: 'string';
  addr2: 'string';
  areacode: 'string';
  booktour: 'string';
  cat1: 'string';
  mlevel: 'string';
  modifiedtime: 'string';
  sigungucode: 'string';
  cpyrhtDivCd: 'string';
  firstimage2: 'string';
  mapx: 'string';
  mapy: 'string';
  cat3: 'string';
}

export interface getLocationBasedList1Res {
  header: {
    resultMsg: 'string';
    resultCode: 'string';
  };
  body: {
    pageNo: number;
    totalCount: number;
    items:
      | {
          item: locationBasedList1Res[];
        }
      | '';
  };
}
