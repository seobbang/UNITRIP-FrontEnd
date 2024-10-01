import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

import { KakaoMarkerImage } from '@/assets/image';

const { kakao } = window;

interface mapProps {
  latlng: {
    lat: string;
    lng: string;
  };
}

type mapType = kakao.maps.Map | undefined;

function Map(props: mapProps) {
  const { latlng } = props;
  const [map, setMap] = useState<mapType>(undefined);

  /** 지도 화면에 띄우기 */
  useEffect(() => {
    const kakaoMap = new kakao.maps.Map(document.getElementById('map'), {
      center: new kakao.maps.LatLng(latlng.lat, latlng.lng),
      level: 4,
    });
    setMap(kakaoMap);
  }, [latlng]);

  /** 해당 장소에 마커 생성하기 */
  useEffect(() => {
    if (map) {
      const imageSrc = KakaoMarkerImage;
      const imageSize = new kakao.maps.Size(30, 45);
      const imageOption = { offset: new kakao.maps.Point(0, 0) };

      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );
      const markerPosition = new kakao.maps.LatLng(latlng.lat, latlng.lng);

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      marker.setMap(map);
    }
  }, [map, latlng]);

  return (
    <div css={mapContainerCss}>
      <div id="map" css={mapView}></div>
    </div>
  );
}

export default Map;

const mapContainerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 29rem;
  padding: 2rem;
`;

const mapView = css`
  width: 100%;
  height: 100%;
`;
