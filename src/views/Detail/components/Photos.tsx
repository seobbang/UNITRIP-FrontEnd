import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { detailImage1ResItem } from '@/types/detailImage1';

import { getDetailImage1Res } from '../utils/getDetailImage1';
import EmptyPhoto from './EmptyPhoto';

const Photos = () => {
  const { contentId } = useParams();
  const [imageList, setImageList] = useState<detailImage1ResItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDetailImage1Res(Number(contentId));
      if (res) {
        const { item } = res;
        setImageList(item);
      }
    };

    fetchData();
  }, []);

  return (
    <section css={photosContainer(imageList.length)}>
      {imageList.length === 0 ? (
        <EmptyPhoto />
      ) : (
        imageList.map((item, idx) => {
          return (
            <div css={photoWrapper} key={idx}>
              <img src={item.originimgurl} alt={item.imgname} css={photoItem} />
            </div>
          );
        })
      )}
    </section>
  );
};

export default Photos;

const photosContainer = (variant: number) => css`
  width: 100%;
  padding: 1rem;

  ${variant !== 0 &&
  css`
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(3, 1fr);
    place-items: center center;

    padding-bottom: 6rem;
  `}
`;

const photoWrapper = css`
  position: relative;

  width: 100%;

  &::after {
    content: '';

    display: block;

    padding-bottom: 100%;
  }
`;

const photoItem = css`
  position: absolute;

  width: 100%;
  height: 100%;
  border-radius: 1.1rem;
  object-fit: cover;
`;
