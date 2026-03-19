// don't change imports, unless adding new ones, thank you!
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileBanner from "../components/ProfileBanner";
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import flame from "../assets/flame.png";
import bloodpressure from "../assets/blood-pressure.png";
import heart from "../assets/heart.png";
import o2 from "../assets/o2.png";
import sneaker from "../assets/sneaker.png";
import walking from "../assets/walking.png";

const Settings = () => {

  const [profile, setProfile] = useState({
    name: "Jane Joe",
    username: "janejoe123",
    bio: "The impossible journey is the one you never begin - Dan Millman"});

  const [activeForm, setActiveForm] = useState(null);
  const [logoutHover, setLogoutHover] = useState(false);
  const navigate = useNavigate();
  const settingsButton = "md:w-75 w-50 mx-auto m-2 bg-[#3C5246] text-white py-2";

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
      <div className="w-[90%] max-w-[1100px] grid grid-cols-1 md:grid-cols-2 mt-10 mx-auto mb-10">
        <button onClick={() => setActiveForm("editProfile")} className={settingsButton}> Edit Profile </button>
        <button onClick={() => setActiveForm("accountInfo")} className={settingsButton}> Account Information </button>
        <button onClick={() => setActiveForm("editBio")} className={settingsButton}> Edit Biomarkers </button>
        <button onClick={() => setActiveForm("security")} className={settingsButton}> Security </button>
        <button onClick={() => setActiveForm("notify")} className={settingsButton}> Notifications </button>
        <button onClick={() => setActiveForm("accessibility")} className={settingsButton}> Accessibility </button>
        <button onClick={() => navigate("/FAQ")} className={settingsButton}> FAQ </button>
        <button
          onClick={() => navigate("/LoginSignUp")}
          onMouseEnter={() => setLogoutHover(true)}
          onMouseLeave={() => setLogoutHover(false)}
          className="md:w-75 w-50 mx-auto m-2 py-2"
          style={{ backgroundColor: logoutHover ? "#cc0000" : "#3C5246", color: logoutHover ? "white" : "#ff2222" }}
        > Log Out </button>
      </div>

      {/* Displays Form */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 md:w-150">
        {activeForm === "editProfile" && (<EditProfileForm setProfile={setProfile} setActiveForm={setActiveForm} /> )}
        {activeForm === "accountInfo" && <AccountForm profile={profile} setActiveForm={setActiveForm}/>}
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
    <form className="relative bg-[#5E806D] text-white border-8 border-[#3C5246] p-6 w-full rounded-2xl" onSubmit={handleSubmit}>
      <button type="button" onClick={() => setActiveForm(null)} className="absolute top-4 right-4 text-xl font-bol rounded-2xl"> ✕ </button>
      
      <h2 className="md:text-2xl md:text-center text-xl mb-6">Edit Profile</h2>
      <label className="block mb-4"> Name 
        <input type="text" className="w-full mt-1 p-2 text-black bg-[#F0ECD1] rounded-2xl" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="block mb-4"> Username 
        <input type="text" className="w-full mt-1 p-2 text-black bg-[#F0ECD1] rounded-2xl" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label className="block mb-4"> Bio 
        <input type="text" className="w-full mt-1 p-2 text-black bg-[#F0ECD1] rounded-2xl" value={bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <label className="block mb-4"> Profile Picture 
        <input type="file" accept="image/*" id="profileUpload" className="hidden" onChange={handleImageUpload} />
        <div className="mt-3 rounded-2xl">
          <label htmlFor="profileUpload" className="bg-[#3C5246] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#d8d2b9]"> Upload Image </label>
        </div>
      </label>

      <button className="bg-[#3C5246] px-4 py-2 ml-auto block mt-6 rounded-2xl"> Submit </button>
    </form>
  );
};

{/* Account Form */}
const AccountForm = ({setActiveForm, profile}) => (
  <form className="relative bg-[#5E806D] text-white border-8 border-[#3C5246] p-6 w-full rounded-2xl">
    <button type="button" onClick={() => setActiveForm(null)} className="absolute top-4 right-4 text-xl font-bold rounded-2xl"> ✕ </button>
      
    <h2 className="md:text-2xl md:text-center text-xl mb-6">Account Information</h2>
    <label className="block mb-4"> Name: {profile.name} </label>
    <label className="block mb-4"> Username: @{profile.username} </label>
    <label className="block mb-4"> Date of Birth <input type="date" className="w-full mt-1 p-2 text-black bg-[#F0ECD1] rounded-2xl"/> </label>
    <label className="block mb-4">  Country 
      <select className="w-full mt-1 p-2 text-black bg-[#F0ECD1] rounded-2xl">
        <option>United Kingdom</option>
        <option>Other</option>
      </select>
    </label>

    <button className="bg-[#3C5246] px-4 py-2 ml-auto block mt-6"> Submit </button>
  </form>
);

{/* Biomarker Form */}
const BiomarkerForm = ({ setActiveForm }) => {
  const [checkedItems, setCheckedItems] = useState(Object.fromEntries(biomarkerOptions.map((item) => [item.id, false])));
  
  const handleChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const selected = biomarkerOptions
      .filter(item => checkedItems[item.id])
      .map(item => ({
        id: item.id,
        name: item.label,
        value: biomarkerData[item.id],
        icon: item.icon,
    }));
    localStorage.setItem("biomarkers", JSON.stringify(selected));
    setActiveForm(null);
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative bg-[#5E806D] text-white border-8 border-[#3C5246] p-6 w-full rounded-2xl">
      <button type="button" onClick={() => setActiveForm(null)} className="absolute top-4 right-4 text-xl font-bold"> ✕ </button>

      <h2 className="md:text-2xl md:text-center text-xl mb-6">Edit Biomarkers</h2>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        {biomarkerOptions.map((item) => (
          <label key={item.id} className="flex justify-between items-center"> {item.name}
              <input type="checkbox" checked={checkedItems[item.id]} onChange={() => handleChange(item.id)} className="scale-150 accent-[#3C5246]"/>
          </label>
        ))}
      </div>

      <button className="bg-[#3C5246] px-4 py-2 ml-auto block mt-6"> Submit </button>
    </form>
  );
};

{/* Security Form */}
const SecurityForm = ({ setActiveForm }) => (
  <form className="relative bg-[#5E806D] text-white border-8 border-[#3C5246] p-6 w-full rounded-2xl">
    <button type="button" onClick={() => setActiveForm(null)} className="absolute top-4 right-4 text-xl font-bold"> ✕ </button>
    
    <h2 className="md:text-2xl md:text-center text-xl mb-6">Security</h2>
      <div className="flex justify-between items-center mb-2"> 
        <span>Enable Two-Step Verification</span> 
        <div className="flex gap-2"> 
          <button type="button" className="bg-[#3C5246] px-4 py-1 mt-2 mx-1">Yes</button> 
          <button type="button" className="bg-[#C7C8B5] px-4 py-1 mt-2">No</button> 
        </div> 
      </div>
    <div className="mb-4"> 
      <button type="button" className="bg-[#3C5246] px-4 py-2 mt-5" > Log Out of All Devices </button> 
    </div>
  </form>
);

{/* Notification Form */}
const NotificationForm = ({ setActiveForm }) => (
  <form className="relative bg-[#5E806D] text-white border-8 border-[#3C5246] p-6 w-full rounded-2xl">
    <button type="button" onClick={() => setActiveForm(null)} className="absolute top-4 right-4 text-xl font-bold"> ✕ </button>

    <h2 className="md:text-2xl md:text-center text-xl mb-6">Notifications</h2>
    <div className="flex justify-between items-center mb-4"> 
      <span>Enable Notifications</span>
      <div className="flex gap-2"> 
        <button type="button" className="bg-[#3C5246] px-4 py-1" > Yes </button> 
        <button type="button" className="bg-[#C7C8B5] px-4 py-1" > No </button> 
      </div> 
    </div>
  </form>
);

{/* Accessibility Form */}
const AccessibilityForm = ({ setActiveForm }) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  const toggleDark = (enable) => {
    setDarkMode(enable);
    localStorage.setItem("darkMode", enable);
    document.body.classList.toggle("dark", enable);
  };

  return (
    <form className="relative bg-[#5E806D] text-white border-8 border-[#3C5246] p-6 w-full rounded-2xl">
      <button type="button" onClick={() => setActiveForm(null)} className="absolute top-4 right-4 text-xl font-bold"> ✕ </button>

      <h2 className="md:text-2xl md:text-center text-xl mb-6">Accessibility</h2>
      <div className="flex justify-between items-center">
        <span>Dark Mode</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => toggleDark(true)} className={`px-4 py-1 mt-2 ${darkMode ? "bg-[#3C5246] ring-2 ring-white" : "bg-[#C7C8B5]"}`}>Yes</button>
          <button type="button" onClick={() => toggleDark(false)} className={`px-4 py-1 mt-2 ${!darkMode ? "bg-[#3C5246] ring-2 ring-white" : "bg-[#C7C8B5]"}`}>No</button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span>Large Text</span>
        <div className="flex gap-2">
          <button type="button" className="bg-[#3C5246] px-4 py-1 mt-2">Yes</button>
          <button type="button" className="bg-[#C7C8B5] px-4 py-1 mt-2">No</button>
        </div>
      </div>
    </form>
  );
};

const biomarkerOptions = [
  { id: "calories", name: "Calories", icon: flame},
  { id: "heartRate", name: "Heart Rate", icon: heart},
  { id: "steps", name: "Steps", icon: sneaker},
  { id: "bloodPressure", name: "Blood Pressure", icon: bloodpressure},
  { id: "distance", name: "Distance", icon: walking},
  { id: "cholesterol", name: "Cholesterol", icon: flame},
  { id: "bloodSugar", name: "Blood Sugar", icon: bloodpressure},
  { id: "o2Levels", name: "O2 Levels", icon: o2},
];

const biomarkerData = {
  calories: "1,200kcal",
  heartRate: "72bpm",
  steps: "8,543",
  bloodPressure: "120/80",
  distance: "5.2km",
  cholesterol: "180mg/dL",
  bloodSugar: "95mg/dL",
  o2Levels: "98%",
};

export default Settings;