import { useLocation } from 'react-router-dom';

import { unitripSupabase } from '@/utils/supabaseClient';

import postImgReview from './postImgReview';

interface postReviewProps {
  rate: number;
  description: string;
  convenience: string[];
  imgs: File[];
}

const postReview = async ({
  rate,
  description,
  convenience,
  imgs,
}: postReviewProps) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const place = queryParams.get('contentId');

  const writer = sessionStorage.getItem('kakao_id');

  const { error } = await unitripSupabase
    .from('REVIEW')
    .insert([
      {
        place,
        writer,
        rate,
        description,
        convenience,
      },
    ])
    .select();

  await postImgReview(imgs);

  if (error) {
    throw new Error('서버에 문제가 있습니다');
  }
};

export default postReview;
