import { unitripSupabase } from '@/utils/supabaseClient';

const getReviews = async (contentId: string) => {
  const { data, error } = await unitripSupabase
    .from('REVIEW')
    .select('*, USER(name)')
    .eq('place', contentId);

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
