import { getDetailImage1 } from '@/apis/public/detailImage1';

export const getDetailImage1Res = async (contentId: number) => {
  try {
    const response = await getDetailImage1({
      numOfRows: 20,
      pageNo: 1,
      MobileOS: 'ETC',
      contentId: contentId,
      imageYN: 'Y',
      subImageYN: 'Y',
    });

    return response;
  } catch (err) {
    console.error('이미지정보조회 api 에러', err);
  }
};
