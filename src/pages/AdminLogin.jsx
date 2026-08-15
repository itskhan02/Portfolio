import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LockKeyhole, LogIn, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { ADMIN_DASHBOARD_PATH } from "../config/admin";

const getLoginError = (err) => {
  if (!err.response) {
    return "Could not reach the API server. Start it with npm run server and try again.";
  }

  return err.response.data?.message || "Login failed. Check your admin credentials.";
};

const AdminLogin = () => {
  const { admin, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (admin) return <Navigate to={ADMIN_DASHBOARD_PATH} replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate(ADMIN_DASHBOARD_PATH, { replace: true });
    } catch (err) {
      setError(getLoginError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <motion.form
        className="admin-login-card glass-panel"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <span className="eyebrow">Private Admin</span>
        <h1>Portfolio Control Room</h1>
        <p>Sign in with the single admin account to manage projects, resume, and portfolio content.</p>

        <label className="input">
          <Mail size={18} />
          <input
            type="email"
            placeholder="Admin email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            required
          />
        </label>
        <label className="input">
          <LockKeyhole size={18} />
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            minLength={8}
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            required
          />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-primary full-width" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"} <LogIn size={18} />
        </button>
        <a className="admin-back-link" href="/">Back to portfolio</a>
      </motion.form>
    </main>
  );
};

export default AdminLogin;
