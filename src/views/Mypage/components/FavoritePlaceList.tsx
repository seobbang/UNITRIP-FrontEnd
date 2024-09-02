import { css } from '@emotion/react';

import { HeartFilledIcon, PinLocationMonoIcon, StarIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

const FAVORITE_SAMPLE = [
  { name: '대전시립미술관', address: '대전 서구 둔산대로 155', rating: '4.53' },
  {
    name: '이응노 미술관',
    address: '대전 서구 둔산대로 117번지 157',
    rating: '4.41',
  },
  { name: '대전시립미술관', address: '대전 서구 둔산대로 155', rating: '4.53' },
  {
    name: '이응노 미술관',
    address: '대전 서구 둔산대로 117번지 157',
    rating: '4.41',
  },
];

function FavoritePlaceList() {
  return (
    <ul css={listContainer}>
      {FAVORITE_SAMPLE.map((item) => (
        <li key={item.name} css={itemContainer}>
          <section css={contentSection}>
            <span css={text('name')}>{item.name}</span>
            <HeartFilledIcon />
          </section>
          <section css={contentSection}>
            <div css={textWrapper('address')}>
              <PinLocationMonoIcon />
              <span css={text('address')}>{item.address}</span>
            </div>
            <div css={textWrapper('rating')}>
              <StarIcon />
              <span css={rating}>{item.rating}</span>
            </div>
          </section>
        </li>
      ))}
    </ul>
  );
}

export default FavoritePlaceList;

const listContainer = css`
  display: flex;
  gap: 2.2rem;
  align-items: center;
  flex-direction: column;

  padding-top: 2.8rem;
`;
const itemContainer = css`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  width: 100%;
  height: 14.7rem;
  padding: 1.6rem 1.3rem 1.5rem 2.2rem;
  border-radius: 1rem;

  background: linear-gradient(
    268.9deg,
    rgb(255 255 255 / 0%) -15.1%,
    rgb(0 0 0 / 65%) 97.69%
  );
  background-color: #5d9cf3;
`;

const contentSection = css`
  display: flex;
  justify-content: space-between;
`;

const textWrapper = (variant: string) => css`
  display: flex;
  gap: ${variant === 'address' ? '0.5rem' : '0.3rem'};
  align-items: center;
`;

const text = (variant: string) => css`
  color: ${COLORS.white};

  ${variant === 'name' ? FONTS.H3 : FONTS.Small1};
`;

const rating = css`
  color: ${COLORS.white};

  ${FONTS.Small2};
`;
