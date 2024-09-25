export interface KakaoResProps {
  id: number;
  kakao_account: {
    // 프로필 또는 닉네임 동의항목 필요
    profile_nickname_needs_agreement: boolean;
    // 프로필 또는 프로필 사진 동의항목 필요
    profile_image_needs_agreement: boolean;
    profile: {
      // 프로필 또는 닉네임 동의항목 필요
      nickname: string;
      // 프로필 또는 프로필 사진 동의항목 필요
      thumbnail_image_url: string;
      profile_image_url: string;
      is_default_image: boolean;
      is_default_nickname: boolean;
    };
    /* 
    출생 연도 동의항목 추후 추가 예정
    */
    // birthyear_needs_agreement: boolean;
    // birthyear: string;
  };
}
