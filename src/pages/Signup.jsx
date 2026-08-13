import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

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
        "/auth/register",
        formData
      );

      setMessage(response.data.message);

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 data-cy="signup-heading">Create Account</h1>

        <form className="auth-form" onSubmit={handleSubmit} data-cy="signup-form">
          <input
            className="auth-input"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            data-cy="signup-name-input"
          />

          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            data-cy="signup-email-input"
          />

          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            data-cy="signup-password-input"
          />

          <button className="auth-button" type="submit" disabled={loading} data-cy="signup-button">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {message && <p className="auth-message" data-cy="signup-message">{message}</p>}
        {error && <p className="auth-error" data-cy="signup-error">{error}</p>}

        <p className="auth-footnote">
          Already have an account? <button className="auth-link" type="button" onClick={() => navigate("/login")} data-cy="goto-login-link">Login</button>
        </p>
      </div>
    </div>
  );
}

export default Signup;