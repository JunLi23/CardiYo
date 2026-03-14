import everest from "../assets/Everest.svg";
import fuji from "../assets/Everest.svg";
import k2 from "../assets/Everest.svg";

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
    { id: 1, name: "Everest", image: everest, completed: true},
    { id: 2, name: "Mount Fuji", image: fuji, completed: true},
    { id: 3, name: "K2", image: k2, completed: false},
    { id: 4, name: "Chimborazo", image: everest, completed: false},
    { id: 5, name: "Aoraki", image: fuji, completed: false},
    { id: 6, name: "Eiger", image: k2, completed: true},
    { id: 7, name: "Ben Nevis", image: everest, completed: true},
    { id: 8, name: "Mount Kinabalu", image: k2, completed: false},
    ];

const completedMountains = mountains.filter((m) => m.completed);
  return (
    <>
        {/* Mountain Section */}
        <div className="bg-[#5E806D] border-8 border-[#3C5246] pb-5 md:p-0 md:pb-0">
            <h2 className="text-xl pt-2"> Mountains Completed </h2>
            <div className="grid grid-cols-3 justify-items-center mt-3">
                {completedMountains.map((mountain) => (<MountainIcon key={mountain.id} name={mountain.name} image={mountain.image}/>))}
            </div>
        </div>
    </>
  );
};

export default MountainBox;