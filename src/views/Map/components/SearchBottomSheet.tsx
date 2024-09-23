import { css } from '@emotion/react';

import BottomSheet from '@/components/BottomSheet';

import BottomSheetContent from './BottomSheetContent';

interface searchBottomSheetProps {
  title: string;
  address: string;
  image: string;
  contentId: string;
  closeBottomSheet: () => void;
}

/** 주변 여행지 검색 시 보여지는 바텀시트 */
const SearchBottomSheet = (props: searchBottomSheetProps) => {
  const { title, address, image, contentId, closeBottomSheet } = props;

  return (
    <div>
      <BottomSheet
        closeBottomSheet={closeBottomSheet}
        height={'22.8rem'}
        noButton
        sheetBackgroundCss={css`
          background-color: transparent;
        `}>
        <BottomSheetContent
          title={title}
          address={address}
          image={image}
          contentId={contentId}
        />
      </BottomSheet>
    </div>
  );
};

export default SearchBottomSheet;
