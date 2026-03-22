// don't change imports, unless adding new ones, thank you!
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { Navbar, MobileNav, IconButton } from "@material-tailwind/react";
import PopUp from "../components/HealthHub/PopUp";

const NavbarComponent = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHealthHubClick = () => {
  const hasAccess = localStorage.getItem("healthhubAccess");

  if (hasAccess === "true") {
    navigate("/HealthHub");
  } else {
    setShowPopup(true);
  }
};

  const navList = (
    <ul className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <Link to="/Dashboard" className="p-1 font-normal hover:text-gray-200" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/Workouts" className="p-1 font-normal hover:text-gray-200" style={{ color: "white", textDecoration: "none" }}>
          Workouts
        </Link>
      </li>
      <li>
        <Link to="/HealthHub"
          onClick={(e) => {
            const hasAccess = localStorage.getItem("healthhubAccess") === "true";

            if (!hasAccess) {
              e.preventDefault();   // stop navigation
              setShowPopup(true);   // open popup instead
            }
          }}
          className="p-1 font-normal hover:text-gray-200"
          style={{ color: "white", textDecoration: "none" }}
        >
          Health Hub
        </Link>
      </li>
      <li>
        <Link to="/Profile" className="p-1 font-normal hover:text-gray-200" style={{ color: "white", textDecoration: "none" }}>
          Profile
        </Link>
      </li>
      <li>
        <Link to="/Settings" className="p-1 font-normal hover:text-gray-200" style={{ color: "white", textDecoration: "none" }}>
          Settings
        </Link>
      </li>
    </ul>
  );

  return (
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
          <Link to="/LoginSignUp" className="p-1 font-normal transition-colors duration-150" style={{ color: "white", textDecoration: "none" }}
            onMouseEnter={e => e.target.style.color = "#ff4444"}
            onMouseLeave={e => e.target.style.color = "white"}>
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

      {showPopup && (
        <PopUp
          onClose={() => setShowPopup(false)}
          onSuccess={() => {
            localStorage.setItem("healthhubAccess", "true");
            setShowPopup(false);
            navigate("/HealthHub");
          }}
        />
      )}
    </Navbar>
  );
};

export default NavbarComponent;
