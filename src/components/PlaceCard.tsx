import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import { HeartMonoIcon, PinLocationMonoIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

interface PlaceCardProps {
  placeName: string;
  address: string;
}

/**
 * @param placeName 장소 이름
 * @param address 주소
 */

const PlaceCard = (props: PlaceCardProps) => {
  const { placeName, address } = props;
  return (
    <Link to="" css={cardContainerCss}>
      <button type="button">
        <HeartMonoIcon css={iconCss} />
      </button>
      <p css={titleCss}>{placeName}</p>
      <p css={addressCss}>
        <PinLocationMonoIcon /> <span>{address}</span>
      </p>
    </Link>
  );
};

export default PlaceCard;

const cardContainerCss = css`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  height: 16.8rem;
  border-radius: 1.2rem;

  background-color: gray;

  color: ${COLORS.white};
`;

const titleCss = css`
  margin: 9.4rem 0 0 1.6rem;
  ${FONTS.H3};

  text-align: left;
`;

const addressCss = css`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  margin-left: 1.6rem;

  ${FONTS.Small1};

  & > span {
    padding-top: 0.1rem;
  }
`;

const iconCss = css`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
`;
