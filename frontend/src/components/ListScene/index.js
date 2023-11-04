import { useState } from 'react';
import { Gltf } from '@react-three/drei';
import models from '../SubScene/models'
import { group } from '@react-three/flex'; // Ensure you have the correct import for Flex

export default function ListScene({ setProduct, category, setShowProduct }) {
  const [position] = useState([7.9, 2.8, -10]);
  const rows = 2; // Reduce the number of rows to 2
  const cols = 3;
  const rowSpacing = [3, 2]; // Different row spacings for the two rows
  const colSpacing = [1, 1, 1];
  const objects = [];
  const modelList = models.filter((model) => model.category === category);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const modelIndex = row * cols + col;
      if (modelIndex < modelList.length) {
        const position = [
          col * colSpacing[col], // Use colSpacing for columns
          row * rowSpacing[row], // Use rowSpacing for rows
          0,
        ];
        const modelUrl = modelList[modelIndex].src;
        objects.push(
          <Gltf key={modelIndex} src={modelUrl} position={position} onClick={() => {
            setProduct(modelList[modelIndex])
            setShowProduct(true)
          }}/>
        );
      }
    }
  }

  return (
    <group position={position}>
      {objects}
    </group>
  );
}
