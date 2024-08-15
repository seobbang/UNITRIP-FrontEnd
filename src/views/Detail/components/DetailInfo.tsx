import { css } from '@emotion/react';

import { COLORS, FONTS } from '@/styles/constants';

const InfoContents = [
  {
    title: '휴무일',
    content: '연중무휴',
  },
  {
    title: '이용시간',
    content: '주중 10:30~22:30 (매표마감 21:30)',
  },
  {
    title: '이용요금',
    content: '-',
  },
];

function DetailInfo() {
  return (
    <section css={detailInfoContainer}>
      {InfoContents.map((item) => (
        <div css={infoItem} key={item.title}>
          <span css={title}>{item.title}</span>
          <p css={content}>{item.content}</p>
        </div>
      ))}
    </section>
  );
}

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
