import { getLocationBasedList1 } from '@/apis/public/locationBasedList1';

import { mapType } from '../pages/MapPage';

export const getMapCenter = async (map: mapType | undefined) => {
  if (map) {
    try {
      const response = await getLocationBasedList1({
        pageNo: 1,
        numOfRows: 10,
        MobileOS: 'ETC',
        mapX: map.getCenter().La.toString(),
        mapY: map.getCenter().Ma.toString(),
        radius: '3000',
        contentTypeId: 12,
      });

      return response;
    } catch (err) {
      console.error('getMapCenter 에러 발생');
      throw err;
    }
  }
};
