import { css } from '@emotion/react';

import { EmptyPhotoIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

const EmptyPhoto = () => {
  return (
    <div css={emptyPhotoContainer}>
      <EmptyPhotoIcon />
      <span css={text('main')}>아직 사진이 없어요</span>
      <p css={text('sub')}>
        해당 장소에 대해 더 알고 싶으신가요?
        <br />
        새로운 사진 등록을 요청해주세요!
      </p>
    </div>
  );
};

export default EmptyPhoto;

const emptyPhotoContainer = css`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  margin: 2.4rem 0;
`;

const text = (variant: string) => css`
  margin: ${variant === 'main' && '2rem 0 0.8rem 0'};

  color: ${COLORS.brand1};
  text-align: center;

  ${variant === 'main' ? FONTS.Body1 : FONTS.Small1};
`;
