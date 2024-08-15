import { css } from '@emotion/react';

import { MapImage } from '@/assets/image';

function Map() {
  return (
    <div css={mapContainer}>
      <img src={MapImage} alt="지도 이미지" css={mapView} />
    </div>
  );
}

export default Map;

const mapContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 2rem;
`;

const mapView = css`
  width: 100%;
  height: 100%;
`;
