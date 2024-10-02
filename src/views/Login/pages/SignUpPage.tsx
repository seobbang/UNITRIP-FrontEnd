import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { HeaderBackIcon } from '@/assets/icon';
import Header from '@/components/Header';

import Region from '../components/Region';
import { SignUpProvider } from '../components/SignUpContext';
import UserType from '../components/UserType';

const SignUpPage = () => {
  const [step, setStep] = useState('지역 설정');
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // state가 없을 경우 에러 페이지로 리다이렉트
    if (!state) {
      navigate('/error', { state: { message: '잘못된 접근입니다.' } });
    }
  }, [state]);

  const moveBack = () => {
    if (step === '지역 설정') {
      navigate(`/`);
    }
    if (step === '여행자 유형 설정') {
      setStep('지역 설정');
    }
  };

  const renderItem = () => {
    if (step === '지역 설정') {
      return <Region setStep={setStep} />;
    }
    if (step === '여행자 유형 설정') {
      return <UserType userData={state} />;
    }
  };

  return (
    <SignUpProvider>
      <Header leftIcon={HeaderBackIcon} leftFn={moveBack} />
      <main css={SignUpPageLayout}>{renderItem()}</main>
    </SignUpProvider>
  );
};

export default SignUpPage;

const SignUpPageLayout = css`
  width: 100%;
  height: calc(100dvh - 8rem - 4.8rem);
`;
