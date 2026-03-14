import goldMedel from "../assets/gBadge.png";
import greyMedel from "../assets/greyBadge.png";

const MedalIcon = ({earned, label}) => {
  return (
    <div>
      <img src={earned ? goldMedel : greyMedel} className="w-15 h-15 md:w-20 md:h-20" />
      <div className="mt-1 mb-3 text-sm"> {label} </div>
    </div>
  );
};

const MedalBox = () => {
    const medals = [
        { id: 1, label: "Everest", earned: false },
        { id: 2, label: "Fuji", earned: true },
        { id: 3, label: "K2", earned: true },
        { id: 4, label: "Kilimanjaro", earned: false },
        { id: 5, label: "Blanc", earned: false },
    ];

    return (
    <>
        {/* Achievements Section */}
        <div className="bg-[#5E806D] border-8 border-[#3C5246]">
            
            {/* Medal Section */}
            <h2 className="text-xl pt-2">Medals</h2>
            <div className="grid grid-cols-3 justify-items-center mt-3">
                {medals.map(({ id, earned, label }) => (<MedalIcon key={id} earned={earned} label={label}/>))}
            </div>
            
            {/* Trophy Section */}
            <div className="border-t-8 border-[#3C5246]">
                <h2 className="text-xl pt-2">Trophies</h2>
                <div className="m-3 text-[#DCDCDC]"> No Trophies Earned </div> 
            </div>
        </div>
    </>
  );
};

export default MedalBox;
