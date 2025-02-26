import { AsciiRenderer, Center, OrbitControls, Text3D } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

const font = '/Inter_Regular.json';

export default function J() {
  return (
    <div className='w-full h-full'>
      <Canvas>
        <JRender />
        <AsciiRenderer fgColor='white' bgColor='transparent' />

        <color attach='background' args={['black']} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <OrbitControls makeDefault enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

function JRender() {
  const ref = useRef();
  const viewport = useThree((state) => state.viewport);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime / 3;
  });

  return (
    <Center ref={ref}>
      <Text3D
        font={font}
        curveSegments={32}
        bevelEnabled
        bevelSize={0.04}
        bevelThickness={0.1}
        height={0.5}
        lineHeight={0.5}
        letterSpacing={-0.06}
        size={1.5}
        scale={Math.min(viewport.width, viewport.height) / 2.5}
      >
        J
        <meshNormalMaterial />
      </Text3D>
    </Center>
  );
}
