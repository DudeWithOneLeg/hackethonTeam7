import { Chair } from "./Chair";
import { ChairSet } from "./Chair-set-1";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";

export default function SingleObject() {

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [z, setZ] = useState(-1)

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


  return (
    <>

      <Chair position={[x + 5, y + 0, z + .5]} rotation={[0, -1.2, 0]} />
      <ChairSet position={[x + 5, y + 1.3, z + .5]} rotation={[0, -1.2, 0]} />
      <Chair position={[x + 5, y + 2.6, z + .5]} rotation={[0, -1.2, 0]} />
      <Chair position={[x + 4, y + 0, z + .5]} rotation={[0, -1.2, 0]} />
      <Chair position={[x + 4, y + 1.3, z + .5]} rotation={[0, -1.2, 0]} />
      <Chair position={[x + 4, y + 2.6, z + .5]} rotation={[0, -1.2, 0]} />
      <Chair position={[x + 3, y + 1.3, z + .5]} rotation={[0, -1.2, 0]} />
      <Chair position={[x + 3, y + 2.6, z + .5]} rotation={[0, -1.2, 0]} />
      <Chair position={[x + 2, y + 1.3, z + .5]} rotation={[0, -1.2, 0]} />
      <Chair position={[x + 2, y + 2.6, z + .5]} rotation={[0, -1.2, 0]} />
      <Chair position={[x + 2, y + 0, z + .5]} rotation={[0, -1.2, 0]} />
      <Chair position={[x + 3, y + 0, z + .5]} rotation={[0, -1.2, 0]} />
    </>
  );
}
