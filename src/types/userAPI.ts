export interface UserDataResponse {
  name: string;
  profile: string;
  region: string;
  universal_type: string[];
  favorite_list: number[];
}

export interface KakaoUserDataResponse {
  id: number;
  nickname: string;
  thumbnail_image_url: string;
}
