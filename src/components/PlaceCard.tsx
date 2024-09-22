import { css } from '@emotion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  HeartFillMonoIcon,
  HeartMonoIcon,
  PinLocationMonoIcon,
} from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

interface PlaceCardProps {
  placeName: string;
  address: string;
  imgSrc: string;
  onClickHeart?: () => void;
}

/**
 * @param placeName 장소 이름
 * @param address 주소
 * @param imgSrc 대표 사진
 * @param onClickHeart 하트 눌렀을 때 실행 함수
 */

const PlaceCard = (props: PlaceCardProps) => {
  const { placeName, address, imgSrc, onClickHeart = () => {} } = props;

  const [isHeart, setIsHeart] = useState(false);

  const handleOnClick = () => {
    setIsHeart((prev) => !prev);
    onClickHeart();
  };

  return (
    <Link to="" css={cardContainerCss(imgSrc, placeName)}>
      <div css={backgroundCss}>
        <button type="button" onClick={handleOnClick} css={iconCss}>
          {isHeart ? <HeartFillMonoIcon /> : <HeartMonoIcon />}
        </button>
        <p css={titleCss}>{placeName}</p>
        {address && (
          <p css={addressCss}>
            <PinLocationMonoIcon /> <span>{address}</span>
          </p>
        )}
      </div>
    </Link>
  );
};

export default PlaceCard;

const cardContainerCss = (imgSrc: string, placeName: string) => css`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  height: 16.8rem;
  border-radius: 1.2rem;

  background-image: url(${imgSrc});
  background-size: cover;
  background-position: center center;
  background-color: ${placeName ? COLORS.gray4 : COLORS.gray2};
`;

const backgroundCss = css`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 16.8rem;
  border-radius: 1.2rem;

  color: ${COLORS.white};

  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.34) 100%
  );
`;

const titleCss = css`
  margin: 9.4rem 0 0 1.6rem;
  ${FONTS.H3};

  width: calc(100% - 1.6rem);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
