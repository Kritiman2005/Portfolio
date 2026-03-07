import React, { Suspense, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei"

function StudyModel() {
  const { scene, animations } = useGLTF("/models/typing_in_laptop.glb")
  const { actions }           = useAnimations(animations, scene)

  const posX = 1,    posY = -3,   posZ = -2
  const rotX = 0,    rotY = 0,   rotZ = 0
  const scale = 1.63

  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return
    Object.values(actions)[0].reset().play()
  }, [actions])

  return (
    <primitive
      object={scene}
      position={[posX, posY, posZ]}
      rotation={[rotX, rotY, rotZ]}
      scale={scale}
    />
  )
}

export default function StudyRoom() {
  const camX = -7.5, camY = 6.1,  camZ = -5.9
  const targetX = -0.3, targetY = 2.36, targetZ = 2.85
  const fov = 45
  const ambientInt = 1.2, dirInt = 1.5

  return (
    <Canvas
      camera={{ position: [camX, camY, camZ], fov, near: 0.1, far: 100 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={ambientInt} color="#fff8e7" />
      <directionalLight position={[5, 5, 5]}   intensity={dirInt}       color="#ffe4a0" />
      <directionalLight position={[-3, 3, -3]} intensity={dirInt * 0.4} color="#ffffff" />
      <pointLight position={[0, 3, 1]} intensity={1.2} color="#ffcc66" distance={8} />

      <Suspense fallback={null}>
        <StudyModel />
      </Suspense>

    </Canvas>
  )
}

useGLTF.preload("/models/typing_in_laptop.glb")