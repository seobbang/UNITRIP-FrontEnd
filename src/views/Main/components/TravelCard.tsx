import { css } from '@emotion/react';

import { HeartMonoIcon, PinLocationMonoIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

interface TravelCardProps {
  name: string;
  address: string;
}

const TravelCard = (props: TravelCardProps) => {
  const { name, address } = props;
  return (
    <ul css={card}>
      <button css={heart} onClick={() => {}}>
        <HeartMonoIcon />
      </button>
      <p css={nameCss}>{name}</p>
      <div css={addressContainer}>
        <PinLocationMonoIcon />
        <address css={locationCss}>{address}</address>
      </div>
    </ul>
  );
};

export default TravelCard;

const card = css`
  display: flex;
  flex-direction: column;

  width: 21.2rem;
  height: 24.8rem;
  padding: 1.6rem;
  border-radius: 1.2rem;

  background-color: ${COLORS.brand1};
`;

const heart = css`
  margin-left: auto;
`;

const nameCss = css`
  margin-top: auto;

  color: ${COLORS.white};
  ${FONTS.H4};
`;

const locationCss = css`
  color: ${COLORS.white};
  ${FONTS.Small2};
`;

const addressContainer = css`
  display: flex;
  gap: 0.3rem;
`;
