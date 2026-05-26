import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await API.post("/api/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <nav className="bg-[#064b2a] text-white px-8 py-4 flex justify-between">
        <Link to="/" className="text-2xl font-bold">
          AgriGuide 🌱
        </Link>
        <Link to="/" className="font-semibold">
          Home
        </Link>
      </nav>

      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 bg-linear-to-br from-green-50 to-green-100">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-green-800">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-500 mt-2 mb-6">
            Login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-bold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-5 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-green-700 font-bold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
