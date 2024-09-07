import { css } from '@emotion/react';

import { SearchMonoIcon } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

interface RelatedWordListProps {
  searchWord: string;
}

const RelatedWordList = (props: RelatedWordListProps) => {
  const { searchWord } = props;
  console.log(searchWord);

  return (
    <ul css={containerCss}>
      <li>
        <button css={wordCss}>
          <SearchMonoIcon />
          <span css={wordTextCss}>대전시립미술관</span>
        </button>
      </li>
      <li>
        <button css={wordCss}>
          <SearchMonoIcon />
          <span css={wordTextCss}>이응노미술관</span>
        </button>
      </li>
    </ul>
  );
};

export default RelatedWordList;

const containerCss = css`
  display: flex;
  flex-direction: column;

  margin-top: 2.4rem;
`;

const wordCss = css`
  display: flex;
  gap: 2.2rem;
  align-items: center;

  height: 5.9rem;
  margin-left: 2.4rem;
`;

const wordTextCss = css`
  padding-top: 0.2rem;

  color: ${COLORS.brand1};

  ${FONTS.Body3};
`;
