import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import splashBg from '../assets/Splash.jpg';
import blankPf from '../assets/blank-pf.png';
import '../styles/Profile.css';

<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

const Profile = () => {
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

      <div className="achievements">
        <div className="medalstrophies">

          <div className="medal">
            Medals
          </div>

          <div className="trophy">
            Trophies
          </div>

        </div>

        <div className="mountainsComplete">
          Mountains Completed
        </div>
      </div>

    </>
  );
};

export default Profile