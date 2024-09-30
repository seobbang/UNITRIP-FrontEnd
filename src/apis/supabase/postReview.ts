import { unitripSupabase } from '@/utils/supabaseClient';

import postImgReview from './postImgReview';

interface postReviewProps {
  rate: number;
  description: string;
  convenience: string[];
  imgs: File[];
  contentId: number | undefined;
}

const postReview = async ({
  rate,
  description,
  convenience,
  imgs,
  contentId,
}: postReviewProps) => {
  const writer = sessionStorage.getItem('kakao_id');

  const imgUrls = await postImgReview(imgs);

  const date = new Date().toLocaleDateString().replace(/\s/g, '');

  const { error, status } = await unitripSupabase
    .from('REVIEW')
    .insert([
      {
        place: contentId,
        writer,
        rate,
        description,
        convenience,
        imgUrls,
        date,
      },
    ])
    .select();

  if (error) {
    throw new Error('서버에 문제가 있습니다');
  }

  return status;
};

export default postReview;
