import { css } from '@emotion/react';
import { ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChevronLeftIcon, ResetXIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';
import { setStorageSearchWord } from '@/utils/storageSearchWord';

interface SearchBarProps {
  searchWord: string;
  handleSearchWord: (word: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const { searchWord, handleSearchWord } = props;

  const navigate = useNavigate();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearchWord(e.currentTarget.value);
  };

  const handleOnClick = () => {
    handleSearchWord('');
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setStorageSearchWord(searchWord);
      navigate(`/search/${searchWord}`);
    }
  };

  return (
    <div css={containerCss}>
      <button type="button" onClick={() => navigate(-1)}>
        <ChevronLeftIcon />
      </button>
      <input
        css={inputCss}
        placeholder="어디로, 어떤 여행을 떠날까요?"
        value={searchWord}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />
      {searchWord && (
        <button type="button" onClick={handleOnClick}>
          <ResetXIcon css={deleteButtonCss} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

const containerCss = css`
  display: flex;
  justify-content: space-between;
  position: relative;

  width: 100%;
  padding: 0.8rem 2rem 0;
`;

const inputCss = css`
  width: 100%;
  padding: 1.2rem 1.6rem;
  margin-left: 1.2rem;
  border: 1px solid ${COLORS.brand1};
  border-radius: 99.9rem;

  color: ${COLORS.gray9};
  ${FONTS.Body2};

  &::placeholder {
    color: ${COLORS.gray4};
    ${FONTS.Body2};
  }
`;

const deleteButtonCss = css`
  position: absolute;
  top: 2.1rem;
  right: 3.6rem;
`;
