import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { Navbar, MobileNav, IconButton } from "@material-tailwind/react";

const NavbarComponent = () => {
  const [openNav, setOpenNav] = React.useState(false);

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
        <Link to="/HealthHub" className="p-1 font-normal hover:text-gray-200" style={{ color: "white", textDecoration: "none" }}>
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
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="CardiYo Logo"
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navList}
        </div>

        {/* Mobile hamburger */}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 lg:hidden text-white"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>

      {/* Mobile nav */}
      <MobileNav open={openNav}>{navList}</MobileNav>
    </Navbar>
  );
};

export default NavbarComponent;
