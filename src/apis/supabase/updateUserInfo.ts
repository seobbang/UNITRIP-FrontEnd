import { Region } from '@/components/SelectRegion';
import { unitripSupabase } from '@/utils/supabaseClient';

const updateUserInfo = async (selectedRegion: Region) => {
  const kakaoId = sessionStorage.getItem('kakao_id');

  const changedData = selectedRegion.city + ' ' + selectedRegion.town;

  const { status, error } = await unitripSupabase
    .from('USER')
    .update({
      region: changedData,
    })
    .eq('kakao_id', kakaoId);

  if (error) {
    throw new Error('오류가 발생했습니다');
  }

  return status;
};

export default updateUserInfo;
