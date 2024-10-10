import { css } from '@emotion/react';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import { BigInfoIcon } from '@/assets/icon';
import { DefaultImage } from '@/assets/image';
import Loading from '@/components/Loading';
import PlaceCard from '@/components/PlaceCard';
import { MAP_FACILITIES_API_KEY } from '@/constants/facilities';
import { COLORS, FONTS } from '@/styles/constants';
import { BarrierFreeItem, SearchItem } from '@/types/search';

import { getFilterList } from '../../constants/category';
import { filterState } from '../../types/category';

interface SearchResultProps {
  placeData: (SearchItem & BarrierFreeItem)[];
  targetElement: MutableRefObject<HTMLDivElement | null>;
  loading: boolean;
  filterState: filterState;
  heartList: number[];
}

const SearchResult = (props: SearchResultProps) => {
  const { placeData, targetElement, loading, filterState, heartList } = props;
  const placeListRef = useRef<HTMLUListElement>(null);

  const [renderPlaceList, setRenderPlaceList] = useState<
    (SearchItem & BarrierFreeItem)[]
  >([]);

  useEffect(() => {
    const filterList = getFilterList(filterState);
    const renderPlaceList = placeData.filter((placeInfo) => {
      return filterList.every(
        (facility) => placeInfo[MAP_FACILITIES_API_KEY[facility]] !== '',
      );
    });
    setRenderPlaceList(renderPlaceList);
  }, [filterState, placeData]);

  return (
    <>
      <ul css={containerCss(placeData.length)} ref={placeListRef}>
        {!loading && renderPlaceList.length === 0 ? (
          <div css={noResultContainerCss}>
            <BigInfoIcon />
            <div css={noResultTitleCss}>검색 결과가 없어요</div>
            <p css={noResultInfoCss}>
              검색 필터를 바꾸거나
              <br />
              다른 여행지를 검색해보세요!
            </p>
          </div>
        ) : (
          renderPlaceList.map(
            ({ contentid, title, addr1, addr2, firstimage, firstimage2 }) => {
              return (
                <li key={contentid}>
                  <PlaceCard
                    contentid={contentid}
                    placeName={title}
                    address={addr1 + addr2}
                    imgSrc={firstimage || firstimage2 || DefaultImage}
                    isHeart={heartList.includes(Number(contentid))}
                    buttonDisabled
                  />
                </li>
              );
            },
          )
        )}
        <div ref={targetElement} css={lastTargetCss} />
        {loading && placeData.length > 0 && <Loading />}
      </ul>
    </>
  );
};

export default SearchResult;

const containerCss = (placeLength: number) => css`
  display: flex;
  gap: 1.2rem;
  flex-direction: column;

  height: ${placeLength > 0 ? 'calc(100vh - 11rem)' : 'fit-content'};
  padding: 1.6rem 2rem 0;
  padding-bottom: 7rem;
  overflow-y: scroll;
`;

const lastTargetCss = css`
  width: 100%;
  height: 1px;
`;

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
