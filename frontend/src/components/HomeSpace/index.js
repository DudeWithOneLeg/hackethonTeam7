import React, { useRef, useState, useEffect } from "react";
import { ScrollControls, PerspectiveCamera, OrbitControls, Gltf, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { Model } from "./Scene";
import Navigation from "../Navigation"
import SubScene from "../SubScene";


export default function Homespace() {
  const [position, setPosition] = useState([1, -4, 2])
  const [category, setCategory] = useState('')
  const [rotation, setRotation] = useState([.8, .5, 0])
  const [hover, setHover] = useState(false)
  const [list, setList] = useState(false)
  const [home, setHome] = useState(true)
  const [signup, setSignup] = useState(false)
  const [constant, setConstant] = useState(10)
  const cameraRef = useRef(null)

  const signupPos = (cameraRef, pX, pY, pZ, rX, rY, rZ) => {
    if (cameraRef.current.position.y < -3) cameraRef.current.position.y += (-3 - pY) / constant
      if (cameraRef.current.position.y > -3) cameraRef.current.position.y -= (pY - -3) / constant
      if (cameraRef.current.position.x < 8) cameraRef.current.position.x += (8 - pX) / constant
      if (cameraRef.current.position.x > 8) cameraRef.current.position.x -= (pX - 8) / constant
      if (cameraRef.current.position.z < 16) cameraRef.current.position.z += (16 - pZ) / constant
      if (cameraRef.current.position.z > 16) cameraRef.current.position.z -= (pZ - 16) / constant

      if (cameraRef.current.rotation.y < -.7) cameraRef.current.rotation.y += (-.7 - rY) / constant
      if (cameraRef.current.rotation.y > -.7) cameraRef.current.rotation.y -= (rY - -.7) / constant
      if (cameraRef.current.rotation.x < 0) cameraRef.current.rotation.x += (0 - rX) / constant
      if (cameraRef.current.rotation.x > 0) cameraRef.current.rotation.x -= (rX - 0) / constant
      if (cameraRef.current.rotation.z < 0) cameraRef.current.rotation.z += (0 - rZ) / constant
      if (cameraRef.current.rotation.z > 0) cameraRef.current.rotation.z -= (rZ - 0) / constant
  }

  const defaultPos = (cameraRef, pX, pY, pZ, rX, rY, rZ) => {
    if (cameraRef.current.position.y < position[1]) cameraRef.current.position.y += (position[1] - pY) / constant
      if (cameraRef.current.position.y > position[1]) cameraRef.current.position.y -= (pY - position[1]) / constant
      if (cameraRef.current.position.x < position[0]) cameraRef.current.position.x += (position[0] - pX) / constant
      if (cameraRef.current.position.x > position[0]) cameraRef.current.position.x -= (pX - position[0]) / constant
      if (cameraRef.current.position.z < position[2]) cameraRef.current.position.z += (position[2] - pZ) / constant
      if (cameraRef.current.position.z > position[2]) cameraRef.current.position.z -= (pZ - position[2]) / constant

      if (cameraRef.current.rotation.y <  rotation[1]) cameraRef.current.rotation.y += (rotation[1] - rY) / constant
      if (cameraRef.current.rotation.y >  rotation[1]) cameraRef.current.rotation.y -= (rY - rotation[1]) / constant
      if (cameraRef.current.rotation.x < rotation[0]) cameraRef.current.rotation.x += (rotation[0] - rX) / constant
      if (cameraRef.current.rotation.x >  rotation[0]) cameraRef.current.rotation.x -= (rX - rotation[0]) / constant
      if (cameraRef.current.rotation.z <  rotation[2]) cameraRef.current.rotation.z += (rotation[2] - rZ) / constant
      if (cameraRef.current.rotation.z >  rotation[2]) cameraRef.current.rotation.z -= (rZ - rotation[2]) / constant
  }


  useEffect(()=> {
    if (signup) {

      setPosition([8, -3, 16])
      setRotation([0, -.7, 0])
    }
    if (!signup) {
      setPosition([1, -4, 2])
      setRotation([.8, .7, 0])

    }
  },[signup])

  useEffect(() => {
    if (list) {
      setPosition([-7.5, -5, 11])
      setRotation([.1, .1, 0])
    }
    if (!list) {
      setPosition([1, -4, 2])
      setRotation([.8, .5, 0])
    }
  }, [list])

  useEffect(() => {
    if (home) {
      setPosition([1, -4, 2])
      setRotation([.8, .5, 0])
    }
  }, [home])

  useFrame(() => {

    const pY = cameraRef.current.position.y
    const pX = cameraRef.current.position.x
    const pZ = cameraRef.current.position.z

    const rY = cameraRef.current.rotation.y
    const rX = cameraRef.current.rotation.x
    const rZ = cameraRef.current.rotation.z

    if (signup) {
      signupPos(cameraRef, pX, pY, pZ, rX, rY, rZ)

    }
    if (home) {
      defaultPos(cameraRef, pX, pY, pZ, rX, rY, rZ)
    }

    if (list) {
      defaultPos(cameraRef, pX, pY, pZ, rX, rY, rZ)
    }


  })


  //signup [-2,-2, 5]
  //position 2 position={[8, -3, 16]} rotation={[0, -.7, 0]}
  return (
    <>
    <Html>
      {signup || list ? <h1
      onClick={() => {
        setList(false)
        setSignup(false)
        setHome(true)
      }}
      >Back</h1> : <>
      <h1
      style={{color: 'white'}}
      onClick={() => {
        setSignup(true)
        setHome(false)
        setList(false)
      }}
      >Signup</h1>
      </>
      }
    </Html>
    <PerspectiveCamera position={[1, -4, 2]} rotation={[.8, .5, 0]} camera={ { fov: 40}} ref={cameraRef}>
    <OrbitControls />
    <directionalLight position={[5, 5, -8]} castShadow intensity={5} shadow-mapSize={2048} shadow-bias={-0.001}/>

    <axesHelper />
        <Model />
        {/* <ScrollControls> */}
      {/* <SingleObject/> */}
      <SubScene hover={hover} setHover={setHover} setCategory={setCategory} setList={setList}/>
        {/* </ScrollControls> */}


        <directionalLight intensity={1} castShadow position={[4.553, 2.857, 8.307]} rotation={[-Math.PI / 2, 0, 0.102]} shadow-bias={-0.001} shadow-mapSize={2048}/>
    </PerspectiveCamera>

    </>
  );
}
