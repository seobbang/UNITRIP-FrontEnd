import { unitripSupabase } from '@/utils/supabaseClient';

const updateUniversalInfo = async (universal_type: string[]) => {
  const kakaoId = sessionStorage.getItem('kakao_id');

  const { status, error } = await unitripSupabase
    .from('USER')
    .update({
      universal_type,
    })
    .eq('kakao_id', kakaoId);

  if (error) {
    throw new Error('오류가 발생했습니다');
  }

  return status;
};

export default updateUniversalInfo;
