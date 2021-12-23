import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import User from './pages/User';
import ShopLocation from './pages/ShopLocation';
import Order from './pages/Order';
import Blog from './pages/Blog';
import Category from './pages/Category';
import Banner from './pages/Banner';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  const currentUserId = useSelector((state) => state.userReducer.role);
  console.log('hafffff: ', currentUserId);
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/category', element: <Category /> },
        { path: '/product', element: <Products /> },
        { path: '/order', element: <Order /> },
        { path: '/shop', element: <ShopLocation /> },
        { path: '/user', element: <User /> },
        { path: '/blog', element: <Blog /> },
        { path: '/banner', element: <Banner /> },
        { path: '/', element: <Navigate to="/product" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/404', element: <NotFound /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
