import { css } from '@emotion/react';
import { Link, useParams } from 'react-router-dom';

import { NoReviewIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

const NoReview = () => {
  const { contentId } = useParams();

  return (
    <div css={containerCss}>
      <NoReviewIcon />
      <div css={titleCss}>아직 리뷰가 없어요</div>
      <p css={descriptionCss}>
        해당 장소에 대해 알고 계시나요?
        <br /> 새롭게 리뷰를 작성해 주세요!
      </p>

      <Link to={`/${contentId}/review/write`} css={buttonCss}>
        리뷰 작성하기
      </Link>
    </div>
  );
};

export default NoReview;

const containerCss = css`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-top: 2.4rem;
`;

const titleCss = css`
  margin: 2rem 0 0.8rem;

  color: ${COLORS.gray9};
  ${FONTS.Body2}
`;

const descriptionCss = css`
  color: ${COLORS.brand1};
  text-align: center;
  ${FONTS.Small1}
`;

const buttonCss = css`
  padding: 0.8rem 1.6rem;
  margin: 2.4rem 0;
  border-radius: 1rem;

  background-color: ${COLORS.brand1};

  color: ${COLORS.white};
  ${FONTS.Body3};
`;
