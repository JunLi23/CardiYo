import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="w-full p-6">
        <Outlet />
      </div>
    </>
  );
};
export default App

