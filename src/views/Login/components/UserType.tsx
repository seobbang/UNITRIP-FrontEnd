import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import postAddUser from '@/apis/supabase/postAddUser';
import BottomButton from '@/components/BottomButton';
import TravelerType from '@/components/TravelerType';
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
        <TravelerType
          travelerType={travelerType}
          setTravelerType={setTravelerType}
        />
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
