import { css } from '@emotion/react';

import { BigInfoIcon } from '@/assets/icon';
import { DefaultImage } from '@/assets/image';
import PlaceCard from '@/components/PlaceCard';
import { MAP_FACILITIES_API_KEY } from '@/constants/facilities';
import { COLORS, FONTS } from '@/styles/constants';
import { SearchItem } from '@/types/search';

import { getFilterList } from '../../constants/category';
import { FilterFacilities, filterState } from '../../types/category';

const NoResultView = () => (
  <div css={noResultContainerCss}>
    <BigInfoIcon />
    <div css={noResultTitleCss}>검색 결과가 없어요</div>
    <p css={noResultInfoCss}>
      검색 필터를 바꾸거나
      <br />
      다른 여행지를 검색해보세요!
    </p>
  </div>
);

interface RenderResultProps {
  filterState: filterState;
  heartList: number[];
  filterIndexInfo: Record<FilterFacilities, string[]>;
  placeList: Record<string, SearchItem>;
  loading: boolean;
}

const RenderResult = (props: RenderResultProps) => {
  const { filterState, filterIndexInfo, placeList, loading, heartList } = props;

  const filterList = getFilterList(filterState);
  const renderPlaceList =
    filterList.length > 0
      ? Array.from(
          filterList.reduce((acc, filter, idx) => {
            if (idx === 0) return acc;
            const curSet = new Set(
              filterIndexInfo[MAP_FACILITIES_API_KEY[filter]],
            );
            return new Set([...acc].filter((item) => curSet.has(item)));
          }, new Set(filterIndexInfo[MAP_FACILITIES_API_KEY[filterList[0]]])),
        )
      : Object.keys(placeList);

  if (!loading && renderPlaceList.length === 0) return <NoResultView />;

  return renderPlaceList.map((contentid, idx) => {
    const { title, addr1, addr2, firstimage, firstimage2 } =
      placeList[contentid];
    return (
      <li key={contentid}>
        <PlaceCard
          idx={idx}
          contentid={contentid}
          placeName={title}
          address={addr1 + addr2}
          imgSrc={firstimage || firstimage2 || DefaultImage}
          isHeart={heartList.includes(Number(contentid))}
          buttonDisabled
        />
      </li>
    );
  });
};

export default RenderResult;

const noResultContainerCss = css`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin: 6rem 0 1.2rem;
`;

const noResultTitleCss = css`
  margin: 2rem 0 0.8rem;

  color: ${COLORS.gray9};
  text-align: center;

  ${FONTS.Body2};
`;

const noResultInfoCss = css`
  color: ${COLORS.brand1};
  text-align: center;
  ${FONTS.Small1};
`;
