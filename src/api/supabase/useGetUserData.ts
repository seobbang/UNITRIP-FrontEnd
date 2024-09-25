import { UserDataProps } from '@/types/type';
import { unitripSupabase } from '@/utils/supabaseClient';

const getUserData = async (kakaoId: number) => {
  const { data, error } = await unitripSupabase
    .from('USER')
    .select('*')
    .eq('kakao_id', kakaoId);

  if (error) {
    throw new Error('서버에 문제가 있습니다');
  }

  /* kakao_id에 해당하는 행이 존재하는지 확인 */
  if (data.length) {
    const response: UserDataProps = data[0];
    return response;
  } else {
    return null;
  }
};

export default getUserData;
