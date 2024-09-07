import { STORAGE_KEY } from '@/views/Search/constants/localStorageKey';

const key = STORAGE_KEY.recentSearch;
const LIST_MAX_LENGTH = 10;

export const getStorageSearchWord = (): string[] => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const setStorageSearchWord = (newValue: string) => {
  const previousList: string[] = JSON.parse(localStorage.getItem(key) || '[]');

  // 이미 존재하는지 확인
  const previousIndex = previousList.findIndex((item) => item === newValue);

  // 존재하면 삭제
  if (previousIndex !== -1) previousList.splice(previousIndex, 1);
  // 존재하지 않으면 max length 확인
  else {
    if (previousList.length === LIST_MAX_LENGTH) previousList.pop();
  }

  // 새로운 값 추가
  localStorage.setItem(key, JSON.stringify([newValue, ...previousList]));
};

export const removeStorageSearchWord = (newValue: string): string[] => {
  const list: string[] = JSON.parse(localStorage.getItem(key) || '[]');

  // 인덱스 찾아서 제거
  const previousIndex = list.findIndex((item) => item === newValue);
  list.splice(previousIndex, 1);
  localStorage.setItem(key, JSON.stringify([...list]));

  return list;
};
