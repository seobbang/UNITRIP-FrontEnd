import { css } from '@emotion/react';

import { ShieldCheckMonoIcon, Star1Icon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

interface ReviewCardProps {
  name: string;
  score: number;
  thumbnail: string;
  content: string;
  reviewCount: number;
}

const ReviewCard = (props: ReviewCardProps) => {
  const { name, score, thumbnail, content, reviewCount } = props;

  return (
    <ul css={card}>
      <div css={imgContainerCss}>
        <img css={placeImg} src={thumbnail} alt={`${name} 장소 사진`} />
        <div css={placeName}>
          <ShieldCheckMonoIcon />
          <p css={placeNameCss}>{name}</p>
        </div>
      </div>

      <div css={reviewBox}>
        <p css={scoreText}>
          <Star1Icon />
          {score.toFixed(1)}
        </p>
        <p css={contentText}>{content}</p>
        <p css={reviewCountText}>리뷰 {reviewCount}</p>
      </div>
    </ul>
  );
};

export default ReviewCard;

const imgContainerCss = css`
  position: relative;
`;

const placeNameCss = css`
  padding-top: 0.2rem;
`;

const card = css`
  display: flex;
  flex-direction: column;

  width: 24rem;
  height: 30rem;
  border-radius: 1.2rem;

  background-color: ${COLORS.gray0};
`;

const placeImg = css`
  height: 16.4rem;

  border-top-left-radius: 1.2rem;
  border-top-right-radius: 1.2rem;
`;

const placeName = css`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  position: absolute;
  top: 12.5rem;
  left: 1.2rem;

  padding: 0.4rem 0.8rem;
  border-radius: 1rem;

  background-color: rgb(23 23 23 / 56%);

  color: ${COLORS.white};
  ${FONTS.Small2};
`;

const reviewBox = css`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
`;

const scoreText = css`
  display: flex;
  gap: 0.4rem;

  margin-top: 1.2rem;

  color: ${COLORS.gray9};
  ${FONTS.Body1};
`;

const contentText = css`
  display: -webkit-box;
  overflow: hidden;

  width: 24rem;
  padding: 0 2rem;
  margin: 1rem 0;

  color: ${COLORS.gray7};

  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  ${FONTS.Body3};
`;

const reviewCountText = css`
  color: ${COLORS.gray4};
  ${FONTS.Small1};
`;
