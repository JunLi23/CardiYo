// don't change imports, unless adding new ones, thank you!
import aoraki from "../assets/aoraki.png";
import benNevis from "../assets/ben-nevis.png";
import chimborazo from "../assets/chimborazo.png";
import eiger from "../assets/eiger.png";
import fuji from "../assets/fuji.png";
import matterhorn from "../assets/matterhorn.png";
import mountAnnapurna from "../assets/mount-annapurna.png";
import mountKinabalu from "../assets/mount-kinabalu.png";
import everest from  "../assets/Everest.svg";

const MountainIcon = ({name, image}) => {
  return (
    <div>
      <img src={image} alt={name} className="w-15 h-15 md:w-20 md:h-20 object-cover rounded-full" />
      <p className="mt-2 mb-4 text-sm">{name}</p>
    </div>
  );
};

const MountainBox = () => {
  const mountains = [
    { id: 1, name: "Aoraki", image: aoraki, completed: true},
    { id: 2, name: "Ben Nevis", image: benNevis, completed: true},
    { id: 3, name: "Chimborazo", image: chimborazo, completed: true},
    { id: 4, name: "Eiger", image: eiger, completed: false},
    { id: 5, name: "Fuji", image: fuji, completed: false},
    { id: 6, name: "Matterhorn", image: matterhorn, completed: true},
    { id: 7, name: "Annapurna", image: mountAnnapurna, completed: true},
    { id: 8, name: "Kinabalu", image: mountKinabalu, completed: false},
    { id: 9, name: "Everest", image: everest, completed: true},
  ];

  const completedMountains = mountains.filter((m) => m.completed);

  return (
    <>
      {/* Mountain Section */}
      <div className="bg-[#5E806D] border-8 border-[#3C5246] pb-5 md:p-0 md:pb-0 rounded-2xl">
          <h2 className="text-xl pt-2"> Mountains Completed </h2>

          <div className="grid grid-cols-3 justify-items-center mt-3">
              {completedMountains.map((mountain) => (<MountainIcon key={mountain.id} name={mountain.name} image={mountain.image}/>))}
          </div>
      </div>
    </>
  );
};

export default MountainBox