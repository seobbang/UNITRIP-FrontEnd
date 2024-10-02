import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import { HeartFillMonoIcon, PinLocationMonoIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

interface TravelCardProps {
  contentid: string;
  name: string;
  address: string;
  imgUrl: string;
  isHeart: boolean;
}

const TravelCard = (props: TravelCardProps) => {
  const { contentid, name, address, imgUrl, isHeart } = props;

  return (
    <Link to={`/${contentid}`} css={card(imgUrl)}>
      <div css={background}>
        <div css={heart}>{isHeart && <HeartFillMonoIcon />}</div>
        <p css={nameCss}>{name}</p>
        <div css={addressContainer}>
          <PinLocationMonoIcon />
          <address css={locationCss}>{address}</address>
        </div>
      </div>
    </Link>
  );
};

export default TravelCard;

const card = (imgUrl: string) => css`
  position: relative;

  height: 24.8rem;
  border-radius: 1.2rem;

  background-color: ${COLORS.gray4};
  background-position: center center;
  background-size: cover;
  background-image: url(${imgUrl});

  min-width: 23.2rem;
`;

const background = css`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;

  min-width: 23.2rem;
  max-width: 23.2rem;

  height: 24.8rem;
  padding: 1.6rem;
  border-radius: 1.2rem;

  background: linear-gradient(
    180deg,
    rgb(0 0 0 / 0%) 0%,
    rgb(0 0 0 / 34%) 100%
  );
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
  overflow: hidden;

  color: ${COLORS.white};
  white-space: nowrap;
  text-overflow: ellipsis;

  ${FONTS.Small2};
`;

const addressContainer = css`
  display: flex;
  gap: 0.3rem;
  align-items: center;

  margin-top: 0.2rem;
`;
