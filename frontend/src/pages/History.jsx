import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function History() {
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const fetchHistory = async () => {
      const res = await API.get("/advisory/my");
      setHistory(res.data);
    };

    fetchHistory();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this advisory?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/advisory/${id}`);
      alert("Deleted successfully ✅");
      // eslint-disable-next-line no-undef
      fetchHistory();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#eaf6ee]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-green-800 mb-8">
            Advisory History 📜
          </h1>

          {history.length === 0 ? (
            <p className="text-gray-500">No advisory history found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-green-100">
                  <tr>
                    <th className="p-4">Crop</th>
                    <th className="p-4">Soil</th>
                    <th className="p-4">Season</th>
                    <th className="p-4">Water</th>
                    <th className="p-4">Profit</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td className="p-4 font-bold">{item.recommendedCrop}</td>
                      <td className="p-4">{item.soilType}</td>
                      <td className="p-4">{item.season}</td>
                      <td className="p-4">{item.waterAvailability}</td>
                      <td className="p-4">₹{item.estimatedProfit}</td>
                      <td className="p-4">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() => setSelected(item)}
                          className="bg-green-600 text-white px-3 py-2 rounded-lg"
                        >
                          View
                        </button>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500 text-white px-3 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selected && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
              <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-xl">
                <h2 className="text-3xl font-bold text-green-800 mb-5">
                  {selected.recommendedCrop} Details
                </h2>

                <div className="space-y-3">
                  <p><b>Soil:</b> {selected.soilType}</p>
                  <p><b>Season:</b> {selected.season}</p>
                  <p><b>Water:</b> {selected.waterAvailability}</p>
                  <p><b>Land Area:</b> {selected.landArea} acres</p>
                  <p><b>Budget:</b> ₹{selected.budget}</p>
                  <p><b>Fertilizer:</b> {selected.fertilizer}</p>
                  <p><b>Water Need:</b> {selected.waterNeed}</p>
                  <p><b>Estimated Profit:</b> ₹{selected.estimatedProfit}</p>
                  <p><b>Reason:</b> {selected.reason}</p>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="mt-6 w-full bg-green-700 text-white py-3 rounded-xl font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;