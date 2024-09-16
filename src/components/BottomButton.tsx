import { css } from '@emotion/react';

import { COLORS, FONTS } from '@/styles/constants';

interface BottomButtonProps {
  text: string;
  clickedFn: () => void;
  disabled?: boolean;
}

const BottomButton = ({ text, clickedFn, disabled }: BottomButtonProps) => {
  return (
    <div css={bottomBtnLayout}>
      <button
        type="submit"
        onClick={clickedFn}
        disabled={disabled}
        css={bottomBtn(disabled)}>
        {text}
      </button>
    </div>
  );
};

export default BottomButton;

const bottomBtnLayout = css`
  position: fixed;
  bottom: 0;

  width: 100%;
  padding: 1.2rem 2rem;
`;

const bottomBtn = (disabled?: boolean) => css`
  width: 100%;
  padding: 1.7rem 0;
  border-radius: 1.2rem;

  background-color: ${disabled ? COLORS.gray1 : COLORS.brand1};

  color: ${disabled ? COLORS.gray4 : COLORS.white};
  ${FONTS.Body2};
`;
