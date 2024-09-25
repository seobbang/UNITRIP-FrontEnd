import { css } from '@emotion/react';
import { createPortal } from 'react-dom';

import { KakaoTalkIcon, XMonoIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

interface LoginModalProps {
  onClick: () => void;
}

/**
 * a와 b를 더한 결과를 반환
 * @param {()=>void} props.onClick X(닫기) 버튼 클릭시 실행 함수
 */
const LoginModal = (props: LoginModalProps) => {
  const { onClick } = props;

  const handleLogin = () => {
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.authorize({
        redirectUri:
          import.meta.env.VITE_LOCAL_REDIRECT_URI ||
          import.meta.env.VITE_REDIRECT_URI,
        scope: 'profile_nickname, profile_image, account_email',
      });
    }
  };

  const portalContent = (
    <div css={backgroundCss}>
      <div css={container}>
        <p css={titleCss}>카카오톡 로그인</p>
        <p css={descriptionCss}>서비스 이용을 위해 로그인이 필요해요.</p>
        <button type="button" css={linkCss} onClick={handleLogin}>
          <KakaoTalkIcon />
          카카오톡 로그인
        </button>
        <button type="button" css={closeButtonCss} onClick={onClick}>
          <XMonoIcon />
        </button>
      </div>
    </div>
  );

  return createPortal(portalContent, document.body);
};

export default LoginModal;

const backgroundCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;

  width: 100vw;
  height: 100vh;

  background-color: rgb(82 82 82 / 72%);
`;

const container = css`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 35rem;
  padding: 2rem;
  border-radius: 1.2rem;

  background-color: ${COLORS.white};
`;

const titleCss = css`
  color: ${COLORS.gray9};
  ${FONTS.H4};
`;

const descriptionCss = css`
  margin: 1.2rem 0 2rem;

  color: ${COLORS.gray5};

  ${FONTS.Body3};
`;

const linkCss = css`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;

  height: 5.6rem;
  border-radius: 1.2rem;

  background-color: ${COLORS.brand2};

  color: ${COLORS.gray6};

  ${FONTS.Body2};
`;

const closeButtonCss = css`
  position: absolute;
  top: 2rem;
  right: 2rem;

  color: ${COLORS.gray5};
`;
