import { css } from '@emotion/react';

import BottomSheet from '@/components/BottomSheet';
import EmptyFavList from '@/components/EmptyFavList';
import { COLORS, FONTS } from '@/styles/constants';

import BottomSheetContent from './BottomSheetContent';

interface favoriteListProps {
  favoriteList: {
    title: string;
    address: string;
    image: string;
    contentId: string;
  }[];
  closeBottomSheet: () => void;
}

const FavoriteBottomSheet = (props: favoriteListProps) => {
  const { favoriteList, closeBottomSheet } = props;

  return (
    <BottomSheet
      closeBottomSheet={closeBottomSheet}
      height={'37rem'}
      noButton
      bottomSheetCss={css`
        padding: 3.4rem 2rem 8.9rem;
      `}
      sheetBackgroundCss={css`
        background-color: transparent;
      `}>
      <h1 css={text}>저장한 여행지 목록</h1>
      <div css={contentCss}>
        {favoriteList.length !== 0 ? (
          favoriteList.map((content) => {
            return (
              <div key={content.contentId}>
                <BottomSheetContent
                  title={content.title}
                  address={content.address}
                  image={content.image}
                  contentId={content.contentId}
                />
              </div>
            );
          })
        ) : (
          <div css={emptyContainer}>
            <EmptyFavList />
          </div>
        )}
      </div>
    </BottomSheet>
  );
};

export default FavoriteBottomSheet;

const text = css`
  margin-bottom: 1.6rem;

  color: ${COLORS.brand1};

  ${FONTS.H4};
`;

const contentCss = css`
  display: flex;
  gap: 2.4rem;
  flex-direction: column;

  width: 100%;
  height: 20rem;
  overflow-y: scroll;
`;

const emptyContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 20rem;
`;
