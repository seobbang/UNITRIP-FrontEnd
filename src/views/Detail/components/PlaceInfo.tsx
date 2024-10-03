import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';

import {
  ArrowToggleClosed,
  ArrowToggleOpen,
  CallIcon,
  ClockIcon,
  MapPinIcon,
} from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

interface placeInfoProps {
  placeInfo: {
    addr: string;
    tel: string;
    useTime: string;
  };
}

const PlaceInfo = (props: placeInfoProps) => {
  const { placeInfo } = props;
  const { addr, tel, useTime } = placeInfo;

  const addressRef = useRef<HTMLDivElement>(null);
  const telRef = useRef<HTMLDivElement>(null);
  const useTimeRef = useRef<HTMLDivElement>(null);

  const lineCnt = useTime.split('<br>').length;

  const [isClose, setIsClose] = useState(true);

  useEffect(() => {
    if (useTimeRef.current && addressRef.current && telRef.current) {
      useTimeRef.current.innerHTML = useTime;
      addressRef.current.innerHTML = addr;
      telRef.current.innerHTML = tel;
    }
  }, [placeInfo]);

  const handleToggle = () => {
    setIsClose((prev) => !prev);
  };

  return (
    <section css={placeInfoContainer}>
      <div css={listItem}>
        <MapPinIcon />
        <div ref={addressRef} />
      </div>
      <div css={listItem}>
        <CallIcon />
        <div ref={telRef} />
      </div>
      <div css={mapListItem(isClose)}>
        <ClockIcon css={iconCss} />
        <div ref={useTimeRef} css={contentCss(isClose)} />
        {lineCnt > 1 &&
          (isClose ? (
            <ArrowToggleClosed onClick={handleToggle} css={toggleCss} />
          ) : (
            <ArrowToggleOpen onClick={handleToggle} css={toggleCss} />
          ))}
      </div>
    </section>
  );
};

export default PlaceInfo;

const placeInfoContainer = css`
  display: flex;
  gap: 0.6rem;
  flex-direction: column;

  width: 100%;
  padding: 1.6rem 2rem;
`;

const listItem = css`
  display: flex;
  gap: 0.8rem;

  color: ${COLORS.gray9};

  ${FONTS.Body4};
`;

const mapListItem = (isClose: boolean) => css`
  align-items: ${isClose ? 'center' : 'flex-start'};
  position: relative;

  width: 100%;

  ${listItem};
`;

const contentCss = (isClose: boolean) => css`
  overflow: hidden;

  max-height: ${isClose ? '2.2rem' : 'none'};
`;

const iconCss = css`
  margin-top: 0.3rem;
`;

const toggleCss = css`
  ${iconCss}
  position: absolute;
  right: 0;
`;
