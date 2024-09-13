import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { XMonoIcon } from '@/assets/icon';
import { ErrorReportCompleteImage } from '@/assets/image';
import ToastMessage from '@/components/ToastMessage';
import { COLORS, FONTS } from '@/styles/constants';

const Complete = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(true);

  return (
    <div css={completeContainer}>
      <header css={header}>
        <XMonoIcon onClick={() => navigate(-1)} />
      </header>

      <div css={mainContainer}>
        <section css={contentContainer}>
          <img src={ErrorReportCompleteImage} alt="" css={image} />
          <div css={text('main')}>
            <h1>등록 완료!</h1>
            <h1>소중한 제보 감사해요</h1>
          </div>
          <p css={text('sub')}>문의해주신 내용은 확인 후</p>
          <p css={text('sub')}>반영 여부가 결정돼요</p>
        </section>

        <div css={bottomContainer}>
          {toast && (
            <ToastMessage
              setToast={() => {
                setToast;
              }}>
              등록이 완료되었습니다.
            </ToastMessage>
          )}
          <button type="button" css={button} onClick={() => navigate(-1)}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Complete;

const completeContainer = css`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const header = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 4.8rem;
`;

const mainContainer = css`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  width: 100%;
  height: calc(100dvh - 4.8rem);
  padding-bottom: 1.2rem;
`;

const contentContainer = css`
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 27rem;
  margin-top: 2.8rem;
`;

const image = css`
  width: 11.8rem;
  height: 11.8rem;
  margin-bottom: 3.2rem;
`;

const text = (variant: string) => css`
  margin-bottom: ${variant === 'main' ? '0.8rem' : 0};

  color: ${variant === 'main' ? COLORS.gray9 : COLORS.gray6};
  text-align: center;

  ${variant === 'main' ? FONTS.H3 : FONTS.Body5};
`;

const bottomContainer = css`
  display: flex;
  gap: 0.8rem;
  flex-direction: column;

  width: 100%;
`;

const button = css`
  width: 100%;
  padding: 1.7rem 15.35rem;
  border-radius: 1.2rem;

  background-color: ${COLORS.brand1};

  color: ${COLORS.white};

  ${FONTS.Body2};
`;
