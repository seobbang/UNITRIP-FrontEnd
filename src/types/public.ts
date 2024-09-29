export interface Response<T> {
  response: {
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
            item: T;
          }
        | '';
    };
  };
}
