// don't change imports, unless adding new ones, thank you!
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import Logo from "../assets/Logo.png";
import { Navbar, MobileNav } from "@material-tailwind/react";
import PopUp from "../components/HealthHub/PopUp";

// Icons for pages
import DashboardIcon from "../assets/DashboardIcon.png";
import WorkoutsIcon from "../assets/WorkoutsIcon.png";
import HealthHubIcon from "../assets/HealthHubIcon.png";
import ProfileIcon from "../assets/ProfileIcon.png";
import SettingsIcon from "../assets/SettingsIcon.png";
import LogoutIcon from "../assets/logout.png";

const NavbarComponent = () => {
  const [openNav, setOpenNav] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [logoutHover, setLogoutHover] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <Link
          to="/Dashboard"
          className="p-1 font-normal hover:text-gray-200 flex items-center gap-2"
          style={{ color: "white", textDecoration: "none" }}
        >
          <img src={DashboardIcon} alt="Dashboard" className="h-4 w-4 object-contain" />
          Dashboard
        </Link>
      </li>
      <li>
        <Link
          to="/Workouts"
          className="p-1 font-normal hover:text-gray-200 flex items-center gap-2"
          style={{ color: "white", textDecoration: "none" }}
        >
          <img src={WorkoutsIcon} alt="Workouts" className="h-6 w-6 object-contain" />
          Workouts
        </Link>
      </li>
      <li>
        <Link
          to="/HealthHub"
          onClick={(e) => {
            const hasAccess = sessionStorage.getItem("healthhubAccess") === "true"; // ← sessionStorage
            if (!hasAccess) {
              e.preventDefault();
              setShowPopup(true);
            }
          }}
          className="p-1 font-normal hover:text-gray-200 flex items-center gap-2"
          style={{ color: "white", textDecoration: "none" }}
        >
          <img src={HealthHubIcon} alt="HealthHub" className="h-5 w-5 object-contain" />
          Health Hub
        </Link>
      </li>
      <li>
        <Link
          to="/Profile"
          className="p-1 font-normal hover:text-gray-200 flex items-center gap-2"
          style={{ color: "white", textDecoration: "none" }}
        >
          <img src={ProfileIcon} alt="Profile" className="h-4 w-4 object-contain" />
          Profile
        </Link>
      </li>
      <li>
        <Link
          to="/Settings"
          className="p-1 font-normal hover:text-gray-200 flex items-center gap-2"
          style={{ color: "white", textDecoration: "none" }}
        >
          <img src={SettingsIcon} alt="Settings" className="h-5 w-5 object-contain" />
          Settings
        </Link>
      </li>
      <li>
      <Link
        to="/LoginSignUp"
        className="p-1 font-normal hover:text-red-400 flex items-center gap-2"
        style={{ color: "white", textDecoration: "none" }}
        onClick={() => {
          sessionStorage.removeItem("healthhubAccess");
          sessionStorage.removeItem("activeMountainId");
          sessionStorage.removeItem("profileData");
        }}
      >
        <img src={LogoutIcon} alt="Logout" className="h-5 w-5 object-contain" />
        Logout
      </Link>
    </li>
    </ul>
  );

  return (
    <>
      <Navbar
        className="sticky top-0 z-10 h-max max-w-full rounded-none shadow-none border-0 px-4 py-2 lg:px-8 lg:py-4"
        style={{ backgroundColor: "#AEB9A1" }}
      >
        <div className="flex items-center justify-between w-full text-white">
          <Link to="/Dashboard" className="flex items-center">
            <img
              src={Logo}
              alt="CardiYo Logo"
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navList}
           <Link to="/LoginSignUp"
              className="p-1 font-normal transition-colors duration-150 flex items-center gap-2"
              style={{ color: logoutHover ? "#ff4444" : "white", textDecoration: "none" }}
              onMouseEnter={() => setLogoutHover(true)}
              onMouseLeave={() => setLogoutHover(false)}
              onClick={() => {
                sessionStorage.removeItem("healthhubAccess");
                sessionStorage.removeItem("activeMountainId");
                sessionStorage.removeItem("profileData");
              }}
            >
              <img src={LogoutIcon} alt="Logout" className="h-5 w-5 object-contain" style={{ filter: logoutHover ? "brightness(0) saturate(100%) invert(27%) sepia(91%) saturate(1352%) hue-rotate(316deg) brightness(110%)" : "none", transition: "filter 150ms" }} />
              Logout
            </Link>
          </div>

          <div className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6 text-white cursor-pointer"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => setOpenNav(!openNav)}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>

        <div className="lg:hidden">
          <MobileNav open={openNav}>{navList}</MobileNav>
        </div>
      </Navbar>

      {showPopup && ReactDOM.createPortal(
        <PopUp
          onClose={() => setShowPopup(false)}
          onSuccess={() => {
            sessionStorage.setItem("healthhubAccess", "true");
            setShowPopup(false);
            navigate("/HealthHub");
          }}
        />,
        document.body
      )}
    </>
  );
};

export default NavbarComponent;