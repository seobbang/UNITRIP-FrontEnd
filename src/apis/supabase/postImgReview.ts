import { unitripSupabase } from '@/utils/supabaseClient';

const postImgReview = async (imgs: File[]) => {
  const imgUrls: string[] = [];

  // 각 파일을 Supabase Storage에 업로드
  for (const img of imgs) {
    const { error: uploadError } = await unitripSupabase.storage
      .from('REVIEW_IMAGES')
      .upload(`images/${img.name}`, img);

    if (uploadError) {
      throw new Error('이미지 업로드 과정에서 에러가 발생했습니다');
    }

    // 업로드한 파일의 URL 생성
    const { data } = unitripSupabase.storage
      .from('REVIEW_IMAGES')
      .getPublicUrl(`images/${img.name}`);

    if (data) {
      const { publicUrl } = data;
      imgUrls.push(publicUrl);
    }
  }

  // 파일 URL을 데이터베이스에 저장
  const { error: dbError } = await unitripSupabase.from('USER').insert(imgUrls);

  if (dbError) {
    throw new Error('서버에 문제가 있습니다');
  }
};

export default postImgReview;
