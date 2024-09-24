import { useLocation } from 'react-router-dom';

import { unitripSupabase } from '@/utils/supabaseClient';

const getReviews = async () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const place = queryParams.get('contentId');

  const { data, error } = await unitripSupabase
    .from('REVIEW')
    .select('*, USER(name)')
    .eq('place', place);

  if (error) {
    throw new Error('서버에 문제가 있습니다');
  }

  /*
   ** data는 리뷰들을 string[]에 저장
   ** 각 리뷰들의 타입은 ReviewResProps 타입을 갖고 있음
   */
  return data;
};

export default getReviews;
