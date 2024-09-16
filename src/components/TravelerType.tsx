import { css } from '@emotion/react';

import { MapMonoGrayIcon } from '@/assets/icon';
import SelectTravelerType from '@/components/SelectTravelerType';
import { COLORS, FONTS } from '@/styles/constants';

interface TravelerTypeProps {
  travelerType: string[];
  setTravelerType: React.Dispatch<React.SetStateAction<string[]>>;
}

const TravelerType = ({ travelerType, setTravelerType }: TravelerTypeProps) => {
  return (
    <div css={contentContainer}>
      <div>
        <p css={subText}>다중선택 가능</p>
        <SelectTravelerType
          currentTravelerType={travelerType}
          setTravelerType={setTravelerType}
        />
      </div>

      <div css={explanation}>
        <MapMonoGrayIcon />
        <p>여행자 유형은 장소 추천과 리뷰 필터링에 반영돼요!</p>
      </div>
    </div>
  );
};

export default TravelerType;

const contentContainer = css`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  flex: 1;
`;

const subText = css`
  padding: 0.9rem 0;

  color: ${COLORS.gray4};
  text-align: end;
  ${FONTS.Body3};
`;

const explanation = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  width: calc(100% + 4rem);
  padding: 1.2rem 2rem;
  margin-left: -2rem;

  background-color: ${COLORS.gray0};

  color: ${COLORS.gray9};
  ${FONTS.Body3};
  font-weight: 400;
`;
