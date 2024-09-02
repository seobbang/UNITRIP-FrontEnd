import { css } from '@emotion/react';
import { useState } from 'react';

import { REGION_LIST } from '@/constants/REGION_LIST';
import { COLORS, FONTS } from '@/styles/constants';

const SelectRegion = () => {
  const [locationList, setLocationList] = useState<string[]>([]);
  const [inputState, setInputState] = useState({ city: false, town: false });

  const onChangeRegion = (selected: string) => {
    const town = REGION_LIST.find((item) => item.city === selected)?.town || [];
    setLocationList(town);
  };

  const onChangeInput = (input: string) => {
    if (input === 'city') {
      setInputState((prev) => {
        return {
          ...prev,
          city: true,
        };
      });
    } else if (input === 'town') {
      setInputState((prev) => {
        return {
          ...prev,
          town: true,
        };
      });
    }
  };

  return (
    <li css={formItem}>
      <span css={title}>지역*</span>

      <div css={multiInputSection}>
        <div css={region}>
          <select
            name="city"
            defaultValue="default"
            css={inputState.city ? selectTab : beforeSelectTab}
            onChange={(e) => {
              onChangeRegion(e.target.value);
              onChangeInput('city');
            }}>
            <option value="default" disabled>
              지역
            </option>
            {REGION_LIST.map((item, idx) => (
              <option value={item.city} key={idx}>
                {item.city}
              </option>
            ))}
          </select>
        </div>

        <div css={region}>
          <select
            name="town"
            defaultValue="default"
            css={inputState.town ? selectTab : beforeSelectTab}
            onChange={() => onChangeInput('town')}>
            <option value="default">시/군/구</option>
            {locationList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </li>
  );
};

export default SelectRegion;

const formItem = css`
  display: flex;
  gap: 1.2rem;
  flex-direction: column;

  width: 100%;

  ${FONTS.Body2};
`;

const title = css`
  color: ${COLORS.brand1};
`;

const multiInputSection = css`
  display: flex;
  justify-content: space-between;
`;

const inputDefault = css`
  padding: 1.6rem;
  border: 1px solid ${COLORS.gray3};
  border-radius: 1rem;

  color: ${COLORS.gray9};
`;

const region = css`
  ${inputDefault};
  width: 48%;
`;

const selectTab = css`
  width: 100%;
  border: none;
  outline: none;
`;

const beforeSelectTab = css`
  ${selectTab};
  color: ${COLORS.gray4};
`;
