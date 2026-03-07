import { useAnimations, useGLTF } from "@react-three/drei"
import React, { useEffect, useRef } from "react"
import * as THREE from "three"

export function Avatar({ onGreetingStart, onGreetingDone, ...props }) {
  const group = useRef()
  const { scene, animations } = useGLTF("/models/waving.glb")

  const animationClips = React.useMemo(() => {
    if (!animations || animations.length === 0) return []
    const c = animations[0].clone()
    c.name = "Greeting"
    return [c]
  }, [animations])

  const { actions } = useAnimations(animationClips, group)

  useEffect(() => {
    if (!actions?.Greeting) return

    const action = actions.Greeting

    action.reset()
    action.setLoop(THREE.LoopOnce)
    action.clampWhenFinished = true

    onGreetingStart?.()
    action.play()

    const duration = action.getClip().duration
    const timeout = setTimeout(() => {
      onGreetingDone?.()
    }, duration * 1000)

    return () => {
      clearTimeout(timeout)
      action.stop()
    }
  }, [actions])

  if (!scene) return null

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload("/models/waving.glb")