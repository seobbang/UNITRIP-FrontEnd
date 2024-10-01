import { css } from '@emotion/react';

import { COLORS, FONTS } from '@/styles/constants';

import { detailInfoType } from '../pages/DetailPage';

interface detailInfoProps {
  detailInfo: detailInfoType;
}

const DetailInfo = (props: detailInfoProps) => {
  const { detailInfo } = props;

  return (
    <section css={detailInfoContainer}>
      <div css={infoItem}>
        <span css={title}>휴무일</span>
        <span
          css={content}
          dangerouslySetInnerHTML={{ __html: detailInfo.restDate }}></span>
      </div>
      <div css={infoItem}>
        <span css={title}>이용시간</span>
        <span
          dangerouslySetInnerHTML={{ __html: detailInfo.useTime }}
          css={content}></span>
      </div>
      <div css={infoItem}>
        <span css={title}>이용요금</span>
        <span
          dangerouslySetInnerHTML={{ __html: detailInfo.useFee }}
          css={content}></span>
      </div>
    </section>
  );
};

export default DetailInfo;

const detailInfoContainer = css`
  display: flex;
  gap: 2.4rem;
  flex-direction: column;

  width: 100%;
  padding: 1.7rem 2rem 2.9rem;
`;

const infoItem = css`
  display: flex;
  gap: 1.2rem;
  flex-direction: column;
`;

const title = css`
  color: ${COLORS.brand1};

  ${FONTS.H4};
`;

const content = css`
  color: ${COLORS.gray8};

  ${FONTS.Body5};
`;
