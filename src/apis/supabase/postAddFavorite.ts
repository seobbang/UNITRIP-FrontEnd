import { useLocation } from 'react-router-dom';

import { unitripSupabase } from '@/utils/supabaseClient';

const toggleFavorite = async () => {
  const kakaoId = sessionStorage.getItem('kakao_id');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const place = queryParams.get('contentId');

  const { data, error: fetchError } = await unitripSupabase
    .from('USER')
    .select('favorite_list')
    .eq('kakao_id', kakaoId);

  if (fetchError) {
    throw new Error('사용자 정보를 가져오는 데 문제가 발생했습니다');
  }

  const currentFavorites = data[0].favorite_list || [];
  //기존 배열에 해당 장소가 존재하면 제거, 존재하지 않으면 추가
  const updatedFavorites = currentFavorites.includes(place)
    ? currentFavorites.filter((favorite: number) => favorite !== Number(place))
    : [...currentFavorites, Number(place)];

  const { error } = await unitripSupabase
    .from('USER')
    .update({
      favorite_list: updatedFavorites,
    })
    .eq('kakao_id', kakaoId);

  if (error) {
    throw new Error('서버에 문제가 있습니다');
  }
};

export default toggleFavorite;
