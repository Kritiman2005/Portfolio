import React, { useState } from 'react'
import Stadium from './Stadium'

function FootballPitch() {
  return (
    <svg
      style={{ position:"absolute", inset:0, width:"100%", height:"100%", zIndex:0 }}
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={i * 100} y="0" width="100" height="600"
          fill={i % 2 === 0 ? "#2d6e1a" : "#286418"} />
      ))}
      <rect x="40" y="40" width="920" height="520" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      <line x1="500" y1="40" x2="500" y2="560" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      <circle cx="500" cy="300" r="80" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      <circle cx="500" cy="300" r="5" fill="rgba(255,255,255,0.7)" />
      <rect x="40" y="165" width="150" height="270" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      <rect x="40" y="235" width="55" height="130" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      <circle cx="150" cy="300" r="4" fill="rgba(255,255,255,0.7)" />
      <path d="M 190 245 A 80 80 0 0 1 190 355" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      <rect x="20" y="255" width="20" height="90" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      <rect x="810" y="165" width="150" height="270" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      <rect x="905" y="235" width="55" height="130" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      <circle cx="850" cy="300" r="4" fill="rgba(255,255,255,0.7)" />
      <path d="M 810 245 A 80 80 0 0 0 810 355" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      <rect x="960" y="255" width="20" height="90" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      <path d="M 40 60 A 20 20 0 0 1 60 40"    fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      <path d="M 940 40 A 20 20 0 0 1 960 60"  fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      <path d="M 40 540 A 20 20 0 0 0 60 560"  fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      <path d="M 960 540 A 20 20 0 0 1 940 560" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      <radialGradient id="floodlight" cx="50%" cy="50%" r="55%">
        <stop offset="0%"   stopColor="rgba(220,255,180,0.18)" />
        <stop offset="60%"  stopColor="rgba(100,200,50,0.06)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
      </radialGradient>
      <rect width="1000" height="600" fill="url(#floodlight)" />
      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="50%"  stopColor="rgba(0,0,0,0)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
      </radialGradient>
      <rect width="1000" height="600" fill="url(#vignette)" />
    </svg>
  )
}

function CornerPhoto({ style, rotate, image, color }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute", ...style,
        width: "18%",
        background: "#fff",
        borderRadius: 3,
        cursor: "pointer",
        transform: hovered
          ? `rotate(0deg) scale(1.08) translateY(-10px)`
          : `rotate(${rotate}deg) scale(1)`,
        boxShadow: hovered
          ? "0 24px 60px rgba(0,0,0,0.8), 0 0 0 3px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.3)"
          : "0 8px 30px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)",
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
        zIndex: hovered ? 10 : 4,
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}
    >
      <div style={{ width:"100%", height:10, background:"#fff", flexShrink:0 }} />
      <div style={{ width:"100%", aspectRatio:"4/3", flexShrink:0, position:"relative", overflow:"hidden" }}>
        {image
          ? <img src={image} alt="" style={{
              width:"100%", height:"100%", objectFit:"cover", display:"block",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.4s ease",
            }} />
          : <div style={{ width:"100%", height:"100%", background: color || "#ccc" }} />
        }
        <div style={{ position:"absolute", top:0, left:0, width:8, bottom:0, background:"#fff", zIndex:2 }} />
        <div style={{ position:"absolute", top:0, right:0, width:8, bottom:0, background:"#fff", zIndex:2 }} />
      </div>
      <div style={{ width:"100%", height:28, background:"#fff", flexShrink:0 }} />
    </div>
  )
}

export default function Second() {
  const [centerHovered, setCenterHovered] = useState(false)

  return (
    /* Outer page — deep green surround */
    <div style={{
      width: "100vw", height: "100vh",
      background: "#0d2e06",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>

      {/* Contained pitch card */}
      <div style={{
        position: "relative",
        width: "82vw",
        height: "82vh",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 3px rgba(255,255,255,0.06), 0 0 60px rgba(30,120,10,0.3)",
      }}>

        <FootballPitch />

        {/* Four corner polaroids */}
        <CornerPhoto style={{ top:"6%", left:"4%" }}     rotate={-8} image="/images/ronaldocomeback.webp" />
        <CornerPhoto style={{ top:"6%", right:"4%" }}    rotate={7}  image="/images/ogs.webp" />
        <CornerPhoto style={{ bottom:"6%", left:"4%" }}  rotate={6}  image="/images/2008ucl.webp" />
        <CornerPhoto style={{ bottom:"6%", right:"4%" }} rotate={-7} image="/images/siralex.webp" />

        {/* Center polaroid with Stadium */}
        <div
          onMouseEnter={() => setCenterHovered(true)}
          onMouseLeave={() => setCenterHovered(false)}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: centerHovered
              ? "translate(-50%, -50%) scale(1.04) translateY(-8px)"
              : "translate(-50%, -50%) scale(1)",
            width: "34%",
            background: "#ffffff",
            borderRadius: 3,
            cursor: "pointer",
            boxShadow: centerHovered
              ? "0 32px 80px rgba(0,0,0,0.9), 0 0 0 4px rgba(255,255,255,0.95), 0 0 50px rgba(255,255,255,0.2), 0 0 80px rgba(60,180,20,0.3)"
              : "0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(60,180,20,0.2)",
            transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease",
            zIndex: centerHovered ? 10 : 5,
            display: "flex", flexDirection: "column", overflow: "hidden",
          }}
        >
          <div style={{ width:"100%", height:14, background:"#fff", flexShrink:0 }} />
          <div style={{
            width:"100%", aspectRatio:"4/3",
            position:"relative", overflow:"hidden",
            background:"linear-gradient(180deg, #e8f4ff 0%, #c0dff5 25%, #90c8e8 48%, #c8cdd1 68%, #a8adb1 85%, #909599 100%)",
            flexShrink:0,
          }}>
            <div style={{
              position:"absolute", inset:0, zIndex:2,
              transform: centerHovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.4s ease",
              transformOrigin: "center center",
            }}>
              <Stadium />
            </div>
          </div>
          <div style={{ position:"absolute", top:14, left:0, width:10, bottom:14, background:"#fff", zIndex:10 }} />
          <div style={{ position:"absolute", top:14, right:0, width:10, bottom:14, background:"#fff", zIndex:10 }} />
          <div style={{ width:"100%", height:36, background:"#fff", flexShrink:0 }} />
        </div>

      </div>
    </div>
  )
}