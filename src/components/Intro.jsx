import React, { useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Avatar } from "./Avatar"

export default function Intro({ isActive = true }) {
  const [showBubble, setShowBubble] = useState(false)
  const [isHovered,  setIsHovered]  = useState(false)
  const [showInfo,   setShowInfo]   = useState(false)
  const [isVisible,  setIsVisible]  = useState(false)
  const wrapperRef = useRef(null)

  // Every time chapter becomes active: reset first, then remount avatar
  // This ensures greeting replays on every visit
  useEffect(() => {
    if (isActive) {
      // Reset immediately so avatar unmounts fully
      setIsVisible(false)
      setShowBubble(false)
      setShowInfo(false)
      // Then remount after a short delay — avatar will replay greeting from scratch
      const t = setTimeout(() => setIsVisible(true), 300)
      return () => clearTimeout(t)
    } else {
      setIsVisible(false)
      setShowBubble(false)
      setShowInfo(false)
    }
  }, [isActive])

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-screen overflow-hidden flex flex-col md:flex-row"
      style={{
        background: "linear-gradient(180deg, #55ccf0 0%, #a8e4f7 40%, #e0f4fc 75%, #ffffff 100%)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* LEFT */}
      <div
        className="w-full md:w-1/2 h-full flex flex-col justify-center z-20"
        style={{
          paddingLeft:"10%", paddingRight:"4%", paddingBottom:"4%",
          opacity:   showInfo ? 1 : 0,
          transform: showInfo ? "translateX(0)" : "translateX(-40px)",
          transition:"all 0.8s ease",
        }}
      >
        <h1 style={{ fontSize:"clamp(28px,5.5vw,64px)", fontWeight:800, color:"#0a1628", lineHeight:1.05, letterSpacing:"-1px" }}>
          KRITIMAN <br/> TALUKDAR
        </h1>
        <div style={{ height:2, width:60, background:"#0ea5e9", margin:"20px 0" }} />
        <h2 style={{ fontSize:"clamp(14px,1.8vw,22px)", fontWeight:600, color:"#2563eb" }}>
          Full Stack AI Developer
        </h2>
        <div style={{
          display:"flex", gap:8, flexWrap:"wrap", marginTop:22,
          opacity: showInfo ? 1 : 0,
          transform: showInfo ? "translateY(0)" : "translateY(10px)",
          transition:"opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
        }}>
          {["Web Dev","AI / ML","App Dev"].map(t => (
            <div key={t} style={{ border:"1px solid rgba(14,165,233,0.35)", borderRadius:20, padding:"4px 12px", color:"rgba(10,22,40,0.5)", fontSize:11, fontWeight:500 }}>{t}</div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 h-full relative z-10">
        <Canvas camera={{ position:[0,0,6], fov:42 }} gl={{ alpha:true }} style={{ background:"transparent", width:"100%", height:"100%" }}>
          <ambientLight intensity={1.4} />
          <directionalLight position={[5,8,5]}  intensity={1.8} />
          <directionalLight position={[-3,2,-3]} intensity={0.5} />
          <pointLight position={[0,4,3]} intensity={0.6} color="#c8eefa" />
          <Suspense fallback={null}>
            {/* Only mount Avatar once section is active — prevents early animation */}
            {isVisible && (
              <Avatar
                position={[-0.9,-1.5,0]} scale={0.9} rotation={[6.5,0,0]}
                onGreetingStart={() => { setShowBubble(true); setShowInfo(true) }}
                onGreetingDone={()  => { setShowBubble(true); setShowInfo(true) }}
              />
            )}
          </Suspense>
        </Canvas>

        {/* Bubble */}
        <div style={{
          position:"absolute", top:"20%", left:"-8%", zIndex:30,
          opacity:    showBubble ? 1 : 0,
          transform:  showBubble ? "scale(1) translateY(0)" : "scale(0.6) translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)",
          animation:  showBubble ? "float 3s ease-in-out infinite" : "none",
        }}>
          <div style={{ position:"absolute", right:-16, top:"50%", transform:"translateY(-50%)", width:0, height:0, borderTop:"9px solid transparent", borderBottom:"9px solid transparent", borderLeft:"16px solid rgba(255,255,255,0.92)" }} />
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              background:"rgba(255,255,255,0.92)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
              borderRadius:18, padding:"14px 20px", display:"flex", alignItems:"center", gap:9,
              transform:  isHovered ? "scale(1.07) rotate(-2deg)" : "scale(1)",
              boxShadow:  isHovered ? "0 18px 50px rgba(14,165,233,0.3)" : "0 6px 28px rgba(14,165,233,0.15)",
              transition: "all 0.3s ease",
            }}
          >
            <span style={{ fontSize:15, fontWeight:700, color:"#0f1e3a" }}>Nice to meet you!</span>
            <span style={{ fontSize:21, display:"inline-block", animation:showBubble?"wave 0.8s ease 0.3s 2":"none", transformOrigin:"70% 70%" }}>👋</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes wave  { 0%{transform:rotate(0deg)} 15%{transform:rotate(25deg)} 30%{transform:rotate(-15deg)} 45%{transform:rotate(20deg)} 60%{transform:rotate(-10deg)} 75%{transform:rotate(12deg)} 100%{transform:rotate(0deg)} }
      `}</style>
    </div>
  )
}