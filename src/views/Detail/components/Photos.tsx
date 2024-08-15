import { css } from '@emotion/react';

import {
  Sample01Image,
  Sample02Image,
  Sample03Image,
  Sample04Image,
  Sample05Image,
  Sample06Image,
  Sample07Image,
  Sample08Image,
  Sample09Image,
  Sample10Image,
  Sample11Image,
  Sample12Image,
} from '@/assets/image';

const SampleImage = [
  Sample01Image,
  Sample02Image,
  Sample03Image,
  Sample04Image,
  Sample05Image,
  Sample06Image,
  Sample07Image,
  Sample08Image,
  Sample09Image,
  Sample10Image,
  Sample11Image,
  Sample12Image,
];

const photoItem = css`
  position: absolute;

  width: 100%;
  height: 100%;
  border-radius: 1.1rem;
  object-fit: cover;
`;

function Photos() {
  return (
    <section css={photosContainer}>
      {SampleImage.map((item, idx) => {
        return (
          <div css={photoWrapper} key={idx}>
            <img src={item} alt="샘플이미지" css={photoItem} />
          </div>
        );
      })}
    </section>
  );
}

export default Photos;

const photosContainer = css`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(3, 1fr);

  width: 100%;
  padding: 1rem;

  place-items: center center;
`;

const photoWrapper = css`
  position: relative;

  width: 100%;

  &::after {
    content: '';

    display: block;

    padding-bottom: 100%;
  }
`;
