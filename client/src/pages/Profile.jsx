import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h1>Profile Page</h1>
      </div>
    </>
  );
};

export default Profile