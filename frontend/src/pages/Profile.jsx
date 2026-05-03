import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    location: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        setProfile(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put("/users/profile", {
        name: profile.name,
        location: profile.location,
      });

      setProfile(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Profile updated ✅");
    } catch (error) {
      alert(error.response?.data?.message || "Profile update failed");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      await API.put("/users/change-password", passwords);
      alert("Password changed ✅");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#eaf6ee]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-green-800 mb-8">
          👤 My Profile
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Profile Information
            </h2>

            <form onSubmit={updateProfile} className="space-y-5">
              <div>
                <label className="font-semibold">Name</label>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full border px-4 py-3 rounded-xl mt-2"
                />
              </div>

              <div>
                <label className="font-semibold">Email</label>
                <input
                  value={profile.email}
                  disabled
                  className="w-full border px-4 py-3 rounded-xl mt-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="font-semibold">Location</label>
                <input
                  name="location"
                  value={profile.location}
                  onChange={handleProfileChange}
                  className="w-full border px-4 py-3 rounded-xl mt-2"
                />
              </div>

              <button className="w-full bg-green-700 text-white py-3 rounded-xl font-bold">
                Update Profile
              </button>
            </form>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Change Password
            </h2>

            <form onSubmit={changePassword} className="space-y-5">
              <input
                type="password"
                name="currentPassword"
                placeholder="Current password"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                className="w-full border px-4 py-3 rounded-xl"
                required
              />

              <input
                type="password"
                name="newPassword"
                placeholder="New password"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="w-full border px-4 py-3 rounded-xl"
                required
              />

              <button className="w-full bg-green-700 text-white py-3 rounded-xl font-bold">
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;