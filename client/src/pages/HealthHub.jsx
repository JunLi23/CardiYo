import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const HealthHub = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h1>Health Hub Page</h1>
      </div>
    </>
  );
};
export default HealthHub