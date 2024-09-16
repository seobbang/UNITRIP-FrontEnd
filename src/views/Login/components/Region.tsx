import { css } from '@emotion/react';

import BottomButton from '@/components/BottomButton';
import SelectRegion from '@/components/SelectRegion';
import { COLORS, FONTS } from '@/styles/constants';

import { useSignUpContext } from './SignUpContext';

interface RegionProps {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

const Region = ({ setStep }: RegionProps) => {
  const { region, setRegion } = useSignUpContext();

  const moveNext = () => {
    setStep('여행자 유형 설정');
  };

  return (
    <>
      <section css={regionLayout}>
        <p css={mainText}>
          <span css={highlight}>지역</span>을
          <br />
          선택해주세요
        </p>
        <SelectRegion region={region} setRegion={setRegion} />
      </section>
      <BottomButton text="다음" clickedFn={moveNext} disabled={!region.town} />
    </>
  );
};

export default Region;

const regionLayout = css`
  display: flex;
  gap: 3.2rem;
  justify-content: space-between;
  flex-direction: column;

  height: 100%;
  padding: 2rem;
`;

const mainText = css`
  height: fit-content;
  margin-top: 1.2rem;

  color: ${COLORS.brand1};

  ${FONTS.H2};
`;

const highlight = css`
  display: inline;

  box-shadow: inset 0 -1.5rem 0 ${COLORS.brand2};
`;
