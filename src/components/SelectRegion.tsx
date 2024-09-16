import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';

import { ArrowToggleClosed, ArrowToggleOpen } from '@/assets/icon';
import { REGION_LIST } from '@/constants/REGION_LIST';
import { COLORS, FONTS } from '@/styles/constants';

export type Region = {
  city: string;
  town: string;
};

interface SelectRegionProps {
  region: Region;
  setRegion: React.Dispatch<React.SetStateAction<Region>>;
}

const SelectRegion = ({ region, setRegion }: SelectRegionProps) => {
  const [locationList, setLocationList] = useState<string[]>([]);
  const [inputState, setInputState] = useState({ city: false, town: false });

  const cityRef = useRef<HTMLDivElement>(null);
  const townRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFocus = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node))
        setInputState((prev) => {
          return { city: false, town: prev.town };
        });
      if (townRef.current && !townRef.current.contains(e.target as Node))
        setInputState((prev) => {
          return { city: prev.city, town: false };
        });
    };

    document.addEventListener('mouseup', handleFocus);

    return () => {
      document.removeEventListener('mouseup', handleFocus);
    };
  }, []);

  const onClickDropDown = (inputType: 'city' | 'town', regionName: string) => {
    if (inputType === 'city') {
      setRegion(() => {
        return {
          city: regionName,
          town: '',
        };
      });

      const town =
        REGION_LIST.find((item) => item.city === regionName)?.town || [];
      setLocationList(town);
    } else if (inputType === 'town') {
      setRegion((prev) => {
        return {
          ...prev,
          town: regionName,
        };
      });
    }
    setInputState(() => {
      return { city: false, town: false };
    });
  };

  const renderDropdown = (items: string[], onClick: (item: string) => void) => (
    <div css={scrollBox}>
      <ul css={dropDownBox}>
        {items.map((item) => (
          <li key={item} onClick={() => onClick(item)}>
            <button type="button">{item}</button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <li css={formItem}>
      <span css={title}>지역*</span>

      <div css={multiInputSection}>
        <div data-type="city" ref={cityRef}>
          <div
            css={inputBox(!region.city)}
            onClick={() => {
              setInputState((prev) => {
                return { city: !prev.city, town: false };
              });
            }}>
            <input type="button" value={region.city || '시'} />
            {inputState.city ? <ArrowToggleOpen /> : <ArrowToggleClosed />}
          </div>
          {inputState.city &&
            renderDropdown(
              REGION_LIST.map((item) => item.city),
              (item) => onClickDropDown('city', item),
            )}
        </div>
        <div data-type="town" ref={townRef}>
          <div
            css={inputBox(!region.town)}
            onClick={() => {
              setInputState((prev) => {
                return { city: false, town: !prev.town };
              });
            }}>
            <input type="button" value={region.town || '군/구'} />
            {region.city && inputState.town ? (
              <ArrowToggleOpen />
            ) : (
              <ArrowToggleClosed />
            )}
          </div>
          {region.city &&
            inputState.town &&
            renderDropdown(locationList, (item) =>
              onClickDropDown('town', item),
            )}
        </div>
      </div>
    </li>
  );
};

export default SelectRegion;

const formItem = css`
  display: flex;
  flex: 1;

  gap: 1.2rem;
  flex-direction: column;

  width: 100%;

  overflow-y: hidden;

  ${FONTS.Body2};

  & input {
    border: none;
  }
`;

const title = css`
  color: ${COLORS.brand1};
`;

const multiInputSection = css`
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;

  overflow-y: hidden;

  & > div {
    display: flex;
    gap: 0.8rem;
    flex-direction: column;

    flex: 1;
  }
`;

const inputBox = (initial: boolean) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.6rem;
  border: 1px solid ${COLORS.gray3};
  border-radius: 1rem;

  color: ${initial ? COLORS.gray4 : COLORS.gray9};
`;

const scrollBox = css`
  border: 1px solid ${COLORS.gray3};
  border-radius: 1rem;
  flex: 1;

  overflow-y: scroll;
`;

const dropDownBox = css`
  display: flex;
  gap: 0.8rem;
  flex-direction: column;

  padding: 1.6rem;

  color: ${COLORS.gray9};

  & > li {
    padding: 0.6rem;
  }
`;
