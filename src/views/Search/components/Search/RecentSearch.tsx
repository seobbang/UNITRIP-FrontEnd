import { css } from '@emotion/react';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToggleXIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';
import {
  getStorageSearchWord,
  removeStorageSearchWord,
  setStorageSearchWord,
} from '@/utils/storageSearchWord';

const RecentSearch = () => {
  const navigate = useNavigate();
  const savedWordList = getStorageSearchWord();
  const [wordList, setWordList] = useState(savedWordList);

  const handleOnClickWordButton = (word: string) => {
    setStorageSearchWord(word);
    navigate(word);
  };

  const handleOnClickDeleteButton = (
    e: MouseEvent<HTMLButtonElement>,
    word: string,
  ) => {
    e.stopPropagation();
    const newList = removeStorageSearchWord(word);
    setWordList(newList);
  };

  const wordButtonList = wordList.map((item) => {
    return (
      <li key={item} css={wordListCss}>
        <div css={btnContainerCss}>
          <button
            css={word}
            type="button"
            onClick={() => handleOnClickWordButton(item)}>
            {item}
          </button>
          <button
            type="button"
            onClick={(e) => handleOnClickDeleteButton(e, item)}>
            <ToggleXIcon />
          </button>
        </div>
      </li>
    );
  });

  return (
    <>
      <p css={title}>최근 검색어</p>
      <ul css={wordContainer}>{wordButtonList}</ul>
    </>
  );
};

export default RecentSearch;

const title = css`
  margin: 2.7rem 0 2rem 2rem;

  color: ${COLORS.brand1};

  ${FONTS.Body2};
`;

const wordListCss = css`
  display: flex;

  width: max-content;
  height: 3.7rem;
  border-radius: 4rem;

  background-color: ${COLORS.gray1};
`;

const btnContainerCss = css`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  padding: 0 0.9rem 0 1.5rem;

  & svg {
    min-width: 1.5rem;
  }
`;

const word = css`
  padding-top: 0.2rem;

  color: ${COLORS.gray6};
  white-space: nowrap;

  ${FONTS.Body3}
`;

const wordContainer = css`
  display: flex;
  gap: 1rem;

  width: 100vw;
  overflow-x: auto;

  & > li:first-of-type {
    margin-left: 2rem;
  }

  & > li:last-child {
    margin-right: 1rem;
  }
`;
