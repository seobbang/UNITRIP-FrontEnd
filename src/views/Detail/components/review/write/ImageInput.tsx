import { css } from '@emotion/react';

import { CameraIcon } from '@/assets/icon';
import { COLORS } from '@/styles/constants';

import Description from './Description';
import Image from './Image';
import Question from './Question';

interface ImageInputProps {
  imgList: File[];
  addImg: (file: File) => void;
  removeImg: (imgUrl: string) => void;
}

const ImageInput = (props: ImageInputProps) => {
  const { imgList, addImg, removeImg } = props;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const timestamp = +new Date();
      const newFile = new File(
        [file],
        `${encodeURIComponent(file.name)}${timestamp}`,
        {
          type: file.type,
        },
      );
      addImg(newFile);
      e.target.value = '';
    }
  };

  return (
    <div>
      <Question>사진으로 생생한 경험을 공유해주세요!</Question>
      <Description>최대 10장까지 사진을 올릴 수 있어요</Description>
      <div css={imgContainerCss}>
        {imgList.map((imgFile) => {
          return (
            <Image
              key={imgFile.name}
              file={imgFile}
              id={imgFile.name}
              removeImg={() => {
                removeImg(imgFile.name);
              }}
            />
          );
        })}

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
  gap: 0.6rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  border-radius: 1.2rem;

  background-color: ${COLORS.gray1};

  color: ${COLORS.gray6};
  font-family: 'Apple SD Gothic Neo', sans-serif;
  font-style: normal;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 140%;

  aspect-ratio: 1;
`;

const imgContainerCss = css`
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(3, 1fr);

  margin-top: 1.6rem;
  border-radius: 1.2rem;
`;

const imageButtonCss = css`
  width: 0;
  height: 0;
  padding: 0;
  border: 0;
`;
