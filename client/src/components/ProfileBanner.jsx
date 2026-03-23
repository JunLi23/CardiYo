// don't change imports, unless adding new ones, thank you!
import { useRef } from "react";
import splashBg from "../assets/Splash.jpg";
import blankPf from "../assets/blank-pf.png";
import cameraIcon from "../assets/camera.svg";

const ProfileBanner = ({ profile, editable, onPhotoChange }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onPhotoChange && onPhotoChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* Splash Background */}
      <div className="w-full">
        <img src={splashBg} alt="" className="w-full h-60 md:h-75 border-y-8 border-[#3C5246]" />
      </div>

      {/* Displays Profile Photo (blankPf By Default) */}
      <div className="absolute -translate-y-1/2 -translate-x-1/2 left-1/2">
        <div className="relative group w-35 h-35 md:w-45 md:h-45">
          <img src={profile.photo || blankPf} alt="" className="w-full h-full object-cover border-8 border-[#3C5246] rounded-full" />
          {editable && (
            <>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              <div onClick={() => fileInputRef.current.click()} className="absolute inset-0 rounded-full flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <img src={cameraIcon} alt="change photo" className="w-26 h-26 opacity-30" style={{ filter: "brightness(0)" }} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Profile Description (Displays Name, Username, Bio) */}
      <div className="bg-[#C7C8B5] border-b-8 border-[#3C5246] pt-19 pb-4 md:pt-25 md:pb-5 text-center text-black">  
        <div className="text-lg md:text-xl font-semibold"> {profile.name} </div>
        <div className="text-sm"> {'@' + profile.username} </div>
        <div className="text-lg md:text-xl italic pt-2"> {'"'+ profile.bio + '"'} </div>
      </div>
    </>
  );
};

export default ProfileBanner;
