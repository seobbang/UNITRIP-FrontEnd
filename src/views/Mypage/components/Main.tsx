import { css } from '@emotion/react';

import { ArrowRightIcon } from '@/assets/icon';
import { ProfileImg } from '@/assets/image';
import { COLORS, FONTS } from '@/styles/constants';

import { MYPAGE_TAB_CONTENTS } from '../constants/text';

interface MainProps {
  handleSetCurrentTab: (clicked: string) => void;
}

function Main(props: MainProps) {
  const { handleSetCurrentTab } = props;

  return (
    <div>
      <section css={profileSection}>
        <img src={ProfileImg} alt="프로필이미지_사진" css={profileImage} />
        <span css={InfoText}>서아람</span>
      </section>
      <ul>
        {Object.entries(MYPAGE_TAB_CONTENTS).map(([key, name]) => (
          <li
            css={tabItem('tab')}
            key={key}
            onClick={() => handleSetCurrentTab(name)}>
            <p>{name}</p>
            <ArrowRightIcon />
          </li>
        ))}
      </ul>
      <button type="button" css={tabItem('logout')}>
        로그아웃
      </button>
    </div>
  );
}

export default Main;

const profileSection = css`
  display: flex;
  align-items: center;
  flex-direction: column;

  padding: 0.8rem 0 2.5rem;
`;

const profileImage = css`
  width: 8.8rem;
  height: auto;
  border-radius: 50%;
`;

const InfoText = css`
  padding: 1.4rem 0 0.6rem;

  color: ${COLORS.gray6};

  ${FONTS.H3};
`;

const tabItem = (variant: string) => css`
  display: flex;
  justify-content: ${variant === 'logout' ? 'center' : 'space-between'};
  align-items: center;

  width: 100%;
  padding: 1.85rem 0;
  border-bottom: 1px solid ${COLORS.gray0};

  color: ${COLORS.brand1};

  cursor: pointer;

  ${FONTS.Body2};
`;
