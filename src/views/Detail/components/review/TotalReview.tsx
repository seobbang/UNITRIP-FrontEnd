import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PencilMonoIcon } from '@/assets/icon';
import LoginModal from '@/components/LoginModal';
import { COLORS, FONTS } from '@/styles/constants';

interface TotalReviewProps {
  reviewCount: number;
}

const TotalReview = (props: TotalReviewProps) => {
  const { reviewCount } = props;
  const { contentId } = useParams();
  const navigate = useNavigate();
  const [activateModal, setActivateModal] = useState(false);

  const isLoggedIn = sessionStorage.getItem('kakao_id');

  const writeReviewFn = () => {
    if (isLoggedIn) {
      navigate(`/${contentId}/review/write`);
    } else {
      setActivateModal(true);
    }
  };

  const closeModal = () => {
    setActivateModal(false);
  };

  return (
    <>
      <div css={containerCss}>
        <div css={reviewCountCss}>
          <span>리뷰</span>
          <span>{reviewCount}</span>
        </div>
        <button type="button" onClick={writeReviewFn}>
          <PencilMonoIcon />
        </button>
      </div>
      {activateModal && <LoginModal onClick={closeModal} />}
    </>
  );
};

export default TotalReview;

const containerCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 5.6rem;
  padding: 0 1.9rem;
  border-top: 1px solid ${COLORS.gray0};
  border-bottom: 1px solid ${COLORS.gray2};

  ${FONTS.H5};
`;

const reviewCountCss = css`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-start;
`;
