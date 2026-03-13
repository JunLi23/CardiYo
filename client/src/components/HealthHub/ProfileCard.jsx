import React from "react";
import { Link } from "react-router-dom";
import ProfilePic from "../../assets/blank-pf.png"

const ProfileCard = () => {
  return (
    <div className="w-full max-w-md mx-auto flex items-center gap-4 p-4 border-4 rounded-2xl"
         style={{ backgroundColor: "#5E806D", borderColor: "#3C5246" }}>
      
      <img
        src={ProfilePic}
        alt="Profile"
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
      />

      <h2 className="text-white text-lg sm:text-xl font-semibold">
        Dr. Wilson
      </h2>
      <h3> 
        Olivtree GP 
        4 Elderstreet Road,
        Edinburgh EH1 1ZZ
      </h3>

    </div>
  );
};

export default ProfileCard;