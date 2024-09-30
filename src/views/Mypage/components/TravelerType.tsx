import { css } from '@emotion/react';
import { useState } from 'react';

import updateUniversalInfo from '@/apis/supabase/updateUniversalInfo';
import { MapMonoGrayIcon } from '@/assets/icon';
import BottomButton from '@/components/BottomButton';
import SelectTravelerType from '@/components/SelectTravelerType';
import ToastMessage from '@/components/ToastMessage';
import { COLORS, FONTS } from '@/styles/constants';
import { UserDataResponse } from '@/types/userAPI';

interface TravelerTypeProps {
  travelerType: string[];
  setUserData: React.Dispatch<React.SetStateAction<UserDataResponse>>;
}

const TravelerType = ({ travelerType, setUserData }: TravelerTypeProps) => {
  const [userType, setUserType] = useState<string[]>(travelerType);
  const [toast, setToast] = useState(false);
  const [warning, setWarning] = useState(false);

  const saveFn = () => {
    const fetchData = async () => {
      try {
        const status = await updateUniversalInfo(userType);

        if (status === 204) {
          setToast(true);
          setUserData((prev) => {
            return {
              ...prev,
              universal_type: userType,
            };
          });
        }
      } catch (e) {
        throw new Error('오류가 발생했습니다');
      }
    };
    if (!userType.length) {
      setWarning(true);
    } else {
      if (travelerType !== userType) {
        fetchData();
      }
    }
  };

  return (
    <>
      <div css={contentContainer}>
        <div>
          <p css={subText}>다중선택 가능</p>
          <SelectTravelerType
            currentTravelerType={userType}
            setTravelerType={setUserType}
          />
        </div>

        <div css={explanation}>
          <MapMonoGrayIcon />
          <p>여행자 유형은 장소 추천과 리뷰 필터링에 반영돼요!</p>
        </div>
      </div>
      {warning && (
        <ToastMessage setToast={setToast}>항목을 모두 채워주세요.</ToastMessage>
      )}
      {toast && (
        <ToastMessage setToast={setToast}>
          변경 사항이 반영되었습니다.
        </ToastMessage>
      )}

      <BottomButton text="저장" clickedFn={saveFn} />
    </>
  );
};

export default TravelerType;

const contentContainer = css`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  padding: 0 2rem;

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
