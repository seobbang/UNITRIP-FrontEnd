import { css } from '@emotion/react';
import { useEffect } from 'react';

import { CheckFillIcon, XMonoIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';
import { setStorageHideGuide } from '@/utils/storageHideGuide';

import { STORAGE_KEY } from '../../constants/localStorageKey';

interface GuideProps {
  handleSetShowGuide: (value: boolean) => void;
}

const Guide = (props: GuideProps) => {
  const { handleSetShowGuide } = props;

  const hideGuideForADay = () => {
    setStorageHideGuide(STORAGE_KEY.hideSearchGuide);
    handleSetShowGuide(false);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div css={containerCss}>
      <div css={section1Css}>
        <button
          type="button"
          css={buttonCss}
          onClick={() => handleSetShowGuide(false)}>
          <XMonoIcon />
        </button>
      </div>
      <div css={section2Css}>
        <p css={textCss}>
          내가 설정한 여행자 유형이
          <br />
          필터에 반영되었어요!
        </p>
        <button type="button" css={buttonTextCss} onClick={hideGuideForADay}>
          <CheckFillIcon /> 하루동안 보지 않기
        </button>
      </div>
    </div>
  );
};

export default Guide;

const containerCss = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;

  width: 100vw;
  height: 100vh;
`;

const section1Css = css`
  position: relative;

  height: 6.4rem;

  background-color: rgb(82 82 82 / 72%);
`;

const section2Css = css`
  height: 100%;
  margin-top: 4.6rem;

  background-color: rgb(82 82 82 / 72%);
`;

const buttonCss = css`
  position: absolute;
  top: 2.5rem;
  right: 2.4rem;

  color: ${COLORS.white};
`;

const textCss = css`
  padding-top: 2rem;
  margin-left: 2rem;

  color: ${COLORS.white};

  ${FONTS.H5};
`;

const buttonTextCss = css`
  display: flex;
  gap: 0.6rem;

  margin: 2.8rem 0 0 2rem;

  color: ${COLORS.white};

  ${FONTS.Body4};
`;
