import { css } from '@emotion/react';
import { useState } from 'react';

import { ToggleXFillIcon } from '@/assets/icon';

interface ImageProps {
  file: File;
  id: string;
  removeImg: () => void;
}

const Image = (props: ImageProps) => {
  const { file, id, removeImg } = props;

  const [imgSrc, setImgSrc] = useState<string | ArrayBuffer | null>(null);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setImgSrc(reader.result);
  };

  return (
    <div id={id} css={imgBoxContainerCss}>
      <img src={imgSrc as string} css={imgCss} />
      <button onClick={removeImg}>
        <ToggleXFillIcon />
      </button>
    </div>
  );
};

export default Image;

const imgBoxContainerCss = css`
  position: relative;
  aspect-ratio: 1;

  & > button {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
  }
`;

const imgCss = css`
  height: 100%;
  border-radius: 1.2rem;
  object-fit: cover;
`;
