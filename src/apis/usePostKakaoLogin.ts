import { useNavigate } from 'react-router-dom';

import getKaKaoInfo from './getKaKaoInfo';
import fetchSupabaseLogin from './supabase/fetchSupabaseLogin';
import getUserExistence from './supabase/getUserExistence';

const usePostKakaoLogin = async () => {
  const navigate = useNavigate();
  /* 인가 코드 받기 */
  const KAKAO_CODE = new URL(window.location.href).searchParams.get('code');

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
    const { access_token, id_token } = tokenData;

    /* id 토큰으로 회원 가입 */
    if (id_token) {
      await fetchSupabaseLogin(id_token);
    }

    /*
     * Access 토큰으로 회원 정보 불러오기
     * JS SDK는 리프레쉬 토큰 별도로 사용하지 않음
     */
    if (access_token) {
      window.Kakao.Auth.setAccessToken(`${access_token}`);
      const { id, nickname, thumbnail_image_url } = await getKaKaoInfo();

      //로그인 분기 처리
      const registered = await getUserExistence(id);
      if (!registered) {
        navigate(`/sign-up`, { state: { id, nickname, thumbnail_image_url } });
      } else {
        sessionStorage.setItem('kakao_id', String(id));
        navigate(`/`);
      }
    } else {
      throw new Error('카카오 코드가 존재하지 않습니다.');
    }
  }
};

export default usePostKakaoLogin;
