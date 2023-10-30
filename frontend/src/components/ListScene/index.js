import { useState, useRef } from "react"
import SubSceneSingleObject from "../SubSceneSingleObject";
import models from "../SubScene/models";
import { Gltf, PresentationControls } from "@react-three/drei";

export default function ListScene({setCategory, setList, category}) {

    const [position, setPosition] = useState([4.5, 1.3, -5])
console.log(category)

    return (
        <group position={position}>

        {
            models.map((model) => {
                if (model.category === category) {
                    console.log(model)
                    return <Gltf
                    src={model.src}
                    position={position}
                    rotation={model.rotation}
                  />
                }

            })
        }
      </group>
    )
}
