import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Settings from './components/Settings';
import DetailPage from './views/Detail/pages/DetailPage';
import LoginCallBack from './views/Login/components/LoginCallBack';
import MainPage from './views/Main/pages/MainPage';
import Mypage from './views/Mypage/pages/Mypage';

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
