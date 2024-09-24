import { css, keyframes } from '@emotion/react';
import { useEffect } from 'react';

import { CheckFilledYellowIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

interface ToastMessageProps {
  children: string;
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToastMessage = (props: ToastMessageProps) => {
  const { children, setToast } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <div css={rootContainer}>
      <div css={toastMessageContainer}>
        <CheckFilledYellowIcon />
        <span>{children}</span>
      </div>
    </div>
  );
};

export default ToastMessage;

const fadeout = keyframes`
  0% {opacity:1};
  100% {opacity:0};
`;

const rootContainer = css`
  position: fixed;
  left: 0;
  bottom: 7.5rem;

  width: 100%;

  padding: 0 2rem;
`;

const toastMessageContainer = () => css`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  width: 100%;
  padding: 1.7rem 0 1.7rem 2.4rem;
  border-radius: 1rem;

  background-color: ${COLORS.brand1};

  color: ${COLORS.white};
  ${FONTS.Body2};
  font-weight: 400;

  animation: ${fadeout} 1.5s forwards;
  animation-delay: 1.2s;
`;
