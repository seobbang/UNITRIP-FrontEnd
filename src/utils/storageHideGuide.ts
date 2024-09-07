import { STORAGE_KEY } from '@/views/Search/constants/localStorageKey';

const key = STORAGE_KEY.hideSearchGuide;

const getStorageHideGuide = () => {
  const hideGuideTime = localStorage.getItem(key);
  return hideGuideTime ? Number(hideGuideTime) : null;
};

// 24시간을 ms로
const EXPIRATION_PERIOD = 24 * 60 * 60 * 1000;
export const setStorageHideGuide = () => {
  const date = new Date();
  const expirationTime = date.getTime() + EXPIRATION_PERIOD;
  localStorage.setItem(key, String(expirationTime));
};

const removeStorageHideGuide = () => {
  localStorage.removeItem(key);
};

export const isGuideShown = () => {
  const hideGuideTime = getStorageHideGuide();
  const nowDate = new Date();

  if (hideGuideTime) {
    // 만료 X
    if (nowDate.getTime() <= hideGuideTime) {
      return false;
    }
    // 만료 O
    else {
      removeStorageHideGuide();
      return true;
    }
  }
  // 만료 O
  else return true;
};
