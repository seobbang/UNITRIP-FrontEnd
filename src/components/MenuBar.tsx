import { css } from '@emotion/react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  HomeMonoIcon,
  MapMonoIcon,
  SearchMonoIcon,
  UserMonoIcon,
} from '@/assets/icon';
import { COLORS } from '@/styles/constants';

import LoginModal from './LoginModal';

// 각 페이지 url 변경시 이 부분을 수정해주세요.
const PATH_MATCH = [
  { url: '/', name: '홈', icon: <HomeMonoIcon /> },
  { url: '/search', name: '검색', icon: <SearchMonoIcon /> },
  { url: '/map', name: '지도', icon: <MapMonoIcon /> },
  { url: '/mypage', name: '마이', icon: <UserMonoIcon /> },
];

const MenuBar = () => {
  const { pathname } = useLocation();
  const firstPathname = `/${pathname.split('/')[1]}`;
  const navigate = useNavigate();

  const isLoggedIn = sessionStorage.getItem('kakao_id');

  const [activateModal, setActivateModal] = useState(false);

  const handleNavigation = (url: string) => {
    if (url === '/mypage') {
      if (isLoggedIn) {
        navigate(url);
      } else {
        setActivateModal(true);
      }
    } else {
      navigate(url);
    }
  };

  const closeModal = () => {
    setActivateModal(false);
  };

  const menuList = PATH_MATCH.map(({ url, name, icon }) => {
    return (
      <button
        type="button"
        key={url}
        onClick={() => handleNavigation(url)}
        className={firstPathname === url ? 'selected' : ''}
        css={linkCss}>
        {icon}
        <span css={spanCss}>{name}</span>
      </button>
    );
  });

  return (
    <>
      <nav css={navCss}>
        <div css={container}>{menuList}</div>
      </nav>
      {activateModal && <LoginModal onClick={closeModal} />}
    </>
  );
};

export default MenuBar;

const navCss = css`
  display: flex;
  position: fixed;
  bottom: 1.6rem;

  width: 100vw;
`;

const container = css`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 1rem 3.2rem;
  margin: 0 2rem;
  border-radius: 99.9rem;

  background-color: ${COLORS.brand1};
`;

const linkCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  width: 5.6rem;

  color: gray;

  &.selected {
    color: ${COLORS.white};
  }
`;

const spanCss = css`
  font-family: 'Apple SD Gothic Neo', sans-serif;
  font-style: normal;
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 140%;
`;
