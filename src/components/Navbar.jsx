import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { logoutUser } from "../store/slices/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      dispatch(logoutUser());

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="dashboard-header" data-cy="navbar">
      <div className="brand">
        <span className="mark">TM</span>
        <div>
          <h1>Task Manager</h1>
          <p>Organize and complete every task clearly.</p>
        </div>
      </div>

      <div className="user-actions">
        <span data-cy="navbar-welcome">Welcome, {user?.name}</span>
        <button className="logout-btn" onClick={handleLogout} data-cy="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
