//전역 변수
declare global {
  interface Window {
    Kakao: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize(options: { redirectUri: string; scope: string }): void;
        setAccessToken(
          token: string,
        ): Promise<ShippingAddressResponse | ShippingAddressError>;
        logout(): Promise<LogoutResponse | AuthError>;
      };
      API: {
        request: (settings: {
          url: string;
          data: { property_keys: string[] };
        }) => Promise;
      };
    };

    /* eslint-disable @typescript-eslint/no-explicit-any */
    kakao: any;
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}

//로컬 모듈로 인식
export {};
