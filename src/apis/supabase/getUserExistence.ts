import { unitripSupabase } from '@/utils/supabaseClient';

const getUserExistence = async (kakaoId: number) => {
  const { count, error } = await unitripSupabase
    .from('USER')
    .select('id', { count: 'exact' })
    .eq('kakao_id', kakaoId);

  if (error) {
    throw new Error('서버에 문제가 있습니다');
  }

  return count; // 데이터가 존재하면 true, 없으면 false
};

export default getUserExistence;
