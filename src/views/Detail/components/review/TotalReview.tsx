import { css } from '@emotion/react';
import { Link, useParams } from 'react-router-dom';

import { PencilMonoIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

interface TotalReviewProps {
  reviewCount: number;
}

const TotalReview = (props: TotalReviewProps) => {
  const { reviewCount } = props;
  const { contentId } = useParams();

  return (
    <div css={containerCss}>
      <div css={reviewCountCss}>
        <span>리뷰</span>
        <span>{reviewCount}</span>
      </div>
      <Link to={`/${contentId}/review/write`}>
        <PencilMonoIcon />
      </Link>
    </div>
  );
};

export default TotalReview;

const containerCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 5.6rem;
  padding: 0 1.9rem;
  border-top: 1px solid ${COLORS.gray0};
  border-bottom: 1px solid ${COLORS.gray2};

  ${FONTS.H5};
`;

const reviewCountCss = css`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-start;
`;
