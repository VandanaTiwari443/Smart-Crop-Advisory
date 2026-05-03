import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AdvisoryForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    soilType: "",
    season: "",
    waterAvailability: "",
    landArea: "",
    budget: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await API.post("/advisory", {
        ...form,
        landArea: Number(form.landArea),
        budget: Number(form.budget),
      });

      localStorage.setItem("lastResult", JSON.stringify(res.data));
      navigate("/result");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to generate advisory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eaf6ee]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-800">Get New Advisory</h1>
          <p className="text-gray-600 mt-2 mb-8">Fill the details below to get crop recommendation.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-5">
              <select name="soilType" value={form.soilType} onChange={handleChange} className="border px-4 py-3 rounded-xl" required>
                <option value="">Select Soil Type</option>
                <option value="Loamy">Loamy</option>
                <option value="Black">Black</option>
                <option value="Alluvial">Alluvial</option>
                <option value="Red">Red</option>
              </select>

              <select name="season" value={form.season} onChange={handleChange} className="border px-4 py-3 rounded-xl" required>
                <option value="">Select Season</option>
                <option value="Kharif">Kharif</option>
                <option value="Rabi">Rabi</option>
                <option value="Zaid">Zaid</option>
              </select>

              <select name="waterAvailability" value={form.waterAvailability} onChange={handleChange} className="border px-4 py-3 rounded-xl" required>
                <option value="">Select Water Availability</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <input type="number" name="landArea" placeholder="Land Area in acres" value={form.landArea} onChange={handleChange} className="border px-4 py-3 rounded-xl" required />
              <input type="number" name="budget" placeholder="Budget in ₹" value={form.budget} onChange={handleChange} className="border px-4 py-3 rounded-xl" required />
            </div>

            <button disabled={loading} className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-lg">
              {loading ? "Generating..." : "Get Recommendation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdvisoryForm;