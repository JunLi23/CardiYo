import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Settings = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h1>Settings Page</h1>
      </div>
    </>
  );
};
export default Settings