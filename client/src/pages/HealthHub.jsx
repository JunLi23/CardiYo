// don't change imports, unless adding new ones, thank you!
import { Outlet } from "react-router-dom";
import React from "react";
import "../styles/HealthHub/HealthHub.css";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/HealthHub/ProfileCard";
import PostBoard from "../components/HealthHub/PostBoard";
import GoalsBox from "../components/HealthHub/Goals";
import Footer from "../components/Footer";

const HealthHub = () => {
  return (
    <>
      <Navbar />

      <div className="w-full px-6 md:px-10 lg:px-16 py-8">
        <div className="mt-6 w-full">
          <ProfileCard />
        </div>

        <div className="mt-6 w-full">
          <GoalsBox />
        </div>

        <div className="mt-6 w-full">
          <PostBoard />
        </div>
      </div>
      <Footer />
      <Outlet />
    </>
  );
};

export default HealthHub;