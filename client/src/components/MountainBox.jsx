import everest from "../assets/everest.svg";
import fuji from "../assets/everest.svg";
import k2 from "../assets/everest.svg";
const MountainIcon = ({name, image}) => {
  return (
    <div>
      <img src={image} alt={name} className="w-15 h-15 md:w-20 md:h-20 object-cover rounded-full" />
      <p className="mt-2 text-sm">{name}</p>
    </div>
  );
};
const MountainBox = () => {
    const mountains = [
    { id: 1, name: "Everest", image: everest, completed: true },
    { id: 2, name: "Fuji", image: fuji, completed: true },
    { id: 3, name: "K2", image: k2, completed: false },
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