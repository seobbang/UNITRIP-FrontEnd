import { css } from '@emotion/react';

import { MypageHeartIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

const EmptyFavList = () => {
  return (
    <div css={emptyContainer}>
      <MypageHeartIcon />
      <p css={emptyText}>
        아직 저장한 여행지가 없어요
        <br />
        유니트립 여행지를 더 둘러볼까요?
      </p>
    </div>
  );
};

export default EmptyFavList;

const emptyContainer = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const emptyText = css`
  padding: 1.6rem 0 2.8rem;

  color: ${COLORS.gray9};
  text-align: center;

  ${FONTS.Body4};
`;
