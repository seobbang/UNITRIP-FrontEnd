import { css } from '@emotion/react';
import { useState } from 'react';
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
