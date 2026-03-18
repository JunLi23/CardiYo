// don't change imports, unless adding new ones, thank you!
import goldMedel from "../assets/gBadge.png";
import greyMedel from "../assets/greyBadge.png";

const MedalIcon = ({name}) => {
  return (
    <div>
      <img src={goldMedel} className="w-15 h-15 md:w-20 md:h-20" />
      <div className="mt-1 mb-3 text-sm"> {name} </div>
    </div>
  );
};

const MedalBox = () => {
  const medals = [
    { id: 1, name: "Aoraki", earned: true},
    { id: 2, name: "Ben Nevis", earned: true},
    { id: 3, name: "Chimborazo", earned: true},
    { id: 4, name: "Eiger", earned: false},
    { id: 5, name: "Fuji", earned: false},
    { id: 6, name: "Matterhorn", earned: true},
    { id: 7, name: "Annapurna", earned: true},
    { id: 8, name: "Kinabalu", earned: false},
    { id: 9, name: "Everest", earned: true},
  ];

  const completedMedals = medals.filter((m) => m.earned);

  return (
    <>
      {/* Achievements Section */}
      <div className="bg-[#5E806D] border-8 border-[#3C5246]">
            
        {/* Medal Section */}
        <h2 className="text-xl pt-2">Medals</h2>

        <div className="grid grid-cols-3 justify-items-center mt-3">
          {completedMedals.map((medal) => (<MedalIcon key={medal.id} name={medal.name} image={medal.goldMedel}/>))}
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
