import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainPage from './views/Main/pages/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
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
