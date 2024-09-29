import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SearchMonoIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';
import { SearchItem } from '@/types/search';

interface RelatedWordListProps {
  searchWord: string;
  relatedWordList: SearchItem[];
  handleSearchInputValue: (value: string) => void;
}

const RelatedWordList = (props: RelatedWordListProps) => {
  const { searchWord, relatedWordList, handleSearchInputValue } = props;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleOnClick = (title: string) => {
    handleSearchInputValue(title);
    navigate(`/search/${title}`, { replace: pathname.startsWith('/search/') });
  };

  const renderRelatedWordList = () => {
    return relatedWordList?.map(({ title, contentid }) => {
      const searchWordIndex = title.indexOf(searchWord);
      const beforeSearchWord = title.slice(0, searchWordIndex);
      const afterSearchWord = title.slice(searchWordIndex + searchWord.length);

      return (
        <li key={contentid}>
          <button css={wordCss} onClick={() => handleOnClick(title)}>
            <SearchMonoIcon />
            <div css={wordTextCss}>
              {beforeSearchWord}
              <span css={keywordCss}>{searchWord}</span>
              {afterSearchWord}
            </div>
          </button>
        </li>
      );
    });
  };

  return <ul css={containerCss}>{renderRelatedWordList()}</ul>;
};

export default RelatedWordList;

const containerCss = css`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 1000;

  width: 100vw;

  background-color: white;
  min-height: 100vh;
`;

const wordCss = css`
  display: flex;
  gap: 2.2rem;
  align-items: center;

  height: 5.9rem;
  margin-left: 2.4rem;
`;

const wordTextCss = css`
  overflow: hidden;

  width: calc(100vw - 24px - 6rem);
  padding-top: 0.2rem;

  color: ${COLORS.gray5};
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${FONTS.Body5};
`;

const keywordCss = css`
  color: ${COLORS.brand1};
  ${FONTS.Body3};
`;
