import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Settings from './components/Settings';
import DetailPage from './views/Detail/pages/DetailPage';
import LoginCallBack from './views/Login/components/LoginCallBack';
import MainPage from './views/Main/pages/MainPage';
import Mypage from './views/Mypage/pages/Mypage';
import SearchPage from './views/Search/pages/SearchPage';
import SearchResultPage from './views/Search/pages/SearchResultPage';

const router = createBrowserRouter([
  {
    element: <Settings />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/auth/callback', element: <LoginCallBack /> },
      { path: '/detail', element: <DetailPage /> },
    ],
  },
  { path: '/detail', element: <DetailPage /> },
  {
    path: '/search',
    element: <SearchPage />,
    children: [{}],
  },
  {
    path: '/search/:word',
    element: <SearchResultPage />,
  },
  {
    path: '/mypage',
    element: <Mypage />,
  },
  // {
  //   path: "*",
  //   element: <ErrorPage />,
  // },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
