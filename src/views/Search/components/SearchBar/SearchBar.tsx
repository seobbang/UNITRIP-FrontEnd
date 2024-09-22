import { css } from '@emotion/react';
import { DebouncedFunc } from 'lodash';
import { ChangeEvent, KeyboardEvent, RefObject, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ChevronLeftIcon, ResetXIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';
import { setStorageSearchWord } from '@/utils/storageSearchWord';

interface SearchBarProps {
  searchInputRef: RefObject<HTMLInputElement>;
  debounceGetWordList: DebouncedFunc<(searchWord: string) => Promise<void>>;
  resetRelatedWordList: () => void;
  initialWord?: string;
  handleSearchInputValue: (value: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const {
    searchInputRef,
    debounceGetWordList,
    resetRelatedWordList,
    initialWord,
    handleSearchInputValue,
  } = props;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showResetButton, setShowResetButton] = useState(
    !!searchInputRef.current?.value || !!initialWord,
  );

  const handleOnClickPrevButton = () => {
    navigate(-1);
    resetRelatedWordList();
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (!value || initialWord === value) {
      resetRelatedWordList();
      setShowResetButton(false);
      return;
    }

    debounceGetWordList(value);
    setShowResetButton(true);
  };

  const handleOnClick = () => {
    setShowResetButton(false);
    resetRelatedWordList();
    handleSearchInputValue('');
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInputRef.current) {
      const { value } = searchInputRef.current;
      setStorageSearchWord(value);
      resetRelatedWordList();
      navigate(`/search/${value}`, {
        replace: pathname.startsWith('/search/'),
      });
    }
  };

  return (
    <div css={containerCss}>
      <button type="button" onClick={handleOnClickPrevButton}>
        <ChevronLeftIcon />
      </button>
      <input
        ref={searchInputRef}
        css={inputCss}
        placeholder="어디로, 어떤 여행을 떠날까요?"
        defaultValue={initialWord}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />
      {showResetButton && (
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
