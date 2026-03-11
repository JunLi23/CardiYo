
import Navbar from "../components/Navbar";
import ProfileBanner from "../components/ProfileBanner";
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Jane Joe",
    username: "janejoe123",
    bio: "The impossible journey is the one you never begin - Dan Millman"});

  const [activeForm, setActiveForm] = useState(null);
  const settingsButton = "md:w-75 w-50 mx-auto m-2 bg-[#3C5246] text-white py-2";

  {/* Loads Saved Profile Data From Local Storage */}
  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setProfile(JSON.parse(savedData));
    }}, []);

  return (
    <>
      <Navbar />
      <ProfileBanner profile={profile} />
      {/* Setting Buttons */}
      <div className="w-[90%] max-w-[1100px] grid grid-cols-1 md:grid-cols-2 mt-10 mx-auto">
        <button onClick={() => setActiveForm("editProfile")} className={settingsButton}> Edit Profile </button>
        <button onClick={() => setActiveForm("accountInfo")} className={settingsButton}> Account Information </button>
        <button onClick={() => setActiveForm("editBio")} className={settingsButton}> Edit Biomarkers </button>
        <button onClick={() => setActiveForm("security")} className={settingsButton}> Security </button>
        <button onClick={() => setActiveForm("notify")} className={settingsButton}> Notifications </button>
        <button onClick={() => setActiveForm("accessibility")} className={settingsButton}> Accessibility </button>
        <button onClick={() => navigate("/FAQ")} className={settingsButton}> FAQ </button>
      </div>

      {/* Displays Form */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 md:w-150">
        {activeForm === "editProfile" && (<EditProfileForm setProfile={setProfile} setActiveForm={setActiveForm} /> )}
        {activeForm === "accountInfo" && <AccountForm setActiveForm={setActiveForm}/>}
        {activeForm === "editBio" && <BiomarkerForm setActiveForm={setActiveForm}/>}
        {activeForm === "security" && <SecurityForm setActiveForm={setActiveForm}/>}
        {activeForm === "notify" && <NotificationForm setActiveForm={setActiveForm}/>}
        {activeForm === "accessibility" && <AccessibilityForm setActiveForm={setActiveForm}/>}
      </div>

      <Footer />
    </>
  );
};

{/* Edit Profile Form */}
const EditProfileForm = ({setProfile, setActiveForm}) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = {name, username, bio, photo};
    localStorage.setItem("profileData", JSON.stringify(profileData));
    setProfile(profileData);
    window.dispatchEvent(new Event("profileUpdated"));
    setActiveForm(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form className="relative bg-[#5E806D] text-white border-8 border-[#3C5246] p-6 w-full" onSubmit={handleSubmit}>
      <button type="button" onClick={() => setActiveForm(null)} className="absolute top-4 right-4 text-xl font-bold"> ✕ </button>
      
      <h2 className="text-2xl text-center mb-6">Edit Profile</h2>
      <label className="block mb-4">
        Name <input type="text" className="w-full mt-1 p-2 text-black bg-[#F0ECD1]" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="block mb-4">
        Username <input type="text" className="w-full mt-1 p-2 text-black bg-[#F0ECD1]" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label className="block mb-6">
        Bio <input type="text" className="w-full mt-1 p-2 text-black bg-[#F0ECD1]" value={bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <label className="block mb-6">
        Profile Picture <input type="file" accept="image/*" id="profileUpload" className="hidden" onChange={handleImageUpload} />
        <div className="mt-3">
          <label htmlFor="profileUpload" className="bg-[#C7C8B5] text-black px-4 py-2 rounded cursor-pointer hover:bg-[#d8d2b9]">
            Upload Image
          </label>
        </div>
      </label>
      <button className="bg-[#3C5246] px-4 py-2 ml-auto block mt-6">
        Submit
      </button>
    </form>
  );
};

{/* Account Form */}
const AccountForm = ({setActiveForm}) => (
  <form className="relative bg-[#5E806D] text-white border-8 border-[#3C5246] p-6 w-full">
    <button type="button" onClick={() => setActiveForm(null)} className="absolute top-4 right-4 text-xl font-bold"> ✕ </button>
    <h2 className="text-2xl text-center mb-6">Account Information</h2>
    <button className="bg-[#3C5246] px-4 py-2 ml-auto block mt-6"> Submit </button>
  </form>
);

{/* Biomarker Form */}
const BiomarkerForm = ({ setActiveForm }) => (
  <form className="relative bg-[#5E806D] text-white border-8 border-[#3C5246] p-6 w-full">
    <button type="button" onClick={() => setActiveForm(null)} className="absolute top-4 right-4 text-xl font-bold"> ✕ </button>
    <h2 className="text-2xl text-center mb-4">Edit Biomarkers</h2>
    <div className="grid grid-cols-2 gap-x-10 gap-y-6">
      <label className="flex justify-between items-center">Calories <input className="scale-150 accent-[#3C5246]" type="checkbox" checked/></label>
      <label className="flex justify-between items-center">Heart Rate <input className="scale-150 accent-[#3C5246]" type="checkbox" checked/></label>
      <label className="flex justify-between items-center">Steps <input className="scale-150 accent-[#3C5246]" type="checkbox" checked/></label>
      <label className="flex justify-between items-center">Blood Pressure <input className="scale-150 accent-[#3C5246]" type="checkbox"/></label>
      <label className="flex justify-between items-center">Distance <input className="scale-150 accent-[#3C5246]" type="checkbox"/></label>
      <label className="flex justify-between items-center">Cholesterol <input className="scale-150 accent-[#3C5246]" type="checkbox"/></label>
      <label className="flex justify-between items-center">Blood Sugar <input className="scale-150 accent-[#3C5246]" type="checkbox"/></label>
      <label className="flex justify-between items-center">O2 Levels <input className="scale-150 accent-[#3C5246]" type="checkbox"/></label>
    </div>
    <button className="bg-[#3C5246] px-4 py-2 ml-auto block mt-6"> Submit </button>
  </form>
);

{/* Security Form */}
const SecurityForm = ({ setActiveForm }) => (
  <form className="relative bg-[#5E806D] text-white border-8 border-[#3C5246] p-6 w-full">
    <button type="button" onClick={() => setActiveForm(null)} className="absolute top-4 right-4 text-xl font-bold"> ✕ </button>
    <h2 className="text-2xl text-center mb-6">Security</h2>
  </form>
);

{/* Notification Form */}
const NotificationForm = ({ setActiveForm }) => (
  <form className="relative bg-[#5E806D] text-white border-8 border-[#3C5246] p-6 w-full">
    <button type="button" onClick={() => setActiveForm(null)} className="absolute top-4 right-4 text-xl font-bold"> ✕ </button>
    <h2 className="text-2xl text-center mb-6">Notifications</h2>
  </form>
);
{/* Accessibility Form */}
const AccessibilityForm = ({ setActiveForm }) => (
  <form className="relative bg-[#5E806D] text-white border-8 border-[#3C5246] p-6 w-full">
    <button type="button" onClick={() => setActiveForm(null)} className="absolute top-4 right-4 text-xl font-bold"> ✕ </button>
    <h2 className="text-2xl text-center mb-6">Accessibility</h2>
  </form>
);

export default Settings;