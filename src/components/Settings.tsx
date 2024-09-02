import { Outlet } from 'react-router-dom';

const Settings = () => {
  // SDK 초기화
  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init(import.meta.env.VITE_JAVASCRIPT_KEY);
  }

  // SDK 초기화 여부를 판단
  console.log(window.Kakao.isInitialized());

  return <Outlet />;
};

export default Settings;
