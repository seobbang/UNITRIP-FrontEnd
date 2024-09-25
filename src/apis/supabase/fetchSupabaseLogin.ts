import { unitripSupabase } from '@/utils/supabaseClient';

const fetchSupabaseLogin = async (token: string) => {
  const {
    data: { session },
  } = await unitripSupabase.auth.signInWithIdToken({
    provider: 'kakao',
    token,
  });

  if (!session) {
    throw new Error('supabase 로그인 실패');
  }
};

export default fetchSupabaseLogin;
