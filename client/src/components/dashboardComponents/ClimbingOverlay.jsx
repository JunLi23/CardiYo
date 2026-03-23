import { useRef, useState, useEffect } from 'react'; 
import MiniMe from "../../assets/Mini-Me.png"

const mountainPaths = {
  1: "M 10 333 L 213 222 L 232 230 L 300 205 L 454 57",  // Everest
  2: "M 80 310 L 140 260 L 157 230 L 165 228 L 180 197 L 191 190 L 200 160 L 214 154 L 223 130 L 290 106 L 357 108 L 370 100 L 380 94 L 410 98 L 420 94 L 480 100 L 513 90 L 522 79",  // Ben Nevis
};

export default function ClimbingOverLay( { progress, id } ){
    console.log("ClimbOverlay rendered with id:", id, "progress:", progress);
    const pathProgress = useRef(null);
    const [pathLength, setPathLength] = useState(0);
    const [iconPos, setIconPos] = useState({ x: 0, y: 0 });

    const currentPath = mountainPaths[id] ?? mountainPaths[1];
    console.log("currentPath:", currentPath); 

    useEffect(() => {
        if (pathProgress.current) {
        const length = pathProgress.current.getTotalLength();
        const point = pathProgress.current.getPointAtLength(length * (progress / 100));
        setIconPos({ x: point.x, y: point.y });
        setPathLength(length);
        }
    }, [progress, id]);

    return(
        <svg
        viewBox="0 0 1000 380"
        preserveAspectRatio="none"  
        style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
        }
        }
        >
        <path
            d={currentPath}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeDasharray="8 6"
            strokeWidth="6" 
        />

        <path
            ref={pathProgress}
            d={currentPath} 
            fill="none"
            stroke="lime"
            strokeWidth="6" 
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength - (progress / 100) * pathLength}
            style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
    
         <g transform={`translate(${iconPos.x}, ${iconPos.y})`}>
            <image
                href={MiniMe}
                x={-20}
                y={-20}
                width={40}
                height={40}
            />
            </g>
        <circle
            cx={0}
            cy={0}
            r={16}
            fill="white"
            stroke="#2d6a4f"
            strokeWidth="4"
        />
        </g>

        </svg>
        )
        
};