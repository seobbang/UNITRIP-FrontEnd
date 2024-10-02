import { css } from '@emotion/react';
import { useState } from 'react';

import getUserData from '@/apis/supabase/getUserData';
import { HeaderBackIcon } from '@/assets/icon';
import Header from '@/components/Header';
import MenuBar from '@/components/MenuBar';
import { Region } from '@/components/SelectRegion';
import { useAsyncEffect } from '@/hooks/use-async-effect';
import { UserDataResponse } from '@/types/userAPI';

import Favorite from '../components/Favorite';
import Main from '../components/Main';
import PersonalInfo from '../components/PersonalInfo';
import TravelerType from '../components/TravelerType';
import { MYPAGE_TAB_CONTENTS } from '../constants/text';

const Mypage = () => {
  const [currentTab, setCurrentTab] = useState<string>('main');
  const [userData, setUserData] = useState<UserDataResponse>({
    name: '',
    profile: '',
    region: '',
    universal_type: [],
    favorite_list: [],
  });

  const kakaoId = sessionStorage.getItem('kakao_id');

  useAsyncEffect(async () => {
    const response = await getUserData(Number(kakaoId));
    if (response) setUserData(response);
  }, []);

  const backToMainTab = () => {
    setCurrentTab('main');
  };

  const handleSetCurrentTab = (clickedTab: string) => {
    setCurrentTab(clickedTab);
  };

  const parseRegion = (regionString: string): Region => {
    const [city, town] = regionString.split(' ');
    return { city, town };
  };

  const renderComponent = (state: string) => {
    if (!userData) {
      return <div>로딩 중...</div>;
    }

    const userRegion = parseRegion(userData.region);

    switch (state) {
      case 'main':
        return (
          <Main
            name={userData.name}
            profile={userData.profile}
            handleSetCurrentTab={handleSetCurrentTab}
          />
        );
      case MYPAGE_TAB_CONTENTS.PERSONAL_INFO:
        return (
          <PersonalInfo
            name={userData.name}
            region={userRegion}
            setUserData={setUserData}
          />
        );
      case MYPAGE_TAB_CONTENTS.FAVORITE_TRAVEL_LIST:
        return <Favorite />;
      case MYPAGE_TAB_CONTENTS.TRAVELER_TYPE:
        return (
          <TravelerType
            travelerType={userData.universal_type}
            setUserData={setUserData}
          />
        );
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
      <div css={mypageContainer(currentTab)}>{renderComponent(currentTab)}</div>
      {currentTab === 'main' && <MenuBar />}
    </>
  );
};

export default Mypage;

const mypageContainer = (tab: string) => css`
  display: flex;
  flex-direction: column;

  width: 100dvw;
  height: ${tab === '저장한 여행지 목록'
    ? 'calc(100dvh - 5rem)'
    : 'calc(100dvh - 8rem - 4.8rem)'};

  background-color: white;
`;
