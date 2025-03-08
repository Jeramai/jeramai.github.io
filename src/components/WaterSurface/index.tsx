'use client';

import { useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { PlaneGeometry, Vector2 } from 'three';
import WaterMesh from './Water/Mesh';

type Props = {
  children?: React.ReactNode;
  position?: [number, number, number];
  width?: number;
  length?: number;
  color?: number | string;
  scale?: number;
  flowDirection?: Vector2 | [number, number];
  flowSpeed?: number;
  dimensions?: number;
  reflectivity?: number;
  fxDistortionFactor?: number;
  fxDisplayColorAlpha?: number;
};

const DEFAULT_FLOW_DIRECTION = new Vector2(1.0, 0.5);
export default function WaterSurface({
  position,
  width = 190,
  length = 190,
  color,
  scale = 11,
  flowDirection = DEFAULT_FLOW_DIRECTION,
  flowSpeed = 0.02,
  dimensions = 1024,
  reflectivity = 1.2,
  fxDistortionFactor = 0.2,
  fxDisplayColorAlpha = 0.0
}: Readonly<Props>) {
  const ref = useRef<WaterMesh>(null);

  const gl = useThree((state) => state.gl);
  const [waterNormals1, waterNormals2] = useTexture(['/water/Water_1_M_Normal.jpg', '/water/Water_2_M_Normal.jpg']);

  const geom = useMemo(() => new PlaneGeometry(width, length), [length, width]);
  const config = useMemo(
    () => ({
      color: color,
      scale: scale,
      flowDirection: flowDirection as Vector2,
      flowSpeed: flowSpeed,
      textureWidth: dimensions,
      textureHeight: dimensions,
      normalMap0: waterNormals1,
      normalMap1: waterNormals2,
      reflectivity: reflectivity,
      encoding: (gl as any).encoding,
      fxDistortionFactor: fxDistortionFactor,
      fxDisplayColorAlpha: fxDisplayColorAlpha
    }),
    [
      color,
      dimensions,
      flowDirection,
      flowSpeed,
      fxDisplayColorAlpha,
      fxDistortionFactor,
      gl,
      reflectivity,
      scale,
      waterNormals1,
      waterNormals2
    ]
  );
  const waterObj = useMemo(() => new WaterMesh(geom, config), [geom, config]);

  return <primitive ref={ref} object={waterObj} rotation-x={-Math.PI / 2} position={position} />;
}
