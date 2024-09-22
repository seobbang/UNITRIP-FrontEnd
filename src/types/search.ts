export interface SearchResItem {
  cat2: string;
  cat3: string;
  tel: string;
  modifiedtime: string;
  sigungucode: string;
  contentid: string;
  mlevel: string;
  title: string;
  addr1: string;
  addr2: string;
  areacode: string;
  booktour: string;
  cat1: string;
  firstimage2: string;
  mapx: string;
  mapy: string;
  cpyrhtDivCd: string;
  contenttypeid: string;
  createdtime: string;
  firstimage: string;
}

export interface SearchWord {
  header: {
    resultCode: string;
    resultMsg: string;
  };
  body: {
    numOfRows: number;
    pageNo: number;
    totalCount: number;
    items:
      | {
          item: SearchResItem[];
        }
      | '';
  };
}
