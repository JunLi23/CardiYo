import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import PopUp from "../components/HealthHub/PopUp";
import ProfileCard from "../components/HealthHub/ProfileCard";
import Goals from "../components/HealthHub/Goals";
import PostageBoard from "../components/HealthHub/PostageBoard";
import { Fragment } from "react";

const HealthHub = () => {
  return (
    <>
      <Navbar />
      <div className="p-8 w-full">
        <div className="mt-6 w-full">
          <ProfileCard />
        </div>
        <div className="mt-6 w-full">
          <Goals />
        </div>
        {/* <div className="mt-6 w-full">
          <PostageBoard />
        </div> */}
      </div>
    </>
  );
};

export default HealthHub;