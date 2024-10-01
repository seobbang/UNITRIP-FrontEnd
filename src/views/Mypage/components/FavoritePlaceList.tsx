import { css } from '@emotion/react';

const FAVORITE_SAMPLE = [
  { name: '대전시립미술관', address: '대전 서구 둔산대로 155' },
  {
    name: '이응노 미술관',
    address: '대전 서구 둔산대로 117번지 157',
  },
  { name: '대전시립미술관', address: '대전 서구 둔산대로 155' },
  {
    name: '이응노 미술관',
    address: '대전 서구 둔산대로 117번지 157',
  },
];

function FavoritePlaceList() {
  // 서버에서 contentID 리스트 받아오기
  // 해당 리스트 가지고 map/getDetailCommon 돌려서 값 저장하기
  // placeCard 누르면 해당 장소 contentId를 가지고 detail 페이지로 라우팅

  return (
    <ul css={listContainer}>
      {FAVORITE_SAMPLE.map((item) => (
        <li key={item.name} css={itemContainer}>
          {/* <PlaceCard
            placeName={item.name}
            address={item.address}
            imgSrc={''}
            onClickHeart={() => console.log('click')}
          /> */}
        </li>
      ))}
    </ul>
  );
}

export default FavoritePlaceList;

const listContainer = css`
  display: flex;
  gap: 2.2rem;
  align-items: center;
  flex-direction: column;

  width: 100%;
  padding: 2.8rem 0;
`;
const itemContainer = css`
  width: 100%;
`;
