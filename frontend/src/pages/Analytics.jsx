import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

function Analytics() {
  const [analytics, setAnalytics] = useState({ cropCount: {}, soilCount: {} });

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await API.get("/api/advisory/analytics");
      setAnalytics(res.data);
    };

    fetchAnalytics();
  }, []);

  const cropLabels = Object.keys(analytics.cropCount);
  const cropValues = Object.values(analytics.cropCount);
  const soilLabels = Object.keys(analytics.soilCount);
  const soilValues = Object.values(analytics.soilCount);

  const cropBarData = {
    labels: cropLabels,
    datasets: [
      {
        label: "Crops Recommended",
        data: cropValues,
        backgroundColor: [
          "#16a34a",
          "#f59e0b",
          "#22c55e",
          "#0ea5e9",
          "#a855f7",
        ],
        borderRadius: 10,
      },
    ],
  };

  const soilPieData = {
    labels: soilLabels,
    datasets: [
      {
        data: soilValues,
        backgroundColor: ["#16a34a", "#f97316", "#22c55e", "#eab308"],
        borderColor: "#fff",
        borderWidth: 3,
      },
    ],
  };

  const totalRecommendations = cropValues.reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#eaf6ee]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            Analytics 📊
          </h1>
          <p className="text-gray-600 mb-8">
            Insights from your crop recommendations.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border rounded-2xl p-6">
              <h2 className="text-xl font-bold text-green-800 mb-4">
                Crops Recommended
              </h2>
              {cropLabels.length ? (
                <Bar data={cropBarData} />
              ) : (
                <p>No crop analytics available.</p>
              )}
            </div>

            <div className="border rounded-2xl p-6">
              <h2 className="text-xl font-bold text-green-800 mb-4">
                Soil Type Analysis
              </h2>
              {soilLabels.length ? (
                <Pie data={soilPieData} />
              ) : (
                <p>No soil analytics available.</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <h3 className="text-4xl font-bold text-green-800">
                {cropLabels.length}
              </h3>
              <p>Total Crops</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <h3 className="text-4xl font-bold text-green-800">
                {soilLabels.length}
              </h3>
              <p>Soil Types</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <h3 className="text-4xl font-bold text-green-800">
                {totalRecommendations}
              </h3>
              <p>Recommendations</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <h3 className="text-4xl font-bold text-green-800">Active</h3>
              <p>Insights</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
