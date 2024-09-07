import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { COLORS, FONTS } from '@/styles/constants';
import { setStorageSearchWord } from '@/utils/storageSearchWord';

const PopularSearch = () => {
  const navigate = useNavigate();

  const handleOnClick = (searchWord: string) => {
    setStorageSearchWord(searchWord);
    navigate(searchWord);
  };

  const wordList = [
    '비대면 관광',
    '대전시립미술관',
    '대전 휴양림',
    '장미꽃 명소',
    '가족과 함께',
  ].map((item, idx) => {
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
