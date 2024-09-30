import { css } from '@emotion/react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { BackgroundImage } from '@/assets/image';
import { COLORS, FONTS } from '@/styles/constants';

import ErrorReport from '../components/ErrorReport';
import Header from '../components/Header';
import PlaceInfo from '../components/PlaceInfo';
import Tab from '../components/Tab';

function DetailPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { contentId } = useParams();

  const [selectedTab, setSelectedTab] = useState(
    pathname.endsWith('review') ? '리뷰' : '상세정보',
  );
  const handleTabChange = (tab: string) => {
    if (tab === '리뷰') navigate(`/${contentId}/review`);
    else navigate(`/${contentId}`);
    setSelectedTab(tab);
  };
  return (
    <div css={detailContainer}>
      <div css={backgroundImg}>
        <Header />
        <span css={title}>대전시립미술관</span>
      </div>
      <PlaceInfo />
      <div css={gapLine}></div>
      <Tab selectedTab={selectedTab} setSelectedTab={handleTabChange} />
      <div css={gapLine}></div>

      {selectedTab === '상세정보' ||
      selectedTab === '유니버설' ||
      selectedTab === '지도' ||
      selectedTab === '사진' ? (
        <ErrorReport />
      ) : null}
    </div>
  );
}

export default DetailPage;

const detailContainer = css`
  width: 100dvw;
`;

const backgroundImg = css`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  width: auto;
  height: 26.3rem;

  background: linear-gradient(
    180deg,
    rgb(0 0 0 / 0%) 0%,
    rgb(0 0 0 / 34%) 100%
  );
  background-size: cover;
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
`;

const title = css`
  padding: 1.2rem 2rem;

  color: ${COLORS.white};

  ${FONTS.H2};
`;

const gapLine = css`
  width: 100%;
  height: 1.3rem;

  background-color: ${COLORS.gray1};
`;
