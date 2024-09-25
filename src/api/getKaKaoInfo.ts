import { KakaoResProps } from '../views/Login/types/loginType';

const getKaKaoInfo = async () => {
  const response: KakaoResProps = await window.Kakao.API.request({
    url: '/v2/user/me',
    data: {
      property_keys: ['kakao_account.profile'],
    },
  });

  if (!response) {
    throw new Error('응답이 없습니다');
  }

  const {
    id,
    kakao_account: {
      profile: { nickname, thumbnail_image_url },
    },
  } = response;

  return { id, nickname, thumbnail_image_url };
};

export default getKaKaoInfo;
