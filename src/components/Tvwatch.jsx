import React, { Suspense, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, useGLTF, useAnimations } from "@react-three/drei"

function TVSeeingModel() {
  const { scene, animations } = useGLTF("/models/tv_seeing.glb")
  const { actions }           = useAnimations(animations, scene)

  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return
    Object.values(actions)[0].reset().play()
  }, [actions])

  return (
    <primitive
      object={scene}
      position={[-0.1, 1.03, 0.05]}
      rotation={[0.06, -0.77, 0.01]}
      scale={0.75}
    />
  )
}

export default function TVRoom() {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      gl={{ alpha: true }}
      camera={{ position: [0, 2, 4], fov: 45, near: 0.01, far: 10000 }}
    >
      <PerspectiveCamera
        makeDefault
        position={[0, 2, 4]}
        fov={45}
        near={0.01}
        far={10000}
        onUpdate={cam => cam.lookAt(0, 1, 0)}
      />

      {/* Key light — bright white from top-left */}
      <directionalLight position={[3, 8, 4]}  intensity={1.5} color="#ffffff" />
      {/* Fill light — soft cool from right */}
      <directionalLight position={[-4, 4, 2]} intensity={0.2} color="#ddeeff" />
      {/* Rim light — white from behind for edge glow */}
      <directionalLight position={[0, 3, -6]} intensity={1.0} color="#ffffff" />
      {/* Low ambient so shadows aren't pitch black */}
      <ambientLight intensity={0.3} color="#ffffff" />
      {/* Floor bounce — warm light from below */}
      <pointLight position={[0, -1, 2]} intensity={0.8} color="#fff5e0" distance={8} />
      {/* Top spotlight — studio cone from above */}
      <spotLight
        position={[0, 10, 2]}
        angle={0.35}
        penumbra={0.8}
        intensity={4.0}
        color="#ffffff"
      />

      <Suspense fallback={null}>
        <TVSeeingModel />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload("/models/tv_seeing.glb")