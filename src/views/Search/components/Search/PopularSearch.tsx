import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';

import { COLORS, FONTS } from '@/styles/constants';
import { setStorageSearchWord } from '@/utils/storageSearchWord';

const WORD_LIST_DATA = [
  '제주도',
  '대전',
  '해수욕장',
  '휴양',
  '한강공원',
  '미술관',
  '수목원',
  '유네스코',
  '놀이터',
];

const pickRandomWord = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5).slice(0, 5);
};

const PopularSearch = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleOnClick = (searchWord: string) => {
    setStorageSearchWord(searchWord);
    navigate(`/search/${searchWord}`, {
      replace: pathname.startsWith('/search/'),
    });
  };

  const wordList = pickRandomWord(WORD_LIST_DATA).map((item, idx) => {
    return (
      <li key={item}>
        <button css={word} onClick={() => handleOnClick(item)}>
          <p css={idxCss}>{idx + 1}</p>
          <p>{item}</p>
        </button>
      </li>
    );
  });

  return (
    <div css={container}>
      <p css={title}>지금 가장 인기있는 검색어</p>
      <ol>{wordList}</ol>
    </div>
  );
};

export default PopularSearch;

const container = css`
  margin-top: 3.6rem;
`;

const title = css`
  margin: 0 0 1rem 2rem;

  color: ${COLORS.brand1};

  ${FONTS.Body2};
`;

const word = css`
  display: flex;
  gap: 2.6rem;
  align-items: center;

  height: 4.4rem;
  margin-left: 2.5rem;

  color: ${COLORS.gray6};

  ${FONTS.Body4};
`;

const idxCss = css`
  width: 0.9rem;
`;
