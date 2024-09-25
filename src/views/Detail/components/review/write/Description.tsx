import { css } from '@emotion/react';
import { ReactNode } from 'react';

import { COLORS, FONTS } from '@/styles/constants';

interface DescriptionProps {
  children: ReactNode;
}

const Description = (props: DescriptionProps) => {
  const { children } = props;

  return <p css={descriptionCss}>{children}</p>;
};

export default Description;

const descriptionCss = css`
  color: ${COLORS.gray6};
  ${FONTS.Small1}
`;
