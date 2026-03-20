import { useRef, useState, useEffect } from 'react'; 

export default function ClimbingOverLay( { progress } ){
    const pathProgress = useRef(null);
    const [pathLength, setPathLength] = useState(0);
    const [iconPos, setIconPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (pathProgress.current) {
        const length = pathProgress.current.getTotalLength();
        const point = pathProgress.current.getPointAtLength(length * (progress / 100));
        setIconPos({ x: point.x, y: point.y });
        setPathLength(length);
        }
    }, [progress]);

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
        }}
        >
        <path
            d="M 10 333 L 213 222 L 232 230 L 300 205 L 454 57" 
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeDasharray="8 6"
            strokeWidth="6" 
        />

        <path
            ref={pathProgress}
            d="M 10 333 L 213 222 L 232 230 L 300 205 L 454 57" 
            fill="none"
            stroke="lime"
            strokeWidth="6" 
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength - (progress / 100) * pathLength}
            style={{ transition: 'stroke-dashoffset 1s ease' }}
        />

        <g transform={`translate(${iconPos.x}, ${iconPos.y})`}>
        <circle
            cx={0}
            cy={0}
            r={16}
            fill="white"
            stroke="#2d6a4f"
            strokeWidth="4"
        />
        </g>

        {progress >= 100 && (
        <g>
            <line
            x1={454} y1={57}
            x2={454} y2={20}
            stroke="white"
            strokeWidth="3"
            />
            <polygon
            points="454,20 480,30 454,40"
            fill="red"
            />
        </g>
        )}

        </svg>
        )
};