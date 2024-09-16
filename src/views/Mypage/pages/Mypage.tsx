import { css } from '@emotion/react';
import { useState } from 'react';

import { HeaderBackIcon } from '@/assets/icon';
import BottomButton from '@/components/BottomButton';
import Header from '@/components/Header';
import MenuBar from '@/components/MenuBar';
import TravelerType from '@/components/TravelerType';

import Favorite from '../components/Favorite';
import Main from '../components/Main';
import PersonalInfo from '../components/PersonalInfo';
import { MYPAGE_TAB_CONTENTS } from '../constants/text';

const Mypage = () => {
  const [currentTab, setCurrentTab] = useState<string>('main');
  const [travelerTypes, setTravelerTypes] = useState<string[]>([]);

  const backToMainTab = () => {
    setCurrentTab('main');
  };

  const handleSetCurrentTab = (clickedTab: string) => {
    setCurrentTab(clickedTab);
  };

  const handleData = () => {};

  const renderComponent = (state: string) => {
    switch (state) {
      case 'main':
        return <Main handleSetCurrentTab={handleSetCurrentTab} />;
      case MYPAGE_TAB_CONTENTS.PERSONAL_INFO:
        return <PersonalInfo />;
      case MYPAGE_TAB_CONTENTS.FAVORITE_TRAVEL_LIST:
        return <Favorite />;
      case MYPAGE_TAB_CONTENTS.TRAVELER_TYPE:
        return (
          <TravelerType
            travelerType={travelerTypes}
            setTravelerType={setTravelerTypes}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {currentTab === 'main' ? (
        <Header title="마이페이지" />
      ) : (
        <Header
          title={currentTab}
          leftIcon={HeaderBackIcon}
          leftFn={backToMainTab}
        />
      )}
      <div css={mypageContainer}>{renderComponent(currentTab)}</div>
      {currentTab === 'main' ? (
        <MenuBar />
      ) : (
        <BottomButton text="저장" clickedFn={handleData} />
      )}
    </>
  );
};

export default Mypage;

const mypageContainer = css`
  display: flex;
  flex-direction: column;

  width: 100dvw;
  height: calc(100dvh - 8rem - 4.8rem);
  padding: 0 2rem;

  background-color: white;
`;
