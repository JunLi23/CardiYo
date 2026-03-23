// don't change imports, unless adding new ones, thank you!
import { useRef, useState, useEffect } from "react";
import MiniMe from "../../assets/Mini-Me.png";

export default function MountainPath({ progress }) {
  const pathRef = useRef(null);
  const [iconPos, setIconPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      const point = pathRef.current.getPointAtLength(length * (progress / 100));
      setIconPos({ x: point.x, y: point.y });
    }
  }, [progress]);

  return (
    <svg 
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    >
      <path ref={pathRef} d="M 4 93 L 25 59 L 25 63 L 33 54 L 46 15" stroke="lime" strokeWidth="1.5" fill="none" />
    </svg>
  )
}