import { Navigate, Outlet } from 'react-router-dom';

const Safety = () => {
  const token = localStorage.getItem('token'); // Check if token exists

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default Safety;
