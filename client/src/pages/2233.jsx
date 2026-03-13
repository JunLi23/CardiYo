import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import PopUp from "../components/HealthHub/PopUp";
import ProfileCard from "../components/HealthHub/ProfileCard";
import { Fragment } from "react";

const HealthHub = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h1>Push Chat and Notification page</h1>
      </div>
    </>
  );
};
export default HealthHub