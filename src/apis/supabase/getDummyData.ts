import { unitripSupabase } from '@/utils/supabaseClient';

const getDummyData = async () => {
  const { data, error } = await unitripSupabase.from('PLACE').select('*');

  if (error) {
    throw new Error('서버에 문제가 있습니다');
  }

  return data;
};

export default getDummyData;
