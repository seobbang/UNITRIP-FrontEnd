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
  isHeart: boolean;
  onClickHeart?: () => void;
  contentid: string;
  buttonDisabled?: boolean;
}

/**
 * @param placeName 장소 이름
 * @param address 주소
 * @param imgSrc 대표 사진
 * @param isHeart 하트 여부
 * @param onClickHeart 하트 눌렀을 때 실행 함수
 * @param contentid 컨텐츠 ID
 */

const PlaceCard = (props: PlaceCardProps) => {
  const {
    placeName,
    address,
    imgSrc,
    isHeart: isHeartData,
    onClickHeart = () => {},
    contentid,
    buttonDisabled,
  } = props;

  const [isHeart, setIsHeart] = useState(isHeartData);

  const handleOnClick = () => {
    setIsHeart((prev) => !prev);
    onClickHeart();
  };

  return (
    <Link to={`/${contentid}`} css={cardContainerCss(imgSrc, placeName)}>
      <div css={backgroundCss}>
        <button
          type="button"
          onClick={handleOnClick}
          css={iconCss}
          disabled={buttonDisabled}>
          {isHeart ? (
            <HeartFillMonoIcon />
          ) : (
            !buttonDisabled && <HeartMonoIcon />
          )}
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

  background-color: ${placeName ? COLORS.gray4 : COLORS.gray2};
  background-position: center center;
  background-size: cover;
  background-image: url(${imgSrc});
`;

const backgroundCss = css`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 16.8rem;
  border-radius: 1.2rem;

  background: linear-gradient(
    180deg,
    rgb(0 0 0 / 0%) 0%,
    rgb(0 0 0 / 34%) 100% rgb(0 0 0 / 0%) 0%,
    rgb(0 0 0 / 34%) 100%
  );

  color: ${COLORS.white};
`;

const titleCss = css`
  overflow: hidden;

  width: calc(100% - 1.6rem);
  margin: 9.4rem 0 0 1.6rem;

  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${FONTS.H3};
`;

const addressCss = css`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  margin-left: 1.6rem;

  ${FONTS.Small1};

  & > span {
    overflow: hidden;

    padding-top: 0.1rem;

    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const iconCss = css`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
`;
