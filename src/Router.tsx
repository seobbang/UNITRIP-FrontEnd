import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import DetailPage from './views/Detail/pages/DetailPage';
import MainPage from './views/Main/pages/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  { path: '/detail', element: <DetailPage /> },
  // {
  //   path: "*",
  //   element: <ErrorPage />,
  // },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
