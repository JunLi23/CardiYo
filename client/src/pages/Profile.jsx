// don't change imports, unless adding new ones, thank you!
import { Outlet } from "react-router-dom";
import ProfileBanner from "../components/ProfileBanner";
import { useEffect, useState } from "react";
import MedalBox from "../components/MedalBox";
import MountainBox from "../components/MountainBox";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Jane Joe",
    username: "janejoe123",
    bio: "The impossible journey is the one you never begin - Dan Millman"
  });

  useEffect(() => {
    const loadProfile = () => {
      const savedData = sessionStorage.getItem("profileData"); // ← sessionStorage
      if (savedData) { setProfile(JSON.parse(savedData)); }
    };

    loadProfile();
    window.addEventListener("profileUpdated", loadProfile);
    
    return () => {
      window.removeEventListener("profileUpdated", loadProfile);
    };
  }, []);
    
  return (
    <>
      <ProfileBanner profile={profile} />

      {/* Achievements + Mountain Section */}
      <div className="w-[90%] max-w-[1100px] grid grid-cols-1 md:grid-cols-2 text-center mt-10 mb-10 mx-auto gap-15 md:gap-20">
          <MedalBox />
          <MountainBox />
      </div>
    </>
  );
};

export default Profile;