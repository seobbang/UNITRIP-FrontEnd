import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Error from './components/Error';
import Settings from './components/Settings';
import Review from './views/Detail/components/Review';
import DetailPage from './views/Detail/pages/DetailPage';
import WriteReviewPage from './views/Detail/pages/WriteReviewPage';
import ErrorReportPage from './views/ErrorReport/pages/ErrorReportPage';
import LoginCallBack from './views/Login/components/LoginCallBack';
import SignUpPage from './views/Login/pages/SignUpPage';
import MainPage from './views/Main/pages/MainPage';
import MapPage from './views/Map/pages/MapPage';
import Mypage from './views/Mypage/pages/Mypage';
import SearchPage from './views/Search/pages/SearchPage';
import SearchResultPage from './views/Search/pages/SearchResultPage';

const router = createBrowserRouter([
  {
    element: <Settings />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/auth/callback', element: <LoginCallBack /> },
      { path: '/sign-up', element: <SignUpPage /> },
      {
        path: '/:contentId',
        element: <DetailPage />,
        children: [{ path: 'review', element: <Review /> }],
      },
      { path: '/:contentId/review/write', element: <WriteReviewPage /> },
      { path: '/search', element: <SearchPage />, children: [{}] },
      { path: '/search/:word', element: <SearchResultPage /> },
      { path: '/mypage', element: <Mypage /> },
      { path: '/error-report', element: <ErrorReportPage /> },
      { path: '/map', element: <MapPage /> },
      { path: '/error', element: <Error /> },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
