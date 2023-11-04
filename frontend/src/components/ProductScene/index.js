import { Gltf, PresentationControls } from "@react-three/drei";

export default function ProductScene({ product }) {
  return (
    <group position={[15, 2.5, -8]}>
      <PresentationControls
        cursor={true}
        speed={5}
        polar={[0, 0]} // Vertical limits
        azimuth={[-Infinity, Infinity]} // Horizontal limits
      >
        <Gltf
          src={product.src}
          position={[0, 0, 0]}
          rotation={[0, 5.7, 0]}
          // onLoad={(gltf) => handleModelLoad(gltf)}
        />
      </PresentationControls>
    </group>
  );
}
