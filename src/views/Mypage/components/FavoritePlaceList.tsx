import { css } from '@emotion/react';
import { useState } from 'react';

import PlaceCard from '@/components/PlaceCard';
import { useAsyncEffect } from '@/hooks/use-async-effect';

import { cardInfoType, getDetailInfo } from '../utils/getPlaceCardInfo';

interface placeListProps {
  favoriteList: number[];
}

const FavoritePlaceList = (props: placeListProps) => {
  const { favoriteList } = props;
  const [cardInfoList, setCardInfoList] = useState<cardInfoType[]>([]);

  useAsyncEffect(async () => {
    const res = await getDetailInfo(favoriteList);
    if (res) {
      setCardInfoList(res.cardInfo);
    }
  }, []);

  return (
    <ul css={listContainer}>
      {cardInfoList.map((item) => (
        <li key={item.contentId} css={itemContainer}>
          <PlaceCard
            placeName={item.title}
            address={item.address}
            imgSrc={item.image}
            isHeart={favoriteList.includes(Number(item.contentId))}
            buttonDisabled
            contentid={item.contentId}
          />
        </li>
      ))}
    </ul>
  );
};

export default FavoritePlaceList;

const listContainer = css`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  flex-direction: column;

  width: 100%;
  overflow-y: scroll;

  padding: 2.8rem 2rem;
`;
const itemContainer = css`
  width: 100%;
`;
