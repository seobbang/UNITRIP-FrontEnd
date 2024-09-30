import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import postAddUser from '@/apis/supabase/postAddUser';
import { MapMonoGrayIcon } from '@/assets/icon';
import BottomButton from '@/components/BottomButton';
import SelectTravelerType from '@/components/SelectTravelerType';
import { COLORS, FONTS } from '@/styles/constants';
import { KakaoUserDataResponse } from '@/types/userAPI';

import { useSignUpContext } from './SignUpContext';

interface UserTypeProps {
  userData: KakaoUserDataResponse;
}

const UserType = ({ userData }: UserTypeProps) => {
  const navigate = useNavigate();

  const { region, travelerType, setTravelerType } = useSignUpContext();

  const submitSignUp = async () => {
    await postAddUser({ userData, region, travelerType });
    navigate(`/`);
  };

  return (
    <>
      <section css={userTypeLayout}>
        <p css={mainText}>
          <span css={highlight}>여행자 유형</span>을
          <br />
          모두 선택해주세요
        </p>
        <div css={contentContainer}>
          <div>
            <p css={subText}>다중선택 가능</p>
            <SelectTravelerType
              currentTravelerType={travelerType}
              setTravelerType={setTravelerType}
            />
          </div>

          <div css={explanation}>
            <MapMonoGrayIcon />
            <p>여행자 유형은 장소 추천과 리뷰 필터링에 반영돼요!</p>
          </div>
        </div>
      </section>

      <BottomButton
        text="확인"
        clickedFn={submitSignUp}
        disabled={!travelerType.length}
      />
    </>
  );
};

export default UserType;

const userTypeLayout = css`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: 2rem;
`;

const mainText = css`
  height: fit-content;
  margin-top: 1.2rem;

  color: ${COLORS.brand1};

  ${FONTS.H2};
`;

const highlight = css`
  display: inline;

  box-shadow: inset 0 -1.5rem 0 ${COLORS.brand2};
`;

const contentContainer = css`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  flex: 1;
`;

const subText = css`
  padding: 0.9rem 0;

  color: ${COLORS.gray4};
  text-align: end;
  ${FONTS.Body3};
`;

const explanation = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  width: calc(100% + 4rem);
  padding: 1.2rem 2rem;
  margin-left: -2rem;

  background-color: ${COLORS.gray0};

  color: ${COLORS.gray9};
  ${FONTS.Body3};
  font-weight: 400;
`;
