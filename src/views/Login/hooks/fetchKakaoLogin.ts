import { useNavigate } from 'react-router-dom';

import fetchSupabaseLogin from './fetchSupabaseLogin';

const fetchKakaoLogin = async () => {
  /* 인가 코드 받기 */
  const KAKAO_CODE = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  if (KAKAO_CODE) {
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: import.meta.env.VITE_CLIENT_ID,
        redirect_uri:
          import.meta.env.VITE_LOCAL_REDIRECT_URI ||
          import.meta.env.VITE_REDIRECT_URI,
        code: KAKAO_CODE,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
      }),
    });

    /* token 데이터 받기 */
    const tokenData = await tokenResponse.json();
    const { id_token } = tokenData;

    /* id 토큰으로 회원 가입 */
    id_token && fetchSupabaseLogin(id_token);
  } else {
    console.log('카카오 코드가 존재하지 않습니다.');
  }

  navigate('/');
};

export default fetchKakaoLogin;
