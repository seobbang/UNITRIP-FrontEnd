import { css } from '@emotion/react';
import _ from 'lodash';
import { memo, MutableRefObject, useRef, useState } from 'react';

import { getBarrierFreeInfo, getSearchKeyword } from '@/apis/public/search';
import Loading from '@/components/Loading';
import PageLoading from '@/components/PageLoading';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { SearchItem } from '@/types/search';

import { INITIAL_FILTER_INDEX_INFO } from '../../constants/category';
import { FilterFacilities, filterState } from '../../types/category';
import RenderResult from './RenderResult';

interface ResultContainerProps {
  searchWord: string;
  filterState: filterState;
  heartList: number[];
}

const ResultContainer = memo((props: ResultContainerProps) => {
  const { searchWord, ...restProps } = props;

  const [loading, setLoading] = useState(false);

  const [placeList, setPlaceList] = useState<Record<string, SearchItem>>({});
  const [filterIndexInfo, setFilterIndexInfo] = useState<
    Record<FilterFacilities, string[]>
  >(_.cloneDeep(INITIAL_FILTER_INDEX_INFO));

  const placeListRef = useRef<HTMLUListElement>(null);

  // 무한스크롤
  const handleObserver = async (
    observer: IntersectionObserver,
    target: MutableRefObject<HTMLElement | null>,
    page: MutableRefObject<number>,
  ) => {
    setLoading(true);
    const pageNo = page.current;

    try {
      const items = await getSearchKeyword({
        pageNo,
        numOfRows: 50,
        MobileOS: 'ETC',
        keyword: searchWord || '',
        contentTypeId: 14,
      });

      if (items === '') {
        if (pageNo === 0) {
          setPlaceList({});
        }
        target.current && observer.unobserve(target.current);
      } else {
        const newPlaceList = items.item.reduce(
          (acc, item) => {
            acc[item.contentid] = item;
            return acc;
          },
          {} as Record<string, SearchItem>,
        );

        const promises = items.item.map(({ contentid }) =>
          getBarrierFreeInfo({
            MobileOS: 'ETC',
            contentId: Number(contentid),
          }),
        );
        const promiseResult = await Promise.allSettled(promises);

        const updatedFilterIndexInfo = { ...filterIndexInfo };

        promiseResult.forEach((result) => {
          if (result.status === 'fulfilled' && result.value !== '') {
            const item = result.value.item[0];
            const contentid = item.contentid;

            Object.entries(item).forEach(([facility, value]) => {
              if (facility !== 'contentid' && value !== '') {
                updatedFilterIndexInfo[facility as FilterFacilities].push(
                  contentid,
                );
              }
            });
          }
        });
        setFilterIndexInfo(updatedFilterIndexInfo);
        setPlaceList((prev) => ({ ...prev, ...newPlaceList }));

        page.current++;
      }
    } finally {
      setLoading(false);
    }
  };

  const targetElement = useInfiniteScroll({
    handleObserver,
    deps: [],
  });

  return (
    <>
      {/* 최초 로딩 */}
      {loading && Object.keys(placeList).length === 0 && <PageLoading />}

      <ul css={containerCss(Object.keys(placeList).length)} ref={placeListRef}>
        <RenderResult
          loading={loading}
          filterIndexInfo={filterIndexInfo}
          placeList={placeList}
          {...restProps}
        />
        <div ref={targetElement} css={lastTargetCss(loading)} />

        {/* 무한스크롤 로딩 */}
        {loading && Object.keys(placeList).length > 0 && <Loading />}
      </ul>
    </>
  );
});

ResultContainer.displayName = 'ResultContainer';

export default ResultContainer;

const containerCss = (placeLength: number) => css`
  display: flex;
  gap: 1.2rem;
  flex-direction: column;

  height: ${placeLength > 0 ? 'calc(100vh - 11rem)' : 'fit-content'};
  padding: 1.6rem 2rem 0;
  padding-bottom: 7rem;
  overflow-y: scroll;
`;

const lastTargetCss = (loading: boolean) => css`
  position: ${loading ? 'fixed' : 'static'};
  bottom: ${loading ? '-10px' : ''};

  width: 100%;
  height: 1px;
`;
