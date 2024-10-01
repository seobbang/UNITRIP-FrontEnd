import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MAP_FACILITIES_API_KEY } from '@/constants/facilities';
import { COLORS, FONTS } from '@/styles/constants';
import { detailWithTour1ResItem } from '@/types/detailWithTour1';

import { getDetailWithTourRes } from '../utils/getDetailWithTour1';

interface FacilityIConListProps {
  title: string;
  facilities: Facility[];
  response?: detailWithTour1ResItem[] | undefined;
}

interface Facility {
  name: string;
  active: JSX.Element;
  inactive: JSX.Element;
}

interface facilityListType {
  name: string;
  apiKey: string;
  isActive: boolean;
  icon: JSX.Element;
}

function FacilityIconList(props: FacilityIConListProps) {
  const { contentId } = useParams();
  const { title, facilities } = props;
  const [facilityList, setFacilityList] = useState<facilityListType[]>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDetailWithTourRes(Number(contentId));
      if (res) {
        const { item } = res;
        filterFacility(item);
      }
    };
    fetchData();
  }, []);

  const filterFacility = (response: detailWithTour1ResItem[]) => {
    const iconList = facilities.map((facility) => {
      const apiKey = MAP_FACILITIES_API_KEY[facility.name];
      const isActive = response.some((res) => res[apiKey] !== '');

      return {
        name: facility.name,
        apiKey: apiKey,
        isActive: isActive,
        icon: isActive ? facility.active : facility.inactive,
      };
    });
    setFacilityList(iconList);
  };

  return (
    <div css={listWrapper}>
      <div css={titleText}>
        <span>{title}</span>
      </div>

      <ul css={iconList}>
        {facilityList &&
          facilityList.map((item: facilityListType) => (
            <li key={item.apiKey} css={iconWrapper}>
              {item.icon}
              <span css={iconName(item.name, item.isActive)}>{item.name}</span>
            </li>
          ))}
      </ul>
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

  padding: 0 0.5rem;

  max-width: 7rem;
`;

const iconName = (text: string, isActive: boolean) => css`
  word-break: keep-all;

  color: ${isActive ? COLORS.gray5 : COLORS.gray2};
  text-align: center;
  ${FONTS.Small2};

  ${(text === '점형/선형 블록' || text === '오디오가이드') &&
  `
    font-size: 1.1rem;
    letter-spacing: -0.5px;
  `}
`;
