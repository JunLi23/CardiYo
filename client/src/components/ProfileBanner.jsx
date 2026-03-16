import splashBg from "../assets/Splash.jpg";
import blankPf from "../assets/blank-pf.png";
const ProfileBanner = ({ profile }) => {
  return (
    <>
      {/* Splash Background */}
      <div className="w-full">
        <img src={splashBg} alt="" className="w-full h-60 md:h-75 border-y-8 border-[#3C5246]" />
      </div>

      {/* Displays Profile Photo (blankPf By Default) */}
      <div className="absolute -translate-y-1/2 -translate-x-1/2 left-1/2">
        <img src={profile.photo || blankPf} alt="" className="w-35 h-35 md:w-45 md:h-45 object-cover border-8 border-[#3C5246] rounded-full" />
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
