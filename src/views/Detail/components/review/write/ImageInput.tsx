import { css } from '@emotion/react';

import { CameraIcon, ToggleXFillIcon } from '@/assets/icon';
import { COLORS } from '@/styles/constants';

import Description from './Description';
import Question from './Question';

interface ImageInputProps {
  imgList: string[];
  addImg: (imgUrl: string) => void;
  removeImg: (imgUrl: string) => void;
}

const ImageInput = (props: ImageInputProps) => {
  const { imgList, addImg, removeImg } = props;

  const handleOnChange = () => {
    addImg('asdf');
  };

  return (
    <div>
      <Question>사진으로 생생한 경험을 공유해주세요!</Question>
      <Description>최대 10장까지 사진을 올릴 수 있어요</Description>
      <div css={imgContainerCss}>
        {imgList.map((imgUrl) => (
          <div key={imgUrl} css={imgBoxContainerCss}>
            <img src={imgUrl} css={imgCss} />
            <button onClick={() => removeImg(imgUrl)}>
              <ToggleXFillIcon />
            </button>
          </div>
        ))}
        {imgList.length < 10 && (
          <label css={imageSquareLabelCss}>
            <CameraIcon />
            이미지 첨부
            <input css={imageButtonCss} type="file" onChange={handleOnChange} />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageInput;

const imageSquareLabelCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  aspect-ratio: 1;

  border-radius: 1.2rem;

  background-color: ${COLORS.gray1};
  color: ${COLORS.gray6};

  font-family: 'Apple SD Gothic Neo', sans-serif;
  font-style: normal;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 140%;
`;

const imgContainerCss = css`
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(3, 1fr);

  margin-top: 1.6rem;

  border-radius: 1.2rem;
`;

const imgBoxContainerCss = css`
  position: relative;
  aspect-ratio: 1;

  & > button {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
  }
`;

const imageButtonCss = css`
  width: 0;
  height: 0;
  padding: 0;
  border: 0;
`;

const imgCss = css`
  border-radius: 1.2rem;
`;
