import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import splashBg from '../assets/Splash.jpg';
import blankPf from '../assets/blank-pf.png';
import { useState } from "react";
import '../styles/Profile.css';
import '../styles/Settings.css';
import '../styles/LoginSignUp.css';

<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

const Settings = () => {
  const [activeForm, setActiveForm] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="splashBg">
        <img src ={splashBg} alt="" />
      </div>
        
      <div className="contain">
        <div className="profileContain">

          <div className="profilePic">
            <img src ={blankPf} alt="" />
          </div>

        </div>

        <div className="textDescription">

          <div className="name">
            Jane Joe
          </div>
          <div className="username">
            janejoe123
          </div>
          <div className="description">
            "The impossible journey is the one you never begin" - Dan Millman
          </div>

        </div> 

      </div>

      <div className="settingsLayout">

      <div className="settingButtons"> 

        <button onClick={() => setActiveForm("editProfile")}> Edit Profile </button>

        <button onClick={() => setActiveForm("accountInfo")}> Account Information </button>

        <button onClick={() => setActiveForm("editBio")}> Edit Biomarkers </button>

        <button onClick={() => setActiveForm("security")}> Security </button>

        <button onClick={() => setActiveForm("notify")}> Notifications </button>

        <button onClick={() => setActiveForm("accessibility")}> Accessibility </button>

        <button className="faq" onClick={() => navigate("/FAQ")}> FAQ </button>

      </div>


      <div className="settingForms">
        {activeForm === "editProfile" && <EditProfileForm />}
        {activeForm === "accountInfo" && <AccountForm />}
        {activeForm === "editBio" && <BiomarkerForm />}
        {activeForm === "security" && <SecurityForm />}
        {activeForm === "notify" && <NotificationForm />}
        {activeForm === "accessibility" && <AccessibilityForm />}
      </div>

      </div>

      <Footer />
    </>
  );
};

const EditProfileForm = () => {
  return (
    <form>
      <h2> Edit Profile </h2>

      <p>First Name: </p>
      <input type="text" placeholder="First Name" />

      <p>Surname: </p>
      <input type="text" placeholder="Surname" />

      <p>Bio: </p>
      <input type="text" placeholder="Bio" />

      <button type="submit"> Enter </button>

    </form>
  );
};

const AccountForm = () => {
  return (
    <form>
      <h2> Account Information </h2>

      <button> Enter </button>
    </form>
  );
};

const BiomarkerForm = () => {
  return (
    <form>
      <h2> Edit Biomarkers </h2>
      <h3> Change biomarkers displayed in the dashboard </h3>

      <div className="row1">
      <label> Calories: <input type="checkbox" name="calories"/> </label>

      <label> Heart Rate: <input type="checkbox" name="calories"/> </label>

      <label> Steps: <input type="checkbox" name="calories"/> </label>

      <label> Blood Pressure: <input type="checkbox" name="calories"/> </label>
      </div>

      <div className="row2">
      <label> Distance: <input type="checkbox" name="calories"/> </label>

      <label> Cholestrol: <input type="checkbox" name="calories"/> </label>

      <label> Blood Sugar: <input type="checkbox" name="calories"/> </label>

      <label> 02 Levels: <input type="checkbox" name="calories"/> </label>
      </div>

      <button> Enter </button>
    </form>
  );
};

const SecurityForm = () => {
  return (
    <form>
      <h2> Security </h2>

      <button> Enter </button>
    </form>
  );
};

const NotificationForm = () => {
  return (
    <form>
      <h2> Notification </h2>

      <button> Enter </button>
    </form>
  );
};

const AccessibilityForm = () => {
  return (
    <form>
      <h2> Accessibility </h2>

      <button> Enter </button>
    </form>
  );
};
export default Settings