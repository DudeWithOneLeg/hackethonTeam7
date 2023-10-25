import React, { useRef, useState, useEffect } from "react";
import { ScrollControls, PerspectiveCamera, OrbitControls, Gltf } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Model } from "./Scene";
import { Chair } from "../SingleObject/Chair";
import Navigation from "../Navigation"
import SingleObject from "../SingleObject";


export default function Homespace() {
  const [position, setPosition] = useState([0, 1.85, -4])
  const [hover, setHover] = useState(false)
  const chairRef = useRef()



  useFrame(({ clock }) => {
    if (hover && chairRef.current.position.y < 2.5) {

      chairRef.current.position.y += .01
    }
    else if (!hover && chairRef.current.position.y >= position[1]) {
      chairRef.current.position.y -= .01
    }
  })
  return (
    <>
    <PerspectiveCamera position={[-2,-2, 5]} >
    <OrbitControls />
    <directionalLight position={[5, 5, -8]} castShadow intensity={5} shadow-mapSize={2048} shadow-bias={-0.001}/>

    <axesHelper />
        <Model />
        <ScrollControls>
      {/* <SingleObject/> */}
      <group >

        <Gltf src='../../../models/sofa-set.gltf'
        position={position}
        rotation={[0, 76.92, 0]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        ref={chairRef}
        />
      </group>
        </ScrollControls>

        {/* <Stage environment="city" intensity={1} castShadow={false} >

        </Stage> */}
        <directionalLight intensity={1} castShadow position={[4.553, 2.857, 8.307]} rotation={[-Math.PI / 2, 0, 0.102]} shadow-bias={-0.001} shadow-mapSize={2048}/>
    </PerspectiveCamera>

    </>
  );
}
