import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import PopUp from "../components/HealthHub/PopUp";
import { Fragment } from "react";

const HealthHub = () => {
  return (
    <>
      <Fragment>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h1>Health Hub Page</h1>
      </div>
      {/* </PopUp /> */}
      </Fragment>
    </>
  );
};
export default HealthHub