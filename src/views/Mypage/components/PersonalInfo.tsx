import { css } from '@emotion/react';
import { useState } from 'react';

import updateUserInfo from '@/apis/supabase/updateUserInfo';
import BottomButton from '@/components/BottomButton';
import SelectRegion, { Region } from '@/components/SelectRegion';
import ToastMessage from '@/components/ToastMessage';
import { COLORS, FONTS } from '@/styles/constants';
import { UserDataResponse } from '@/types/userAPI';

interface PersonalInfoProps {
  name: string;
  region: Region;
  setUserData: React.Dispatch<React.SetStateAction<UserDataResponse>>;
}

const PersonalInfo = ({ name, region, setUserData }: PersonalInfoProps) => {
  const [selectedRegion, setSelectedRegion] = useState<Region>({
    city: region.city,
    town: region.town,
  });
  const [toast, setToast] = useState(false);
  const [warning, setWarning] = useState(false);

  const saveFn = () => {
    const fetchData = async () => {
      try {
        const status = await updateUserInfo(selectedRegion);

        if (status === 204) {
          setToast(true);
          setUserData((prev) => {
            return {
              ...prev,
              region: `${selectedRegion.city} ${selectedRegion.town}`,
            };
          });
        }
      } catch (e) {
        throw new Error('오류가 발생했습니다');
      }
    };

    if (!selectedRegion.city || !selectedRegion.town) {
      setWarning(true);
    } else {
      if (
        region.city !== selectedRegion.city ||
        region.town !== selectedRegion.town
      ) {
        fetchData();
      }
    }
  };

  return (
    <>
      <form action="submit" css={PersonalInfoContainter}>
        <ul css={itemList}>
          <li css={formItem}>
            <span css={title}>이름*</span>

            <input type="text" css={input} value={name} disabled />
          </li>

          <li css={formItem}>
            <span css={title}>생년월일*</span>

            <div css={multiInputSection}>
              <input type="number" css={birth('year')} disabled value="2015" />
              <input type="number" css={birth('month')} disabled value="9" />
              <input type="number" css={birth('date')} disabled value="7" />
            </div>
          </li>

          <SelectRegion region={selectedRegion} setRegion={setSelectedRegion} />
        </ul>
      </form>
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

export default PersonalInfo;

const PersonalInfoContainter = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: calc(100dvh - 6.2rem);
  padding: 0 2rem;
  overflow-y: hidden;
`;

const itemList = css`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;
  overflow-y: hidden;

  padding-top: 2.7rem;
`;

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

const inputDefault = css`
  padding: 1.6rem;
  border: 1px solid ${COLORS.gray3};
  border-radius: 1rem;

  background-color: ${COLORS.gray0};

  color: ${COLORS.gray4};
`;

const input = css`
  width: 100%;

  ${inputDefault};
`;

const multiInputSection = css`
  display: flex;
  justify-content: space-between;
`;

const birth = (variant: string) => css`
  ${inputDefault};
  width: ${variant === 'year' ? '38%' : '28%'};
`;
