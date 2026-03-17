// don't change imports, unless adding new ones, thank you!
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Report from "./ReportPopUp"
import ProfilePic from "../../assets/blank-pf.png"
import ReportIcon from "../../assets/Report.png"



const ProfileCard = () => {

  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div
        className="relative w-full flex flex-col md:flex-row items-center md:items-start gap-6 p-6 border-4 rounded-2xl"
        style={{ backgroundColor: "#5E806D", borderColor: "#3C5246" }}
      >

        <img
          src={ReportIcon}
          alt="Report"
          onClick={() => setShowPopup(true)}
          className="absolute top-3 right-3 w-6 h-6 cursor-pointer hover:scale-110 transition"
        />
    
        <img
          src={ProfilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-4 border-[#3C5246]"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white w-full">

          <div>
            <h2 className="text-xl font-semibold">Dr. Wilson</h2>
            <p className="text-sm opacity-90">
              Olivtree GP <br />
              4 Evergreen Road <br />
              Edinburgh EH1 1ZZ
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Certfications</h3>
            <p className="text-sm">
              MBBS <br />
              CCT <br />
              RCGP <br />
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Contact</h3>
            <p className="text-sm">
              Phone: 0131 000 000 <br />
              Email: j.wilson@olivetreegp.co.uk
            </p>
          </div>
        </div>

        {showPopup && <Report onClose={() => setShowPopup(false)} />}
      </div>

    </>
  );
};

export default ProfileCard;