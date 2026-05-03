import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-green-50">
      <nav className="bg-[#064b2a] text-white px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">AgriGuide 🌱</h1>

          <div className="flex gap-6 items-center text-sm font-semibold">
            <a href="#features">Features</a>
            <a href="#how">How it Works</a>
            <Link to="/login" className="border border-white px-4 py-2 rounded-lg">
              Login
            </Link>
            <Link to="/signup" className="bg-white text-green-800 px-4 py-2 rounded-lg">
              Register
            </Link>
          </div>
        </div>
      </nav>

      <section
        className="min-h-135 bg-cover bg-center flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35), rgba(255,255,255,0.35)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-4xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-green-900">
            Smart Crop Advisory
          </h1>
          <p className="mt-5 text-xl text-gray-900 font-medium">
            Get smart crop recommendations based on soil, season, water availability and budget.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/signup"
              className="bg-green-700 text-white px-7 py-3 rounded-xl font-bold hover:bg-green-800"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-green-800 px-7 py-3 rounded-xl font-bold hover:bg-green-50"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-6 -mt-20 grid md:grid-cols-4 gap-6">
        {[
          ["🤖", "AI Powered", "Smart crop suggestions with intelligent advisory."],
          ["🌱", "Soil Based", "Recommendations based on soil type."],
          ["💧", "Water Aware", "Considers available water resources."],
          ["💰", "Profit Focused", "Shows expected profit and farming tips."],
        ].map((item) => (
          <div key={item[1]} className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl">{item[0]}</div>
            <h3 className="font-bold text-green-800 mt-3">{item[1]}</h3>
            <p className="text-gray-600 text-sm mt-2">{item[2]}</p>
          </div>
        ))}
      </section>

      <section id="how" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-green-800 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-bold text-green-800">1. Register</h3>
            <p className="text-gray-600 mt-2">Create your farmer account.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-bold text-green-800">2. Fill Details</h3>
            <p className="text-gray-600 mt-2">Enter soil, season, land and budget.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-bold text-green-800">3. Get Result</h3>
            <p className="text-gray-600 mt-2">View recommended crop and advice.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;