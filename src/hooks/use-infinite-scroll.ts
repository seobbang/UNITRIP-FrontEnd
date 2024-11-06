import { MutableRefObject, useEffect, useRef } from 'react';

interface InfiniteScrollParams {
  options?: { root: Element | null; rootMargin: string; threshold: number };
  handleObserver: (
    observer: IntersectionObserver,
    target: MutableRefObject<HTMLElement | null>,
    page: MutableRefObject<number>,
  ) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: any[];
}

/**
 * @param options IntersectionObserver options
 * @param handleObserver target 감지시 실행함수
 * @param deps useEffect 의존성 배열
 */

export const useInfiniteScroll = ({
  options,
  handleObserver,
  deps,
}: InfiniteScrollParams) => {
  const target = useRef<HTMLDivElement | null>(null);
  const page = useRef(1);

  useEffect(() => {
    page.current = 1;

    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].intersectionRatio <= 0) return;

      handleObserver(observer, target, page);
    }, options);

    //주시 시작
    target.current && observer.observe(target.current);

    return () => {
      //주시 종료
      target.current && observer.unobserve(target.current);
    };
  }, deps);

  return target;
};
