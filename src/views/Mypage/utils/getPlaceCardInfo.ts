import { getDetailCommon1 } from '@/apis/public/detailCommon1';

export interface cardInfoType {
  title: string;
  address: string;
  image: string;
  contentId: string;
}

export const getDetailInfo = async (contentIdList: number[]) => {
  const cardInfo: cardInfoType[] = [];

  const promises = contentIdList.map(async (id) => {
    const response = await getDetailCommon1({
      numOfRows: 20,
      pageNo: 1,
      MobileOS: 'ETC',
      contentId: Number(id),
      defaultYN: 'Y',
      firstImageYN: 'Y',
      addrinfoYN: 'Y',
      mapinfoYN: 'Y',
    });

    if (response) {
      cardInfo.push({
        title: response.item[0].title,
        address: response.item[0].addr1,
        image: response.item[0].firstimage,
        contentId: response.item[0].contentid,
      });
    }
  });

  await Promise.all(promises);

  if (cardInfo.length !== 0) {
    return { cardInfo };
  }
};
