import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';

import { SmallStarIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';
import { ReviewResponse } from '@/types/api/review';

const ReviewCard = (props: ReviewResponse) => {
  const {
    rate,
    description,
    convenience,
    imgUrls,
    USER: { name },
    date,
  } = props;

  const [showAll, setShowAll] = useState(false);
  const [isMoreButton, setIsMoreButton] = useState(false);

  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      descriptionRef.current &&
      descriptionRef.current?.scrollHeight >
        descriptionRef.current?.offsetHeight
    ) {
      setIsMoreButton(true);
    }
  }, []);

  return (
    <li css={containerCss}>
      <div css={contentContainerCss}>
        <div css={headerCss}>
          <span css={authorCss}>
            {name[0] + '*' + (name.substring(2) || '')}
          </span>
          <div css={startContainerCss}>
            <SmallStarIcon /> {rate}
          </div>
        </div>
        <div css={categoryCss}>{convenience.join(' | ')}</div>

        <div css={contentCss(showAll)} ref={descriptionRef}>
          {description}
          {isMoreButton && !showAll && (
            <div css={moreContentCss}>
              <div>...</div>
              <button
                css={moreContentButtonCss}
                onClick={() => setShowAll(true)}>
                더보기
              </button>
            </div>
          )}
        </div>
      </div>

      <div css={imgContainerCss}>
        {imgUrls.map((imgUrls) => (
          <img key={imgUrls} src={imgUrls} css={imgCss} />
        ))}
      </div>

      <div css={dateCss}>{date}</div>
    </li>
  );
};

export default ReviewCard;

const imgCss = css`
  object-fit: cover;
`;

const containerCss = css`
  padding-bottom: 2rem;
  border: 1px solid rgb(245 245 245 / 50%);
  border-radius: 2rem;

  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 4%);
`;

const contentContainerCss = css`
  padding: 2rem;
`;

const authorCss = css`
  color: ${COLORS.brand1};
  ${FONTS.Body1};
`;

const startContainerCss = css`
  display: flex;
  gap: 0.4rem;
  align-items: center;

  color: ${COLORS.brand1};
  ${FONTS.Small1};
`;

const headerCss = css`
  display: flex;
  justify-content: space-between;
`;

const categoryCss = css`
  margin-top: 0.4rem;

  color: ${COLORS.brand1};
  ${FONTS.Body2};
`;

const contentCss = (showAll: boolean) => css`
  display: -webkit-box;
  position: relative;
  word-wrap: break-word;
  -webkit-line-clamp: ${showAll ? 'none' : 4};
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;

  overflow: hidden;

  word-break: keep-all;

  margin-top: 1.6rem;

  color: ${COLORS.brand1};
  ${FONTS.Body5};
`;

const imgContainerCss = css`
  display: flex;
  gap: 0.5rem;
  overflow: auto;

  width: 100%;
  padding: 0 2rem;

  & > img {
    width: 12.3rem;
    height: 12.3rem;
    border-radius: 1.1rem;
  }
`;

const dateCss = css`
  margin: 1.6rem 0 0 2rem;

  color: ${COLORS.gray4};
  font-family: 'Apple SD Gothic Neo', sans-serif;
  font-style: normal;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 140%;
`;

const moreContentCss = css`
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;

  padding-left: 20px;

  background: linear-gradient(
    90deg,
    rgb(255 255 255 / 0%) 0%,
    rgb(255 255 255 / 100%) 18%
  );

  color: ${COLORS.brand1};
  ${FONTS.Body5};
`;

const moreContentButtonCss = css`
  text-decoration: underline;
`;
