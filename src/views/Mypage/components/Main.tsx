import { css } from '@emotion/react';

import { ArrowRightIcon } from '@/assets/icon';
import { ProfileImg } from '@/assets/image';
import { COLORS, FONTS } from '@/styles/constants';

import { currentTabType } from '../pages/Mypage';

interface TabItemType {
  name: string;
  tab: currentTabType;
}

interface MainProps {
  handleSetCurrentTab: (clicked: currentTabType) => void;
}

const MYPAGE_TAB_ITEM: TabItemType[] = [
  { name: '개인정보 조회 및 변경', tab: 'personalInfo' },
  { name: '저장한 여행지 목록', tab: 'favoritePlace' },
  { name: '여행자 유형 설정', tab: 'travelerType' },
];

function Main(props: MainProps) {
  const { handleSetCurrentTab } = props;
  return (
    <div>
      <header css={header}>마이페이지</header>
      <section css={profileSection}>
        <img src={ProfileImg} alt="프로필이미지_사진" css={profileImage} />
        <span css={InfoText}>서아람</span>
      </section>
      <ul>
        {MYPAGE_TAB_ITEM.map((item) => (
          <li
            css={tabItem('tab')}
            key={item.tab}
            onClick={() => handleSetCurrentTab(item.tab)}>
            <p>{item.name}</p>
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

const header = css`
  width: 100%;
  padding: 1rem;

  color: ${COLORS.brand1};

  ${FONTS.H4};
`;

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
