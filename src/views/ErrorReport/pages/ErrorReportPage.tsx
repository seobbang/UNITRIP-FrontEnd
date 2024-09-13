import { css } from '@emotion/react';
import { useState } from 'react';

import Complete from '../components/Complete';
import Explanation from '../components/Explanation';
import ReportType from '../components/ReportType';
import {
  checkType,
  currentPageType,
  errorContent,
} from '../types/errorReportType';

const ErrorReportPage = () => {
  const [currentPage, setCurrentPage] = useState<currentPageType>('errorType');
  const [errorContent, setErrorContent] = useState<errorContent>({
    errorType: undefined,
    content: '',
  });

  const handleSetCurrentPage = (page: currentPageType) => {
    setCurrentPage(page);
  };

  const handleSetErrorType = (errorType: checkType) => {
    setErrorContent((prev) => ({
      ...prev,
      errorType: errorType,
    }));
  };

  const handleSetErrorContent = (content: string) => {
    setErrorContent((prev) => ({
      ...prev,
      content: content,
    }));
  };

  return (
    <div css={ErrorReportContainer}>
      {currentPage === 'errorType' && (
        <ReportType
          errorContent={errorContent}
          handleSetErrorType={handleSetErrorType}
          handleSetCurrentPage={handleSetCurrentPage}
        />
      )}

      {currentPage === 'explanation' && (
        <Explanation
          handleSetErrorContent={handleSetErrorContent}
          handleSetCurrentPage={handleSetCurrentPage}
        />
      )}

      {currentPage === 'complete' && <Complete />}
    </div>
  );
};

export default ErrorReportPage;

const ErrorReportContainer = css`
  width: 100%;
  padding: 0 2rem;
`;
