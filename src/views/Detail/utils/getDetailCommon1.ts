import { getDetailCommon1 } from '@/apis/public/detailCommon1';

export const getDetailCommonRes = async (contentId: number) => {
  try {
    const response = await getDetailCommon1({
      numOfRows: 20,
      pageNo: 1,
      MobileOS: 'ETC',
      contentId: contentId,
      defaultYN: 'Y',
      firstImageYN: 'Y',
      addrinfoYN: 'Y',
      mapinfoYN: 'Y',
    });

    return response;
  } catch (err) {
    console.error('공통정보조회 api 에러', err);
  }
};
