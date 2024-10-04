/** 바텀시트 내부 맵핑 할 내용들 */

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { DefaultImage } from '@/assets/image';
import { COLORS, FONTS } from '@/styles/constants';

interface contentProps {
  title: string;
  address: string;
  image: string;
  contentId: string;
}

const BottomSheetContent = (props: contentProps) => {
  const { title, address, image, contentId } = props;
  const isImageNone = image === '';

  const navigate = useNavigate();

  const onClickContent = () => {
    navigate(`/${contentId}`);
    document.body.style.overflow = 'auto';
  };

  return (
    <div css={contentContainer} onClick={onClickContent}>
      <section css={textSection}>
        <div css={titleSectionCss}>
          <h1 css={titleText('title')}>{title}</h1>
          <span css={titleText('sub')}>관광지</span>
        </div>
        <p css={addressText}>{address}</p>
      </section>
      <img
        css={imageCss}
        src={isImageNone ? DefaultImage : image}
        alt={`${title} 대표이미지`}
      />
    </div>
  );
};

export default BottomSheetContent;

const contentContainer = css`
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  width: 100%;
`;

const textSection = css`
  display: flex;
  gap: 0.2rem;
  flex-direction: column;
  max-width: 22.9rem;

  padding-top: 0.35rem;
`;

const titleSectionCss = css`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  width: 100%;
`;

const titleText = (type: string) => css`
  ${type === 'title'
    ? css`
        overflow: hidden;

        max-width: 80%;

        text-overflow: ellipsis;

        color: ${COLORS.brand1};
        white-space: nowrap;
        ${FONTS.H4};
      `
    : css`
        width: 20%;

        color: ${COLORS.gray4};
        white-space: nowrap;
        ${FONTS.Body5};
      `}
`;

const addressText = css`
  color: ${COLORS.gray6};
  ${FONTS.Body4};
  font-weight: 400;
`;

const imageCss = css`
  width: 8.3rem;
  height: 8.3rem;
  border-radius: 1rem;
`;
