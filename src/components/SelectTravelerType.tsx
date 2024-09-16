import { css } from '@emotion/react';

import {
  BlindTypeIcon,
  CheckEmptyIcon,
  CheckFilledIcon,
  HearingTypeIcon,
  InfantTypeIcon,
  NoneTypeIcon,
  PhysicalTypeIcon,
} from '@/assets/icon';
import { COLORS, FONTS } from '@/styles/constants';

interface SelectTravelerTypeProps {
  currentTravelerType: string[];
  setTravelerType: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectTravelerType = ({
  currentTravelerType,
  setTravelerType,
}: SelectTravelerTypeProps) => {
  const TYPE_LIST = [
    { icon: <PhysicalTypeIcon />, text: '지체장애인' },
    { icon: <BlindTypeIcon />, text: '시각장애인' },
    { icon: <HearingTypeIcon />, text: '청각장애인' },
    { icon: <InfantTypeIcon />, text: '영유아가족' },
    { icon: <NoneTypeIcon />, text: '해당되지 않아요' },
  ];

  const handleSetSelectedType = (text: string) => {
    setTravelerType((prev) => {
      // 해당되지 않아요 선택 시, 다른 옵션 해제 or 재선택 시, 해당되지 않아요 또한 선택 해제
      if (text === '해당되지 않아요') {
        return prev.includes(text) ? [] : [text];
      } else {
        // 해당되지 않아요 선택 후 다른 옵션 선택 -> 해당되지 않아요 해제
        if (prev.includes('해당되지 않아요')) {
          return [text];
        } else {
          // 해당되지 않아요 외 옵션들 다중 선택 가능
          return prev.includes(text)
            ? prev.filter((type) => type !== text)
            : [...prev, text];
        }
      }
    });
  };

  return (
    <ul css={list}>
      {TYPE_LIST.map((item) => (
        <li
          key={item.text}
          css={listItem}
          onClick={() => handleSetSelectedType(item.text)}>
          <div css={itemText}>
            {item.icon}
            {item.text}
          </div>

          {currentTravelerType.includes(item.text) ? (
            <CheckFilledIcon />
          ) : (
            <CheckEmptyIcon />
          )}
        </li>
      ))}
    </ul>
  );
};

export default SelectTravelerType;

const list = css`
  display: flex;
  flex-direction: column;
`;

const listItem = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.7rem 0 1.7rem 0.4rem;

  color: ${COLORS.gray9};
  ${FONTS.H5};
  font-weight: 400;
`;

const itemText = css`
  display: flex;
  gap: 1.2rem;
`;
