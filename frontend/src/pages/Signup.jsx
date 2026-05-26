import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/api/auth/signup", form);

      alert("Signup successful. Now login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
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
        <Link to="/login" className="font-semibold">
          Login
        </Link>
      </nav>

      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 bg-linear-to-br from-green-50 to-green-100">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-green-800">
            Create Account
          </h2>
          <p className="text-center text-gray-500 mt-2 mb-6">
            Register a new account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl"
              required
            />
            <input
              name="location"
              placeholder="Enter location"
              value={form.location}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl"
              required
            />

            <button
              disabled={loading}
              className="w-full bg-green-700 text-white py-3 rounded-xl font-bold"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center mt-5 text-gray-600">
            Already have account?{" "}
            <Link to="/login" className="text-green-700 font-bold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
