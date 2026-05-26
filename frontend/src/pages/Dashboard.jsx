import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState({ totalAdvisories: 0, latest: null });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await API.get("/api/advisory/dashboard");
      setStats(res.data);
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#eaf6ee]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-800">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
          </div>

          <Link
            to="/advisory"
            className="bg-green-700 text-white px-6 py-3 rounded-xl font-bold"
          >
            Get New Advisory
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Total Advisories</p>
            <h2 className="text-4xl font-bold text-green-800 mt-3">
              {stats.totalAdvisories}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              All time recommendations
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">This Month</p>
            <h2 className="text-4xl font-bold text-green-800 mt-3">
              {stats.totalAdvisories}
            </h2>
            <p className="text-sm text-gray-500 mt-2">Recommendations</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Best Crop</p>
            <h2 className="text-4xl font-bold text-green-800 mt-3">
              {stats.latest?.recommendedCrop || "No Data"}
            </h2>
            <p className="text-sm text-gray-500 mt-2">Most recent crop</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Est. Profit</p>
            <h2 className="text-4xl font-bold text-green-800 mt-3">
              ₹{stats.latest?.estimatedProfit || 0}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Latest estimated profit
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow mt-8 p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-5">
            Latest Recommendation
          </h2>

          {stats.latest ? (
            <table className="w-full text-left">
              <thead className="bg-green-100">
                <tr>
                  <th className="p-3">Crop</th>
                  <th className="p-3">Soil</th>
                  <th className="p-3">Season</th>
                  <th className="p-3">Water</th>
                  <th className="p-3">Profit</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-bold">
                    {stats.latest.recommendedCrop}
                  </td>
                  <td className="p-3">{stats.latest.soilType}</td>
                  <td className="p-3">{stats.latest.season}</td>
                  <td className="p-3">{stats.latest.waterAvailability}</td>
                  <td className="p-3">₹{stats.latest.estimatedProfit}</td>
                  <td className="p-3">
                    {new Date(stats.latest.createdAt).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No recommendation yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
