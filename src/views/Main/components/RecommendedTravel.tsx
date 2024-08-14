import { css } from '@emotion/react';

import { COLORS, FONTS } from '@/styles/constants';

import { cardContainer, scrollContainer } from '../styles/main';
import ReviewCard from './ReviewCard';

const RecommendedTravel = () => {
  return (
    <section css={sectionCss}>
      <h3 css={subTitle}>믿고 보는 유니트립 리뷰</h3>
      <h2 css={title}>유니트립 추천 여행지 🏖️</h2>

      <div css={scrollContainer}>
        <li css={cardContainer}>
          <ReviewCard
            name="대전 오월드"
            score="4.9"
            content="앱에서 보았던 것과 같이 작품마다 점자안내판으로 설명이 있어 시각장애인도 불편하지 않게 관람이 가능했어요. 오디오 가이드 대여 서비스도 제공하니 필요하신 분들은 꼭 대여해서 쓰세요!! 시설이 너무... "
            reviewCount="391"
          />
          <ReviewCard
            name="대전 오월드"
            score="4.9"
            content="앱에서 보았던 것과 같이 작품마다 점자안내판으로 설명이 있어 시각장애인도 불편하지 않게 관람이 가능했어요. 오디오 가이드 대여 서비스도 제공하니 필요하신 분들은 꼭 대여해서 쓰세요!! 시설이 너무... "
            reviewCount="391"
          />
          <ReviewCard
            name="대전 오월드"
            score="4.9"
            content="앱에서 보았던 것과 같이 작품마다 점자안내판으로 설명이 있어 시각장애인도 불편하지 않게 관람이 가능했어요. 오디오 가이드 대여 서비스도 제공하니 필요하신 분들은 꼭 대여해서 쓰세요!! 시설이 너무... "
            reviewCount="391"
          />
        </li>
      </div>
    </section>
  );
};

export default RecommendedTravel;

const sectionCss = css`
  padding-top: 3.2rem;
  margin-bottom: 14.6rem;
`;

const subTitle = css`
  margin: 0 0 0 2rem;

  color: ${COLORS.gray7};
  ${FONTS.Body2};
`;
const title = css`
  margin-left: 2rem;

  color: ${COLORS.gray9};
  ${FONTS.H4};
`;
