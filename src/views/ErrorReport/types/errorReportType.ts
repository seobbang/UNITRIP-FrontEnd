//ErrorReportPage.tsx
export type currentPageType = 'errorType' | 'explanation' | 'complete';

export interface errorContent {
  errorType: checkType;
  content: string;
}

//ReportType.tsx
export type checkType =
  | 'detail'
  | 'universal'
  | 'map'
  | 'photo'
  | 'etc'
  | undefined;

export interface listType {
  type: checkType;
  title: string;
  explain: string;
}
