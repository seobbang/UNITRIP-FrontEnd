import { css } from '@emotion/react';

import { StarGrayIcon, StarIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';
import { ReviewResponse } from '@/types/api/review';

interface TotalScoreProps {
  reviewData: ReviewResponse[];
}

const TotalScore = (props: TotalScoreProps) => {
  const { reviewData } = props;

  const averageScore =
    reviewData.reduce((acc, cur) => acc + cur.rate, 0) / reviewData.length;

  const renderStar = () => {
    const starEl = [];
    const fillStarCount = Math.floor(averageScore);
    for (let i = 0; i < fillStarCount; i++) {
      starEl.push(<StarIcon key={i} />);
    }
    for (let i = 0; i < 5 - fillStarCount; i++) {
      starEl.push(<StarGrayIcon key={5 - i} />);
    }
    return starEl;
  };
  return (
    <div css={containerCss}>
      <div css={starContainerCss}>{renderStar()}</div>
      <div css={scoreContainerCss}>
        {Math.round(averageScore * 10) / 10} <span>/ 5.0</span>
      </div>
    </div>
  );
};

export default TotalScore;

const containerCss = css`
  display: flex;
  gap: 3.2rem;

  margin: 1.5rem 0 1.5rem 2rem;
`;

const starContainerCss = css`
  display: flex;
  gap: 0.3rem;
  align-items: center;

  & > svg {
    width: 2.2rem;
    height: 2.2rem;
  }
`;

const scoreContainerCss = css`
  display: flex;
  gap: 1.2rem;

  ${FONTS.H4};

  & > span {
    color: ${COLORS.gray3};
  }
`;
