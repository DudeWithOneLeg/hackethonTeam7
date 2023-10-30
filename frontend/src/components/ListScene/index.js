import { useState, useRef } from "react"
import SubSceneSingleObject from "../SubSceneSingleObject";
import models from "../SubScene/models";
import { Gltf } from "@react-three/drei";

export default function ListScene({setCategory, setList, category}) {

    const [position, setPosition] = useState([4.5, 1.3, -5])


    return (
        <group position={position}>

        {
            models.map((model) => {
                if (model.category) {
                    console.log(model)
                    return <Gltf
                    src={model.src}
                    position={position}
                    rotation={model.rotation}
                //   ref={ref}
                //   onClick={() => {
                //     setCategory(name)
                //     setList(true)
                //     console.log('yo')
                // }}
                  />
                }

            })
        }
      </group>
    )
}
