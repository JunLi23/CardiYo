import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Workouts = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h1>Workouts Page</h1>
      </div>
    </>
  );
};
export default Workouts