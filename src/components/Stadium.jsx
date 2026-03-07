import React, { Suspense, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, useGLTF, useAnimations } from "@react-three/drei"

function StadiumModel() {
  const { scene, animations } = useGLTF("/models/stadium.glb")
  const { actions }           = useAnimations(animations, scene)

  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return
    Object.values(actions)[0].reset().play()
  }, [actions])

  return (
    <primitive
      object={scene}
      position={[13, 71, 26]}
      rotation={[-0.3, 0.06, 0.81]}
      scale={1.80}
    />
  )
}

export default function Stadium() {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      gl={{ alpha: true }}
    >
      <PerspectiveCamera
        makeDefault
        position={[200, 343, -40]}
        fov={45}
        near={0.1}
        far={5000}
        onUpdate={cam => cam.lookAt(-90, -33, -73)}
      />

      <ambientLight intensity={0.4} />
      <directionalLight position={[100, 200, 100]}   intensity={3.3} />
      <directionalLight position={[-100, 100, -100]} intensity={3.3 * 0.4} />
      <pointLight position={[0, 200, 0]} intensity={2.0} distance={1000} />

      <Suspense fallback={null}>
        <StadiumModel />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload("/models/stadium.glb")