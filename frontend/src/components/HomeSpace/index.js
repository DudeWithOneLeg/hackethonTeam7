import React, { useRef, useState } from "react";
import { MeshReflectorMaterial, PresentationControls, Stage, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Model } from "./Scene";
import { Chair } from "../SingleObject/Chair";
import SingleObject from "../SingleObject";


export default function Homespace() {
    const chairRef = useRef()
  return (
    <>
    <PerspectiveCamera position={[-4,-1, 2]}>

        <Model />
      <SingleObject/>

        <Stage environment="city" intensity={0.6} castShadow={false}>

        </Stage>
    </PerspectiveCamera>
        
    </>
  );
}
