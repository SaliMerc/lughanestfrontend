import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const isAuthenticated = Boolean(window.localStorage.getItem('access_token'));

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;