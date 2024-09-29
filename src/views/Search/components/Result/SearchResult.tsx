import { css } from '@emotion/react';
import { MutableRefObject } from 'react';

import { BigInfoIcon } from '@/assets/icon';
import PlaceCard from '@/components/PlaceCard';
import { COLORS, FONTS } from '@/styles/constants';
import { SearchItem } from '@/types/search';

interface SearchResultProps {
  placeList: SearchItem[];
  targetElement: MutableRefObject<HTMLDivElement | null>;
  loading: boolean;
}

const SearchResult = (props: SearchResultProps) => {
  const { placeList, targetElement, loading } = props;
  console.log(loading);

  const renderPlaceList = () => {
    if (placeList.length === 0) {
      return (
        <>
          <div css={noResultContainerCss}>
            <BigInfoIcon />
            <div css={noResultTitleCss}>검색 결과가 없어요</div>
            <p css={noResultInfoCss}>
              검색 필터를 바꾸거나
              <br />
              다른 여행지를 검색해보세요!
            </p>
          </div>
        </>
      );
    } else {
      return placeList.map(
        ({ contentid, title, addr1, addr2, firstimage, firstimage2 }) => {
          return (
            <li key={contentid}>
              <PlaceCard
                placeName={title}
                address={addr1 + addr2}
                imgSrc={firstimage || firstimage2 || ''}
                onClickHeart={() => {}}
              />
            </li>
          );
        },
      );
    }
  };

  return (
    <>
      <ul css={containerCss(placeList.length)}>
        {renderPlaceList()}
        <div ref={targetElement} css={lastTargetCss} />

        {placeList.length >= 10 && (
          <>
            <li>
              <PlaceCard placeName={''} address={''} imgSrc={''} />
            </li>
            <li>
              <PlaceCard placeName={''} address={''} imgSrc={''} />
            </li>
            <li>
              <PlaceCard placeName={''} address={''} imgSrc={''} />
            </li>
            <li>
              <PlaceCard placeName={''} address={''} imgSrc={''} />
            </li>
          </>
        )}
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
  overflow-y: scroll;

  padding: 1.6rem 2rem 0;
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
