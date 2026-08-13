import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getCurrentUser } from "../store/slices/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/login",
        formData
      );

      setMessage(response.data.message);

      await dispatch(getCurrentUser()).unwrap();
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 data-cy="login-heading">Login</h1>

        <form className="auth-form" onSubmit={handleSubmit} data-cy="login-form">
          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            data-cy="login-email-input"
          />

          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            data-cy="login-password-input"
          />

          <button className="auth-button" type="submit" disabled={loading} data-cy="login-button">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && <p className="auth-message" data-cy="login-message">{message}</p>}
        {error && <p className="auth-error" data-cy="login-error">{error}</p>}

        <p className="auth-footnote">
          Don't have an account? <button className="auth-link" type="button" onClick={() => navigate("/signup")} data-cy="goto-signup-link">Sign up</button>
        </p>
      </div>
    </div>
  );
}

export default Login;