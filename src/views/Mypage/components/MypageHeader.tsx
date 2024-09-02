import { css } from '@emotion/react';

import { HeaderBackIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

import { currentTabType } from '../pages/Mypage';

interface HeaderProps {
  handleSetCurrentTab: ((clicked: currentTabType) => void) | undefined;
  state: string;
}

const HEADER_CONTENTS = [
  { state: 'personalInfo', content: '개인정보 조회 및 변경' },
  { state: 'favorite', content: '찜한 여행지 목록' },
  { state: 'travelerType', content: '' },
];

const MypageHeader = (props: HeaderProps) => {
  const { handleSetCurrentTab, state } = props;

  const content = HEADER_CONTENTS.find((item) => item.state === state)?.content;

  return (
    <header css={header}>
      <HeaderBackIcon
        onClick={() => {
          handleSetCurrentTab && handleSetCurrentTab('main');
        }}
      />
      <span>{content}</span>
    </header>
  );
};

export default MypageHeader;

const header = css`
  display: flex;
  gap: 1rem;
  align-items: center;

  width: 100%;
  height: 5rem;
  padding: 1.2rem 0;

  color: ${COLORS.brand1};

  ${FONTS.H4};
`;
