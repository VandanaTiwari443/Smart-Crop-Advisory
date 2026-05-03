import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("lastResult");
    navigate("/login");
  };

  return (
    <nav className="bg-[#064b2a] text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="text-3xl font-bold">
          AgriGuide 🌱
        </Link>

        <div className="flex items-center gap-5 text-sm font-semibold">
          <Link to="/dashboard" className="hover:text-green-200">Dashboard</Link>
          <Link to="/advisory" className="hover:text-green-200">Advisory</Link>
          <Link to="/history" className="hover:text-green-200">History</Link>
          <Link to="/analytics" className="hover:text-green-200">Analytics</Link>
          <Link to="/profile" className="bg-green-600 px-4 py-2 rounded-full">
            {user?.name || "Profile"}
          </Link>

          <button
            onClick={handleLogout}
            className="bg-white text-green-800 px-5 py-2 rounded-xl font-bold hover:bg-green-100"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;