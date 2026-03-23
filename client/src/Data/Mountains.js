import imgEverest from "../assets/Everest_cropped.svg";
import imgBenNevis from "../assets/BenNevis.png"; // temporary image
import imgFuji from "../assets/fuji.png";

export const mountains = [
  { id: 1, name: "Everest",    img: imgEverest, progress: 70, distance: 5160  },
  { id: 2, name: "Ben Nevis",  img: imgBenNevis, progress: 0, distance: 3000 }, // temporary image, no svg yet
  { id: 3, name: "Mount Fuji", img: imgFuji, progress: 0, distance: 0, locked: true },
  { id: 4, name: "Coming Soon", locked: true },
  { id: 5, name: "Coming Soon", locked: true },
  { id: 6, name: "Coming Soon", locked: true },
  { id: 7, name: "Coming Soon", locked: true },
  { id: 8, name: "Coming Soon", locked: true },
];