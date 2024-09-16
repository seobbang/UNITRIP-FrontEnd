import { css } from '@emotion/react';

import PlaceCard from '@/components/PlaceCard';

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
  return (
    <ul css={listContainer}>
      {FAVORITE_SAMPLE.map((item) => (
        <li key={item.name} css={itemContainer}>
          <PlaceCard placeName={item.name} address={item.address} />
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
