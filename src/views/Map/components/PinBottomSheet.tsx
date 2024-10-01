import { css } from '@emotion/react';

import BottomSheet from '@/components/BottomSheet';

import BottomSheetContent from './BottomSheetContent';

interface PinBottomSheetProps {
  title: string;
  address: string;
  image: string;
  contentId: string;
  closeBottomSheet: () => void;
}

/** 핀 클릭시 보여지는 바텀시트 */
const PinBottomSheet = (props: PinBottomSheetProps) => {
  const { title, address, image, contentId, closeBottomSheet } = props;

  return (
    <BottomSheet
      closeBottomSheet={closeBottomSheet}
      height={'22.8rem'}
      noButton
      bottomSheetCss={css`
        padding: 4rem 1.7rem 10.5rem;
      `}
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
  );
};

export default PinBottomSheet;
