import { css } from '@emotion/react';

import { BigStarFillIcon, BigStarIcon } from '@/assets/icon';

import Description from './Description';
import Question from './Question';

interface ScoreSectionProps {
  score: number;
  handleScore: (score: number) => void;
}

const ScoreSection = (props: ScoreSectionProps) => {
  const { score, handleScore } = props;

  const starList = Array.from({ length: 5 }, (_, idx) => {
    return idx < score ? (
      <button key={`${idx}-fill`} onClick={() => handleScore(idx + 1)}>
        <BigStarFillIcon />
      </button>
    ) : (
      <button key={`${idx}-empty`} onClick={() => handleScore(idx + 1)}>
        <BigStarIcon />
      </button>
    );
  });

  return (
    <div>
      <Question>여행지는 어떠셨나요? *</Question>
      <Description>별점을 남겨주세요</Description>

      <div css={starContainerCss}>{starList}</div>
    </div>
  );
};

export default ScoreSection;

const starContainerCss = css`
  display: flex;
  gap: 0.4rem;

  margin-top: 1.6rem;
`;
