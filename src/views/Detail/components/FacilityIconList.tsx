import { css } from '@emotion/react';
import { useState } from 'react';

import { ArrowToggleClosed, ArrowToggleOpen } from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

interface FacilityIConListProps {
  title: string;
  facilities: Facility[];
  toggleKey: keyof ToggleType;
}

interface Facility {
  name: string;
  default: JSX.Element;
  none: JSX.Element;
}

interface ToggleType {
  basic: boolean;
  physical: boolean;
  visual: boolean;
  hearing: boolean;
  infantFamily: boolean;
  others: boolean;
}

function FacilityIconList(props: FacilityIConListProps) {
  const { title, facilities, toggleKey } = props;

  const [toggles, setToggles] = useState<ToggleType>({
    basic: true,
    physical: false,
    visual: false,
    hearing: false,
    infantFamily: false,
    others: false,
  });

  const handleSetToggles = (clicked: keyof typeof toggles) => {
    setToggles((prev) => {
      return {
        ...prev,
        [clicked]: !prev[clicked],
      };
    });
  };

  return (
    <div css={listWrapper} onClick={() => handleSetToggles(toggleKey)}>
      <div css={titleText}>
        <span>{title}</span>
        {toggles[toggleKey] ? <ArrowToggleOpen /> : <ArrowToggleClosed />}
      </div>
      {toggles[toggleKey] && (
        <ul css={iconList}>
          {facilities.map((item: Facility) => (
            <li key={item.name} css={iconWrapper}>
              {item.default}
              <span css={iconName}>{item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FacilityIconList;

const listWrapper = css`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const titleText = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${COLORS.brand1};

  ${FONTS.H5};
`;

const iconList = css`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;

  padding-top: 1.2rem;
`;

const iconWrapper = css`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  flex-direction: column;

  max-width: 7rem;
`;

const iconName = css`
  word-break: keep-all;

  color: ${COLORS.gray5};
  text-align: center;

  ${FONTS.Small2};
`;
