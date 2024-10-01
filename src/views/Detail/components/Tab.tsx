import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import { COLORS, FONTS } from '@/styles/constants';

import { detailInfoType } from '../pages/DetailPage';
import DetailInfo from './DetailInfo';
import Map from './Map';
import Photos from './Photos';
import Universal from './Universal';

const TAB_MENU = ['상세정보', '유니버설', '지도', '사진', '리뷰'];

interface TabProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  latlng: {
    lat: string;
    lng: string;
  };
  detailInfo: detailInfoType;
}

function Tab(props: TabProps) {
  const { selectedTab, setSelectedTab, latlng, detailInfo } = props;

  const tabOnClick = (item: string) => {
    setSelectedTab(item);
  };

  return (
    <div css={tabContainer}>
      <ul css={tabList}>
        {TAB_MENU.map((item) => (
          <li
            key={item}
            css={listItem(item === selectedTab)}
            onClick={() => tabOnClick(item)}>
            {item}
          </li>
        ))}
      </ul>

      <Outlet />
      {selectedTab === '상세정보' && <DetailInfo detailInfo={detailInfo} />}
      {selectedTab === '사진' && <Photos />}
      {selectedTab === '지도' && <Map latlng={latlng} />}
      {selectedTab === '유니버설' && <Universal />}
    </div>
  );
}

export default Tab;

const tabContainer = css`
  display: flex;
  justify-content: center;
  flex-direction: column;

  width: 100%;
`;

const tabList = css`
  display: flex;
  justify-content: space-between;

  padding: 1rem 2.4rem 0 2.5rem;
  border-bottom: 0.1rem solid ${COLORS.gray2};

  ${FONTS.H5};
`;

const listItem = (isActive: boolean) => css`
  height: 3.9rem;
  border-bottom: ${isActive ? `0.2rem solid ${COLORS.gray8}` : 'none'};

  color: ${isActive ? COLORS.gray6 : COLORS.gray4};

  cursor: pointer;
`;
