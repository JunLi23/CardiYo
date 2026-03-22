import { useState, useEffect } from "react";

const BioClouds = () => {
  const [biomarkers, setBiomarkers] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("biomarkers");
    if (saved) {
      setBiomarkers(JSON.parse(saved));
    }
  }, []);

  return (
    <>
      {/* Left Cloud */}
      <div className="absolute left-1/2 md:top-[15%] md:-translate-x-[250%] md:-translate-y-1/3 top-[13%] -translate-x-[150%] -translate-y-1/2">
        <Cloud marker={biomarkers[0]} />
      </div>

      {/* Middle Cloud */}
      <div className="absolute left-1/2 md:top-[3%] md:translate-x-[75%] top-[20%] -translate-x-[60%]">
        <Cloud marker={biomarkers[1]} />
      </div>

      {/* Right Cloud */}
      <div className="absolute left-1/2  md:top-[38%] md:translate-x-[160%] top-[15%] translate-x-[50%] -translate-y-1/2">
        <Cloud marker={biomarkers[2]} />
      </div>
    </>
  );
};

const Cloud = ({marker}) => {
  return (
    <div className="relative w-20 md:w-33 h-auto">
      <img src="/cloud.svg" alt="cloud" className="w-full h-full object-contain"/>

      {marker && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mt-6 flex items-center gap-2">
            <img src={marker.icon} alt="icon" className="w-4 h-4 md:w-8 md:h-8"/>
            <div className=" md:text-[80%] text-[45%] font-bold text-black">
              {marker.value}
            </div>
          </div>
        </div>)}
    </div>
  );
};

export default BioClouds;