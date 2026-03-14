import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileBanner from "../components/ProfileBanner";
import { useEffect, useState } from "react";
import MedalBox from "../components/MedalBox";
import MountainBox from "../components/MountainBox";
import Footer from "../components/Footer";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Jane Joe",
    username: "janedoe123",
    bio: `"The impossible journey is the one you never begin" - Dan Millman`
  });

  useEffect(() => {
    const loadProfile = () => {
      const savedData = localStorage.getItem("profileData");
      if (savedData) { setProfile(JSON.parse(savedData)); }
    };

    loadProfile();
    window.addEventListener("profileUpdated", loadProfile);
    
    return () => {
      window.removeEventListener("profileUpdated", loadProfile);
    }; }, []);
    
  return (
    <>
      <Navbar />
      <ProfileBanner profile={profile} />

      {/* Achievements + Mountain Section */}
      <div className="w-[90%] max-w-[1100px] grid grid-cols-1 md:grid-cols-2 text-center mt-10 mb-10 mx-auto gap-15 md:gap-20">
          <MedalBox />
          <MountainBox />
      </div>

      <Footer />
    </>
  );
};

export default Profile;