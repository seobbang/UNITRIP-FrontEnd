import { Region } from '@/components/SelectRegion';
import { KakaoUserDataProps } from '@/types/type';
import { unitripSupabase } from '@/utils/supabaseClient';

interface AddUserProps {
  userData: KakaoUserDataProps;
  region: Region;
  travelerType: string[];
}

const postAddUser = async ({
  userData,
  region,
  travelerType,
}: AddUserProps) => {
  const { id, nickname, thumbnail_image_url } = userData;

  const { data, error } = await unitripSupabase
    .from('USER')
    .insert([
      {
        kakao_id: id,
        name: nickname,
        profile: thumbnail_image_url,
        universal_type: travelerType,
        region: `${region.city} ${region.town}`,
      },
    ])
    .select();

  if (data) {
    sessionStorage.setItem('kakao_id', String(id));
  }

  if (error) {
    throw new Error('회원가입 과정에 오류가 있습니다');
  }
};

export default postAddUser;
