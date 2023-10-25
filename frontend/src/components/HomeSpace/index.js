import React, { useRef, useState, useEffect } from "react";
import { ScrollControls, PerspectiveCamera, OrbitControls, Gltf, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Model } from "./Scene";
import { Chair } from "../SingleObject/Chair";
import Navigation from "../Navigation"
import SingleObject from "../SingleObject";


export default function Homespace() {
  const [position, setPosition] = useState([-2, -2, 5])
  const [sofaPosition, setsofaPosition] = useState([0, 1.85, -4])
  const [rotation, setRotation] = useState([0, 0, 0])
  const [hover, setHover] = useState(false)
  const [signup, setSignup] = useState(false)
  const chairRef = useRef()

  useEffect(()=> {
    if (signup) {

      setPosition([8, -3, 16])
      setRotation([0, -.7, 0])
    }
    if (!signup) {
      setPosition([-2, -2, 5])
      setRotation([0, 0, 0])
    }
  },[signup])

  useFrame(({ clock }) => {
    if (hover && chairRef.current.position.y < 2.5) {

      chairRef.current.position.y += .01
    }
    else if (!hover && chairRef.current.position.y >= sofaPosition[1]) {
      chairRef.current.position.y -= .01
    }
  })
  //signup [-2,-2, 5]
  //position 2 position={[8, -3, 16]} rotation={[0, -.7, 0]}
  return (
    <>
    <Html>
      {signup ? <h1
      onClick={() => setSignup(false)}
      >Back</h1> : <h1
      style={{color: 'white'}}
      onClick={() => {
        setSignup(true)
      }}
      >Signup</h1>}
    </Html>
    <PerspectiveCamera position={position} rotation={rotation} camera={ { rotation:[0, -5, 0], fov: 40}}>
    <OrbitControls />
    <directionalLight position={[5, 5, -8]} castShadow intensity={5} shadow-mapSize={2048} shadow-bias={-0.001}/>

    <axesHelper />
        <Model />
        <ScrollControls>
      {/* <SingleObject/> */}
      <group >

        <Gltf src='../../../models/sofa-set.gltf'
        position={[0, 1.85, -4]}
        rotation={[0, 76.92, 0]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        ref={chairRef}
        />
      </group>
        </ScrollControls>


        <directionalLight intensity={1} castShadow position={[4.553, 2.857, 8.307]} rotation={[-Math.PI / 2, 0, 0.102]} shadow-bias={-0.001} shadow-mapSize={2048}/>
    </PerspectiveCamera>

    </>
  );
}
