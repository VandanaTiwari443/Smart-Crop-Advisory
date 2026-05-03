import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Result() {
  const result = JSON.parse(localStorage.getItem("lastResult"));

  return (
    <div className="min-h-screen bg-[#eaf6ee]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {!result ? (
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <p>No result found.</p>
            <Link to="/advisory" className="text-green-700 font-bold">
              Generate Advisory
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6">
                Recommended Crop
              </h2>

              <div className="text-7xl mb-4">🌾</div>

              <h1 className="text-5xl font-bold text-green-800">
                {result.recommendedCrop}
              </h1>

              <p className="text-gray-600 mt-4">{result.reason}</p>

              <div className="mt-8 space-y-4">
                <div className="bg-green-100 p-4 rounded-xl flex justify-between">
                  <span className="font-bold text-green-800">Fertilizer</span>
                  <span>{result.fertilizer}</span>
                </div>

                <div className="bg-green-100 p-4 rounded-xl flex justify-between">
                  <span className="font-bold text-green-800">Water Need</span>
                  <span>{result.waterNeed}</span>
                </div>

                <div className="bg-green-100 p-4 rounded-xl flex justify-between">
                  <span className="font-bold text-green-800">
                    Estimated Profit
                  </span>
                  <span>₹{result.estimatedProfit}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6">
                Your Input
              </h2>

              <div className="space-y-5 text-gray-700">
                <p><b>Soil Type:</b> {result.soilType}</p>
                <p><b>Season:</b> {result.season}</p>
                <p><b>Water Availability:</b> {result.waterAvailability}</p>
                <p><b>Land Area:</b> {result.landArea} acres</p>
                <p><b>Budget:</b> ₹{result.budget}</p>
              </div>

              <Link
                to="/history"
                className="block mt-10 bg-green-700 text-white text-center py-3 rounded-xl font-bold"
              >
                View All Recommendations
              </Link>

              <Link
                to="/advisory"
                className="block mt-4 border border-green-700 text-green-700 text-center py-3 rounded-xl font-bold"
              >
                Generate Another
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;