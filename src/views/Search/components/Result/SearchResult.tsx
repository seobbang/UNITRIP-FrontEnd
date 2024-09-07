import { css } from '@emotion/react';

import PlaceCard from '@/components/PlaceCard';

const SearchResult = () => {
  return (
    <ul css={containerCss}>
      <li>
        <PlaceCard
          placeName="대전시립미술관"
          address="대전 서구 둔산대로 155"
        />
      </li>
      <li>
        <PlaceCard
          placeName="대전시립미술관"
          address="대전 서구 둔산대로 155"
        />
      </li>
      <li>
        <PlaceCard
          placeName="대전시립미술관"
          address="대전 서구 둔산대로 155"
        />
      </li>
      <li>
        <PlaceCard
          placeName="대전시립미술관"
          address="대전 서구 둔산대로 155"
        />
      </li>
    </ul>
  );
};

export default SearchResult;

const containerCss = css`
  display: flex;
  gap: 1.2rem;
  flex-direction: column;

  height: calc(100vh - 11rem);
  overflow-y: scroll;

  padding: 1.6rem 2rem 0;
`;
