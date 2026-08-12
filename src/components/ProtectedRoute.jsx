import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const { isAuthenticated, authChecked, loading } = useSelector(
    (state) => state.auth
  );

  if (loading && !authChecked) {
    return <h2>Checking authentication...</h2>;
  }

  if (!authChecked) {
    return <h2>Checking authentication...</h2>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;