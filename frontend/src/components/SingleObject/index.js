import { Chair } from "./Chair";
import { ChairSet } from "./Chair-set-1";
import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { Suspense } from "react";

export default function SingleObject() {

    const [x, setX] = useState(0)
    const [y, setY] = useState(1)
    const [z, setZ] = useState(-3)

    useEffect(() => {

        // Function to handle keydown events
    const handleKeyPress = (event) => {
        // Check if a specific key was pressed, for example, the 'Enter' key with key code 13
        if (event.key === 'ArrowDown') {
          // Perform your desired action here
          setY(y - .05)
        }
        if (event.key === 'ArrowUp') {
            // Perform your desired action here
            setY(y + .05)
          }
      };

      // Attach the event listener when the component mounts
      window.addEventListener('keydown', handleKeyPress);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, [x, y, z])
    const size = .7


  return (
    <group>

      <Chair position={[x + 5, y + 0, z + .5]} rotation={[0, -1.2, 0]} scale={[size,size,size]}/>
      <ChairSet position={[x + 5, y + 1.0, z + .5]} rotation={[0, -1.2, 0]} scale={[size,size,size]}/>
      <Chair position={[x + 5, y + 2.0, z + .5]} rotation={[0, -1.2, 0]} scale={[size,size,size]}/>
      <Chair position={[x + 4, y + 0, z + .5]} rotation={[0, -1.2, 0]} scale={[size,size,size]}/>
      <Chair position={[x + 4, y + 1.0, z + .5]} rotation={[0, -1.2, 0]} scale={[size,size,size]}/>
      <Chair position={[x + 4, y + 2.0, z + .5]} rotation={[0, -1.2, 0]} scale={[size,size,size]}/>
      <Chair position={[x + 3, y + 1.0, z + .5]} rotation={[0, -1.2, 0]} scale={[size,size,size]}/>
      <Chair position={[x + 3, y + 2.0, z + .5]} rotation={[0, -1.2, 0]} scale={[size,size,size]}/>
      <Chair position={[x + 2, y + 1.0, z + .5]} rotation={[0, -1.2, 0]} scale={[size,size,size]}/>
      <Chair position={[x + 2, y + 2.0, z + .5]} rotation={[0, -1.2, 0]} scale={[size,size,size]}/>
      <Chair position={[x + 2, y + 0, z + .5]} rotation={[0, -1.2, 0]} scale={[size,size,size]}/>
      <Chair position={[x + 3, y + 0, z + .5]} rotation={[0, -1.2, 0]} scale={[size,size,size]}/>
    </group>
  );
}
