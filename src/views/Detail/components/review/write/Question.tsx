import { css } from '@emotion/react';
import { ReactNode } from 'react';

import { COLORS, FONTS } from '@/styles/constants';

interface QuestionProps {
  children: ReactNode;
}

const Question = (props: QuestionProps) => {
  const { children } = props;

  return <div css={questionCss}>{children}</div>;
};

export default Question;

const questionCss = css`
  color: ${COLORS.gray9};
  ${FONTS.H5};
`;
