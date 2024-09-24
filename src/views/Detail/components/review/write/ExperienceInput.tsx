import { css } from '@emotion/react';

import { COLORS, FONTS } from '@/styles/constants';

import Description from './Description';
import Question from './Question';

interface ExperienceInput {
  experience: string;
  handleExperience: (value: string) => void;
}

const ExperienceInput = (props: ExperienceInput) => {
  const { experience, handleExperience } = props;

  return (
    <div>
      <Question>어떤 경험을 하셨나요? *</Question>
      <Description>여행지에서 느낀 점을 자세하게 입력해주세요</Description>
      <textarea
        placeholder="최소 10자 이상 입력"
        css={textAreaCss}
        value={experience}
        onChange={(e) => handleExperience(e.currentTarget.value)}
      />
    </div>
  );
};

export default ExperienceInput;

const textAreaCss = css`
  width: 100%;
  height: 12rem;

  padding: 1.6rem;
  margin-top: 1.6rem;

  border-radius: 1rem;
  border: 1px solid ${COLORS.gray3};

  &:focus {
    outline: none;
    border: 1px solid ${COLORS.brand1};
  }

  &::placeholder {
    color: ${COLORS.gray4};
  }
  ${FONTS.Body2};
`;
