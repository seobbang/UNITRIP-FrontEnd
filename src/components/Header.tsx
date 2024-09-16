import { css } from '@emotion/react';

import { COLORS, FONTS } from '@/styles/constants';

interface HeaderProps {
  title?: string;
  leftIcon?: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;
  leftFn?: () => void;
  rightIcon?: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;
  rightFn?: () => void;
}

const Header = ({
  title,
  leftIcon: LeftIcon,
  leftFn,
  rightIcon: RightIcon,
  rightFn,
}: HeaderProps) => {
  return (
    <header css={header}>
      <div css={leftSide}>
        {LeftIcon && <LeftIcon onClick={leftFn} />}
        <span>{title}</span>
      </div>
      {RightIcon && <RightIcon onClick={rightFn} />}
    </header>
  );
};

export default Header;

const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 5rem;
  padding: 1.2rem 2rem;
`;

const leftSide = css`
  display: flex;
  gap: 1rem;
  align-items: center;

  color: ${COLORS.brand1};

  ${FONTS.H4};
`;
