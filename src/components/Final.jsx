import React, { useState, useEffect, useRef } from 'react'
import Intro      from './Intro'
import FirstModel from './First'
import Second     from './Second'
import Third      from './Third'

const CHAPTERS = [
  {
    id: "intro",
    label: "Chapter I",
    title: "Intro",
    subtitle: "Who I am",
    color: "#55ccf0",
    icon: "⚡",
    mapPos: { top: "18%", left: "12%" },
    component: Intro,
  },
  {
    id: "desktop",
    label: "Chapter II",
    title: "Know Me",
    subtitle: "What I build",
    color: "#4a90d9",
    icon: "🖥",
    mapPos: { top: "18%", right: "12%" },
    component: FirstModel,
  },
  {
    id: "stadium",
    label: "Chapter III",
    title: "My Love",
    subtitle: "What I love",
    color: "#4caf50",
    icon: "❤️",
    mapPos: { bottom: "22%", left: "12%" },
    component: Second,
  },
  {
    id: "watching",
    label: "Chapter IV",
    title: "The Screen",
    subtitle: "How I unwind",
    color: "#e50914",
    icon: "🎬",
    mapPos: { bottom: "22%", right: "12%" },
    component: Third,
  },
]

function DustMotes({ count = 16, color = "rgba(200,169,110,0.55)" }) {
  return Array.from({ length: count }).map((_, i) => (
    <div key={i} style={{
      position: "absolute",
      left: `${8 + (i * 43 % 84)}%`,
      top:  `${8 + (i * 61 % 84)}%`,
      width:  i % 3 === 0 ? 2 : 1,
      height: i % 3 === 0 ? 2 : 1,
      borderRadius: "50%",
      background: color,
      opacity: 0.45,
      animation: `mote${i % 3} ${7 + i % 5}s ease-in-out infinite`,
      animationDelay: `${i * 0.5}s`,
      pointerEvents: "none",
    }} />
  ))
}

function BookCover({ onOpen }) {
  const [unrolling, setUnrolling] = useState(false)
  const [hover,     setHover]     = useState(false)

  const handleClick = () => {
    if (unrolling) return
    setUnrolling(true)
    setTimeout(onOpen, 1400)
  }

  const ROLL_H  = 36
  const PARCH_H = "min(340px, 52vh)"

  return (
    <div style={{
      width:"100%", height:"100%",
      background:"#0e0b07",
      backgroundImage:"url('/images/treasuremap3.webp')",
      backgroundSize:"cover",
      backgroundPosition:"center",
      backgroundRepeat:"no-repeat",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      position:"relative", overflow:"hidden",
      fontFamily:"'Georgia','Times New Roman',serif",
    }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 70% 50% at 50% 50%, rgba(180,130,60,0.10) 0%, transparent 70%)" }}/>
      <DustMotes />

      <div style={{
        position:"relative",
        display:"flex", flexDirection:"row", alignItems:"stretch",
        width: unrolling ? "min(92vw, 1000px)" : "min(56vw, 560px)",
        transition: unrolling ? "width 1.3s cubic-bezier(0.22,1,0.36,1)" : "none",
      }}>

        {/* LEFT CYLINDER */}
        <div style={{
          width: ROLL_H, flexShrink:0,
          background:"linear-gradient(90deg,#5a3208 0%,#a07030 18%,#e8c870 38%,#f5db90 50%,#e0b850 62%,#9a6820 82%,#4a2808 100%)",
          borderRadius:"50%",
          boxShadow:"inset 2px 0 6px rgba(255,255,255,0.12), 4px 0 18px rgba(0,0,0,0.6), -2px 0 8px rgba(0,0,0,0.4)",
          position:"relative", zIndex:3,
          display:"flex", flexDirection:"column", justifyContent:"space-between",
          paddingTop:6, paddingBottom:6,
        }}>
          {[15,28,42,56,70,84].map(pct=>(
            <div key={pct} style={{ position:"absolute", top:`${pct}%`, left:0, right:0, height:1, background:"rgba(0,0,0,0.12)"}}/>
          ))}
          <div style={{ height:8, background:"linear-gradient(180deg,#7a4a14,#c09030)", borderRadius:"50% 50% 0 0", marginLeft:2, marginRight:2 }}/>
          <div style={{ height:8, background:"linear-gradient(0deg,#7a4a14,#c09030)", borderRadius:"0 0 50% 50%", marginLeft:2, marginRight:2 }}/>
        </div>

        {/* PARCHMENT BODY */}
        <div
          onClick={handleClick}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            flex:1,
            height: PARCH_H,
            background:"linear-gradient(160deg,#f5ead6 0%,#ede0c4 40%,#e8d5b0 70%,#f0e4c8 100%)",
            position:"relative", overflow:"hidden",
            cursor: unrolling ? "default" : "pointer",
            boxShadow: hover && !unrolling
              ? "0 8px 40px rgba(0,0,0,0.5), 0 0 24px rgba(200,169,110,0.08)"
              : "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ position:"absolute",inset:0,pointerEvents:"none",opacity:0.4,
            backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")` }}/>
          <div style={{ position:"absolute",top:0,left:0,right:0,height:18,
            background:"linear-gradient(180deg,rgba(0,0,0,0.14),transparent)", pointerEvents:"none"}}/>
          <div style={{ position:"absolute",bottom:0,left:0,right:0,height:18,
            background:"linear-gradient(0deg,rgba(0,0,0,0.12),transparent)", pointerEvents:"none"}}/>

          <div style={{
            position:"absolute", inset:0,
            display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center",
            padding:"24px 40px", textAlign:"center", gap:10,
            opacity: unrolling ? 0 : 1,
            transition:"opacity 0.4s ease",
            pointerEvents:"none",
          }}>
            <div style={{display:"flex",alignItems:"center",gap:10,width:"100%"}}>
              <div style={{flex:1,height:1,background:"rgba(100,60,20,0.2)"}}/>
              <span style={{fontSize:12,color:"rgba(130,80,25,0.35)"}}>✦</span>
              <div style={{flex:1,height:1,background:"rgba(100,60,20,0.2)"}}/>
            </div>
            <div style={{fontSize:"clamp(30px,5vw,54px)",fontWeight:700,color:"rgba(45,22,6,0.88)",letterSpacing:"-0.5px",lineHeight:1}}>
              Welcome Pirate
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10,width:"100%"}}>
              <div style={{flex:1,height:1,background:"rgba(100,60,20,0.2)"}}/>
              <span style={{fontSize:12,color:"rgba(130,80,25,0.35)"}}>✦</span>
              <div style={{flex:1,height:1,background:"rgba(100,60,20,0.2)"}}/>
            </div>
            <div style={{
              marginTop:6, fontSize:8, fontFamily:"monospace",
              letterSpacing:4, textTransform:"uppercase",
              color: hover ? "rgba(100,60,20,0.55)" : "rgba(100,60,20,0.28)",
              transition:"color 0.3s ease",
            }}>click to unroll</div>
          </div>

          {unrolling && (
            <div style={{
              position:"absolute", inset:0,
              display:"flex", alignItems:"center", justifyContent:"center",
              animation:"parchReveal 1.3s cubic-bezier(0.22,1,0.36,1) forwards",
            }}>
              <svg width="100%" height="100%" viewBox="0 0 560 340" preserveAspectRatio="xMidYMid slice" style={{opacity:0.3}}>
                <ellipse cx="280" cy="170" rx="230" ry="148" fill="#d4a84b" opacity="0.5"/>
                <path d="M 100,130 Q 200,90 280,100 Q 380,110 460,130 Q 500,180 460,230 Q 380,260 280,250 Q 180,240 100,210 Z" fill="#c49030" opacity="0.4"/>
                <path d="M 140,150 Q 200,130 280,140 Q 360,150 420,170 Q 380,200 280,195 Q 180,190 140,170 Z" fill="#dbb84e" opacity="0.3"/>
              </svg>
              <div style={{position:"absolute",fontSize:10,fontFamily:"monospace",letterSpacing:4,textTransform:"uppercase",color:"rgba(80,45,12,0.4)"}}>
                time to conquer....
              </div>
            </div>
          )}
        </div>

        {/* RIGHT CYLINDER */}
        <div style={{
          width: ROLL_H, flexShrink:0,
          background:"linear-gradient(90deg,#4a2808 0%,#9a6820 18%,#e0b850 38%,#f5db90 50%,#e8c870 62%,#a07030 82%,#5a3208 100%)",
          borderRadius:"50%",
          boxShadow:"inset -2px 0 6px rgba(255,255,255,0.12), -4px 0 18px rgba(0,0,0,0.6), 2px 0 8px rgba(0,0,0,0.4)",
          position:"relative", zIndex:3,
          display:"flex", flexDirection:"column", justifyContent:"space-between",
          paddingTop:6, paddingBottom:6,
          transform: unrolling ? "translateX(min(18vw, 200px))" : "translateX(0)",
          transition: unrolling ? "transform 1.3s cubic-bezier(0.22,1,0.36,1)" : "none",
        }}>
          {[15,28,42,56,70,84].map(pct=>(
            <div key={pct} style={{ position:"absolute", top:`${pct}%`, left:0, right:0, height:1, background:"rgba(0,0,0,0.12)"}}/>
          ))}
          <div style={{ height:8, background:"linear-gradient(180deg,#7a4a14,#c09030)", borderRadius:"50% 50% 0 0", marginLeft:2, marginRight:2 }}/>
          <div style={{ height:8, background:"linear-gradient(0deg,#7a4a14,#c09030)", borderRadius:"0 0 50% 50%", marginLeft:2, marginRight:2 }}/>
        </div>
      </div>

      {!unrolling && (
        <div style={{
          position:"absolute",
          left:`calc(50% + min(28vw, 295px))`,
          top:"50%", transform:"translateY(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:6,
          animation:"arrowRight 1.6s ease-in-out infinite",
          pointerEvents:"none",
        }}>
          <svg width="46" height="26" viewBox="0 0 46 26" fill="none">
            <line x1="0" y1="13" x2="34" y2="13" stroke="#c8a96e" strokeWidth="1.8" strokeLinecap="round"/>
            <polyline points="22,3 36,13 22,23" fill="none" stroke="#c8a96e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="0" y1="13" x2="34" y2="13" stroke="#c8a96e" strokeWidth="7" strokeLinecap="round" opacity="0.07"/>
            <polyline points="22,3 36,13 22,23" fill="none" stroke="#c8a96e" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.07"/>
          </svg>
          <span style={{fontSize:7,fontFamily:"monospace",letterSpacing:3,textTransform:"uppercase",color:"rgba(200,169,110,0.5)"}}>
            unroll
          </span>
        </div>
      )}

      <style>{`
        @keyframes mote0{0%,100%{transform:translate(0,0)}50%{transform:translate(8px,-13px)}}
        @keyframes mote1{0%,100%{transform:translate(0,0)}50%{transform:translate(-10px,9px)}}
        @keyframes mote2{0%,100%{transform:translate(0,0)}50%{transform:translate(6px,11px)}}
        @keyframes arrowRight{0%,100%{opacity:0.45;transform:translateY(-50%) translateX(0)}50%{opacity:1;transform:translateY(-50%) translateX(7px)}}
        @keyframes parchReveal{from{opacity:0;transform:scaleX(0.4)}to{opacity:1;transform:scaleX(1)}}
        @keyframes arrowPulse{0%,100%{opacity:0.5}50%{opacity:1}}
      `}</style>
    </div>
  )
}

function BookMap({ onSelectChapter }) {
  const [entered, setEntered] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)
  useEffect(() => { const t = setTimeout(() => setEntered(true), 80); return () => clearTimeout(t) }, [])

  const DESTINATIONS = [
    { id: "intro",    label: "Chapter I",   title: "Intro",      icon: "⚡", color: "#c8341a", x: "18%", y: "22%", marker: "flag"     },
    { id: "desktop",  label: "Chapter II",  title: "Know Me",    icon: "🖥", color: "#c8341a", x: "72%", y: "20%", marker: "x"        },
    { id: "stadium",  label: "Chapter III", title: "My Love",    icon: "❤️", color: "#c8341a", x: "20%", y: "68%", marker: "mountain" },
    { id: "watching", label: "Chapter IV",  title: "The Screen", icon: "🎬", color: "#c8341a", x: "70%", y: "70%", marker: "chest"    },
  ]

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#2a1a08",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      fontFamily: "'Georgia','Times New Roman',serif",
    }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 80% 75% at 50% 50%, transparent 40%, rgba(10,6,2,0.85) 100%)", zIndex:2 }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:3,
        boxShadow:"inset 0 0 60px rgba(0,0,0,0.6)" }} />

      <div style={{
        position: "relative",
        width: "min(820px, 92vw)", height: "min(560px, 82vh)",
        zIndex: 1,
        opacity: entered ? 1 : 0,
        transform: entered ? "scale(1)" : "scale(0.95)",
        transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <svg viewBox="0 0 820 560" style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="parchment" cx="50%" cy="45%" r="55%">
              <stop offset="0%"   stopColor="#e8c87a"/>
              <stop offset="50%"  stopColor="#d4a84b"/>
              <stop offset="100%" stopColor="#b8882a"/>
            </radialGradient>
            <radialGradient id="islandGlow" cx="42%" cy="38%" r="48%">
              <stop offset="0%"  stopColor="#f0d080" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#c09030" stopOpacity="0"/>
            </radialGradient>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="rgba(0,0,0,0.7)"/>
            </filter>
          </defs>
          <ellipse cx="410" cy="285" rx="370" ry="248" fill="url(#parchment)" filter="url(#shadow)"/>
          <path d="M 80,200 C 60,140 100,80 180,70 C 240,60 280,100 340,85 C 400,70 430,50 500,60 C 570,70 610,50 670,80 C 730,110 760,160 750,220 C 740,275 720,310 730,360 C 740,410 720,450 680,470 C 640,490 590,480 540,490 C 490,500 450,520 400,515 C 350,510 300,500 260,490 C 210,478 160,480 130,455 C 100,430 90,390 80,350 C 70,310 100,260 80,200 Z" fill="url(#parchment)" filter="url(#shadow)"/>
          <path d="M 80,200 C 60,140 100,80 180,70 C 240,60 280,100 340,85 C 400,70 430,50 500,60 C 570,70 610,50 670,80 C 730,110 760,160 750,220 C 740,275 720,310 730,360 C 740,410 720,450 680,470 C 640,490 590,480 540,490 C 490,500 450,520 400,515 C 350,510 300,500 260,490 C 210,478 160,480 130,455 C 100,430 90,390 80,350 C 70,310 100,260 80,200 Z" fill="url(#islandGlow)"/>
          <path d="M 80,200 C 60,140 100,80 180,70 C 240,60 280,100 340,85 C 400,70 430,50 500,60 C 570,70 610,50 670,80 C 730,110 760,160 750,220 C 740,275 720,310 730,360 C 740,410 720,450 680,470 C 640,490 590,480 540,490 C 490,500 450,520 400,515 C 350,510 300,500 260,490 C 210,478 160,480 130,455 C 100,430 90,390 80,350 C 70,310 100,260 80,200 Z" fill="rgba(120,70,10,0.08)"/>
          <path d="M 80,200 C 55,180 48,155 58,130 C 68,105 88,95 100,110 C 112,125 95,155 80,200 Z" fill="#c49030" opacity="0.7"/>
          <path d="M 80,200 C 62,185 56,165 64,145 C 72,125 86,118 94,128" fill="none" stroke="rgba(100,60,10,0.3)" strokeWidth="1"/>
          <path d="M 680,470 C 710,480 730,475 740,460 C 750,445 745,428 730,425 C 715,422 695,445 680,470 Z" fill="#c49030" opacity="0.6"/>
          <ellipse cx="100" cy="480" rx="55" ry="28" fill="#d4a84b" opacity="0.75"/>
          <ellipse cx="100" cy="480" rx="42" ry="20" fill="#dbb84e" opacity="0.5"/>
          <ellipse cx="390" cy="300" rx="48" ry="28" fill="#7dbfcf" opacity="0.6"/>
          <ellipse cx="390" cy="296" rx="38" ry="20" fill="#9dd0df" opacity="0.5"/>
          <ellipse cx="385" cy="292" rx="18" ry="10" fill="#b8e0ea" opacity="0.4"/>
          <path d="M 155,175 Q 240,140 340,150 Q 440,160 510,140 Q 590,120 620,170 L 595,195 Q 530,230 480,270 Q 420,310 390,300 Q 340,290 300,320 Q 250,350 210,390 Q 185,420 175,440" fill="none" stroke="#c8341a" strokeWidth="3.5" strokeDasharray="12 10" strokeLinecap="round" opacity="0.75"/>
          <path d="M 595,195 Q 650,230 670,280 Q 690,340 650,390 Q 620,430 590,445" fill="none" stroke="#c8341a" strokeWidth="3.5" strokeDasharray="12 10" strokeLinecap="round" opacity="0.75"/>
          {[[260,220],[290,210],[275,240],[310,230],[245,245]].map(([x,y],i)=>(
            <g key={i} transform={`translate(${x},${y})`} opacity="0.7">
              <line x1="0" y1="0" x2="0" y2="-28" stroke="#5a3510" strokeWidth="2.5" strokeLinecap="round"/>
              <ellipse cx="-10" cy="-26" rx="10" ry="6" fill="#2d6b2a" transform="rotate(-20)"/>
              <ellipse cx="10"  cy="-26" rx="10" ry="6" fill="#2d6b2a" transform="rotate(20)"/>
              <ellipse cx="0"   cy="-32" rx="8"  ry="5" fill="#3a8030"/>
            </g>
          ))}
          {[[560,130],[600,110],[640,140],[580,155],[620,160]].map(([x,y],i)=>(
            <g key={i}>
              <polygon points={`${x},${y} ${x-18},${y+28} ${x+18},${y+28}`} fill="#b87040" opacity="0.55"/>
              <polygon points={`${x},${y+2} ${x-8},${y+14} ${x+8},${y+14}`} fill="#e8d090" opacity="0.35"/>
            </g>
          ))}
          <g opacity="0.65">
            <polygon points="500,75 468,140 532,140" fill="#8b4513"/>
            <polygon points="500,75 488,110 512,110" fill="#6b3010"/>
            <ellipse cx="500" cy="70" rx="8" ry="5" fill="#e05020" opacity="0.7"/>
            <ellipse cx="494" cy="62" rx="5" ry="4" fill="#f07030" opacity="0.6"/>
            <ellipse cx="507" cy="64" rx="4" ry="3" fill="#e04010" opacity="0.5"/>
          </g>
          {[[340,420],[375,405],[410,425],[360,445],[395,440]].map(([x,y],i)=>(
            <g key={i}><polygon points={`${x},${y} ${x-15},${y+24} ${x+15},${y+24}`} fill="#b87040" opacity="0.5"/></g>
          ))}
          <g transform="translate(128,430)" opacity="0.6">
            <rect x="-18" y="-8" width="36" height="14" rx="8" fill="#2a1a08"/>
            <line x1="0" y1="-8" x2="0" y2="-32" stroke="#2a1a08" strokeWidth="2"/>
            <polygon points="0,-30 16,-18 0,-18" fill="#e8d8b0" opacity="0.8"/>
            <polygon points="0,-30 -12,-22 0,-22" fill="#e8d8b0" opacity="0.6"/>
          </g>
          <g transform="translate(680,410)" opacity="0.55">
            <circle cx="0" cy="0" r="28" fill="none" stroke="#8b5a20" strokeWidth="1"/>
            <circle cx="0" cy="0" r="20" fill="none" stroke="#8b5a20" strokeWidth="0.6"/>
            <line x1="0" y1="-26" x2="0" y2="26" stroke="#8b5a20" strokeWidth="1.2"/>
            <line x1="-26" y1="0" x2="26" y2="0" stroke="#8b5a20" strokeWidth="1.2"/>
            <line x1="-18" y1="-18" x2="18" y2="18" stroke="#8b5a20" strokeWidth="0.6"/>
            <line x1="18" y1="-18" x2="-18" y2="18" stroke="#8b5a20" strokeWidth="0.6"/>
            <polygon points="0,-24 3,-10 -3,-10" fill="#c8341a"/>
            <polygon points="0,24 3,10 -3,10" fill="#8b5a20"/>
            <text x="0" y="-30" textAnchor="middle" fontSize="9" fill="#8b5a20" fontFamily="Georgia,serif" fontWeight="bold">N</text>
            <text x="0" y="38" textAnchor="middle" fontSize="7" fill="#8b5a20" fontFamily="Georgia,serif">S</text>
            <text x="30" y="4" textAnchor="middle" fontSize="7" fill="#8b5a20" fontFamily="Georgia,serif">E</text>
            <text x="-30" y="4" textAnchor="middle" fontSize="7" fill="#8b5a20" fontFamily="Georgia,serif">W</text>
          </g>
          <g transform="translate(410,510)">
            <rect x="-120" y="-16" width="240" height="26" rx="3" fill="#c49030" opacity="0.4"/>
            <rect x="-116" y="-12" width="232" height="18" rx="2" fill="none" stroke="rgba(100,60,10,0.3)" strokeWidth="0.8"/>
            <text x="0" y="3" textAnchor="middle" fontSize="9" fill="rgba(60,30,5,0.6)" fontFamily="Georgia,serif" letterSpacing="4">PORTFOLIO MAP — MMXXVI</text>
          </g>
        </svg>

        {DESTINATIONS.map((dest, i) => {
          const isHovered = hoveredId === dest.id
          return (
            <div
              key={dest.id}
              onClick={() => onSelectChapter(dest.id)}
              onMouseEnter={() => setHoveredId(dest.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                position: "absolute", left: dest.x, top: dest.y,
                transform: "translate(-50%, -50%)",
                cursor: "pointer", zIndex: 10,
                opacity: entered ? 1 : 0,
                transition: `opacity 0.6s ease ${i * 0.12 + 0.4}s`,
              }}
            >
              <div style={{
                display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                transform: isHovered ? "scale(1.18) translateY(-4px)" : "scale(1)",
                transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
              }}>
                <div style={{ position:"relative" }}>
                  {dest.marker === "x" ? (
                    <svg width="36" height="36" viewBox="0 0 36 36">
                      <line x1="4" y1="4" x2="32" y2="32" stroke="#c8341a" strokeWidth="4.5" strokeLinecap="round"/>
                      <line x1="32" y1="4" x2="4" y2="32" stroke="#c8341a" strokeWidth="4.5" strokeLinecap="round"/>
                      {isHovered && <><line x1="4" y1="4" x2="32" y2="32" stroke="#ff6644" strokeWidth="2" strokeLinecap="round" opacity="0.5"/><line x1="32" y1="4" x2="4" y2="32" stroke="#ff6644" strokeWidth="2" strokeLinecap="round" opacity="0.5"/></>}
                    </svg>
                  ) : dest.marker === "flag" ? (
                    <svg width="28" height="38" viewBox="0 0 28 38">
                      <line x1="4" y1="4" x2="4" y2="36" stroke="#2a1a08" strokeWidth="2.5" strokeLinecap="round"/>
                      <polygon points="4,4 24,11 4,18" fill="#1a1a1a"/>
                      <circle cx="8" cy="11" r="3" fill="white" opacity="0.8"/>
                      <line x1="6" y1="9" x2="10" y2="13" stroke="#1a1a1a" strokeWidth="1"/>
                      <line x1="10" y1="9" x2="6" y2="13" stroke="#1a1a1a" strokeWidth="1"/>
                      {isHovered && <circle cx="4" cy="36" r="3" fill="#c8341a" opacity="0.7"/>}
                    </svg>
                  ) : dest.marker === "chest" ? (
                    <svg width="32" height="28" viewBox="0 0 32 28">
                      <rect x="2" y="12" width="28" height="16" rx="2" fill="#8b4513"/>
                      <rect x="2" y="12" width="28" height="7" rx="2" fill="#a0522d"/>
                      <rect x="4" y="10" width="24" height="5" rx="2" fill="#8b4513"/>
                      <rect x="13" y="16" width="6" height="6" rx="1" fill="#c8a030"/>
                      <path d="M 2,12 Q 16,4 30,12" fill="none" stroke="#6b3010" strokeWidth="1.5"/>
                      {isHovered && <rect x="2" y="12" width="28" height="16" rx="2" fill="#c8341a" opacity="0.15"/>}
                    </svg>
                  ) : (
                    <svg width="32" height="32" viewBox="0 0 32 32">
                      <polygon points="16,2 2,30 30,30" fill="#b87040"/>
                      <polygon points="16,4 6,26 26,26" fill="#d4904a" opacity="0.5"/>
                      <polygon points="16,2 10,14 22,14" fill="#e8d090" opacity="0.4"/>
                      {isHovered && <polygon points="16,2 2,30 30,30" fill="#c8341a" opacity="0.2"/>}
                    </svg>
                  )}
                  {isHovered && (
                    <div style={{ position:"absolute", inset:-6, borderRadius:"50%", boxShadow:"0 0 16px rgba(200,52,26,0.5)", pointerEvents:"none" }}/>
                  )}
                </div>
                <div style={{
                  background: isHovered ? "linear-gradient(135deg,#fdf5e0,#f5e8c8)" : "rgba(232,200,120,0.88)",
                  border: `1px solid ${isHovered ? "rgba(200,52,26,0.4)" : "rgba(130,80,20,0.3)"}`,
                  borderRadius:3, padding:"4px 9px", textAlign:"center",
                  boxShadow: isHovered ? "0 6px 20px rgba(0,0,0,0.4), 0 0 0 1.5px rgba(200,52,26,0.25)" : "0 2px 8px rgba(0,0,0,0.3)",
                  transition:"all 0.2s ease", whiteSpace:"nowrap",
                }}>
                  <div style={{ fontSize:8, fontFamily:"monospace", letterSpacing:2, textTransform:"uppercase", color:"rgba(100,55,10,0.6)", marginBottom:1 }}>
                    {dest.label}
                  </div>
                  <div style={{ fontSize:"clamp(9px,1.4vw,12px)", fontWeight:700, color:"rgba(50,25,5,0.9)", display:"flex", alignItems:"center", gap:4, justifyContent:"center" }}>
                    <span>{dest.icon}</span><span>{dest.title}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes mote0{0%,100%{transform:translate(0,0)}50%{transform:translate(8px,-13px)}}
        @keyframes mote1{0%,100%{transform:translate(0,0)}50%{transform:translate(-10px,9px)}}
        @keyframes mote2{0%,100%{transform:translate(0,0)}50%{transform:translate(6px,11px)}}
      `}</style>
    </div>
  )
}


// ── Cloud Transition ─────────────────────────────────────────────
function CloudTransition({ chapterTitle, chapterIcon, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600)
    return () => clearTimeout(t)
  }, [])

  const clouds = [
    { w:340, h:110, top:"8%",  left:"-10%", delay:0,    dur:2.2 },
    { w:280, h: 90, top:"28%", left:"-8%",  delay:0.15, dur:2.0 },
    { w:380, h:120, top:"48%", left:"-12%", delay:0.05, dur:2.4 },
    { w:300, h: 95, top:"65%", left:"-9%",  delay:0.2,  dur:2.1 },
    { w:360, h:115, top:"80%", left:"-11%", delay:0.1,  dur:2.3 },
    { w:320, h:100, top:"8%",  right:"-10%",delay:0,    dur:2.2 },
    { w:260, h: 85, top:"30%", right:"-8%", delay:0.18, dur:2.0 },
    { w:390, h:125, top:"50%", right:"-12%",delay:0.08, dur:2.5 },
    { w:290, h: 92, top:"68%", right:"-9%", delay:0.22, dur:2.1 },
    { w:350, h:112, top:"82%", right:"-11%",delay:0.12, dur:2.3 },
  ]

  return (
    <div style={{
      position:"absolute", inset:0, zIndex:50,
      background:"linear-gradient(180deg, #1a3a5c 0%, #2d6a9f 30%, #87ceeb 65%, #c8e8f8 100%)",
      display:"flex", alignItems:"center", justifyContent:"center",
      overflow:"hidden",
    }}>
      {/* Sun rays */}
      <div style={{
        position:"absolute", top:"30%", left:"50%", transform:"translate(-50%,-50%)",
        width:300, height:300, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(255,220,80,0.35) 0%, rgba(255,180,50,0.1) 50%, transparent 70%)",
        animation:"sunPulse 2s ease-in-out infinite",
        pointerEvents:"none",
      }}/>

      {/* Center text */}
      <div style={{
        position:"relative", zIndex:10, textAlign:"center",
        animation:"textFloat 2.6s ease-in-out forwards",
        fontFamily:"'Georgia','Times New Roman',serif",
      }}>
        <div style={{ fontSize:"clamp(48px,8vw,80px)", lineHeight:1, marginBottom:12 }}>
          {chapterIcon}
        </div>
        <div style={{
          fontSize:"clamp(18px,3vw,28px)", fontWeight:700,
          color:"rgba(255,255,255,0.92)",
          textShadow:"0 2px 20px rgba(0,0,0,0.3)",
          letterSpacing:"2px",
        }}>
          {chapterTitle}
        </div>
        <div style={{
          marginTop:10, fontSize:11, fontFamily:"monospace",
          letterSpacing:4, textTransform:"uppercase",
          color:"rgba(255,255,255,0.5)",
        }}>
          loading your world…
        </div>
      </div>

      {/* Clouds sweeping in from both sides */}
      {clouds.map((c, i) => (
        <div key={i} style={{
          position:"absolute",
          top: c.top,
          left: c.left || "auto",
          right: c.right || "auto",
          width: c.w, height: c.h,
          animation: `cloudSweep${c.left ? "L" : "R"} ${c.dur}s cubic-bezier(0.25,0.46,0.45,0.94) ${c.delay}s forwards`,
          pointerEvents:"none",
        }}>
          <svg viewBox="0 0 200 60" width="100%" height="100%">
            <defs>
              <radialGradient id={`cg${i}`} cx="50%" cy="60%" r="55%">
                <stop offset="0%"   stopColor="rgba(255,255,255,0.98)"/>
                <stop offset="70%"  stopColor="rgba(240,248,255,0.92)"/>
                <stop offset="100%" stopColor="rgba(220,235,255,0.6)"/>
              </radialGradient>
            </defs>
            <ellipse cx="100" cy="42" rx="98" ry="18" fill={`url(#cg${i})`}/>
            <ellipse cx="70"  cy="34" rx="55" ry="22" fill={`url(#cg${i})`}/>
            <ellipse cx="130" cy="32" rx="50" ry="20" fill={`url(#cg${i})`}/>
            <ellipse cx="100" cy="28" rx="42" ry="18" fill={`url(#cg${i})`}/>
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes cloudSweepL {
          0%   { transform: translateX(0); opacity: 0; }
          15%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translateX(120vw); opacity: 0; }
        }
        @keyframes cloudSweepR {
          0%   { transform: translateX(0); opacity: 0; }
          15%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translateX(-120vw); opacity: 0; }
        }
        @keyframes sunPulse {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity:0.8; }
          50%     { transform: translate(-50%,-50%) scale(1.15); opacity:1; }
        }
        @keyframes textFloat {
          0%   { opacity:0; transform: translateY(20px) scale(0.9); }
          20%  { opacity:1; transform: translateY(0)    scale(1);   }
          75%  { opacity:1; transform: translateY(0)    scale(1);   }
          100% { opacity:0; transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
    </div>
  )
}

// ── Main — chapters stay mounted once visited, map stays mounted after cover ──
export default function Final() {
  const [scene,       setScene]     = useState("cover")
  const [chapterId,   setChapterId] = useState(null)
  const [visited,     setVisited]   = useState(new Set())
  const [loadingFor,  setLoadingFor] = useState(null) // chapter id being loaded
  // visitKey increments every time a chapter is entered — forces isActive to re-fire
  const [visitKey,    setVisitKey]   = useState({})

  const goToChapter = (id) => {
    // Start mounting the chapter NOW (while clouds play)
    setVisited(v => new Set([...v, id]))
    setVisitKey(k => ({ ...k, [id]: (k[id] || 0) + 1 }))
    setChapterId(id)
    setLoadingFor(id)
    setScene("loading")
  }

  const onCloudDone = () => {
    setLoadingFor(null)
    setScene("chapter")
  }

  const goToMap = () => setScene("map")
  const goFromCover = () => setScene("map")

  return (
    <div style={{ position:"fixed", inset:0, background:"#0e0b07", overflow:"hidden" }}>
      <style>{`
        @keyframes mote0{0%,100%{transform:translate(0,0)}50%{transform:translate(8px,-13px)}}
        @keyframes mote1{0%,100%{transform:translate(0,0)}50%{transform:translate(-10px,9px)}}
        @keyframes mote2{0%,100%{transform:translate(0,0)}50%{transform:translate(6px,11px)}}
        @keyframes mapExpand{from{opacity:0;transform:scale(0.88) translateY(30px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes fadeScene{from{opacity:0;transform:scale(0.98)}to{opacity:1;transform:scale(1)}}
        @keyframes arrowPulse{0%,100%{opacity:0.5;transform:translateY(-50%) translateX(0)}50%{opacity:1;transform:translateY(-50%) translateX(8px)}}
        @keyframes pulse{0%,100%{opacity:0.15}50%{opacity:0.35}}
      `}</style>

      {/* COVER — unmounts after opening */}
      {scene === "cover" && (
        <div style={{ position:"absolute", inset:0, animation:"fadeScene 0.5s ease", zIndex:30 }}>
          <BookCover onOpen={goFromCover} />
        </div>
      )}

      {/* MAP — stays mounted after cover, just hidden when in a chapter */}
      {scene !== "cover" && (
        <div style={{
          position:"absolute", inset:0, zIndex: scene === "map" ? 20 : 1,
          opacity: scene === "map" ? 1 : 0,
          pointerEvents: scene === "map" ? "auto" : "none",
          animation: scene === "map" ? "mapExpand 0.7s cubic-bezier(0.22,1,0.36,1) forwards" : "none",
        }}>
          <BookMap onSelectChapter={goToChapter} />
        </div>
      )}

      {/* CLOUD TRANSITION */}
      {scene === "loading" && loadingFor && (() => {
        const ch = CHAPTERS.find(c => c.id === loadingFor)
        return <CloudTransition key={loadingFor} chapterTitle={ch.title} chapterIcon={ch.icon} onDone={onCloudDone} />
      })()}

      {/* CHAPTERS — mount once on first visit, then show/hide with opacity */}
      {CHAPTERS.map(ch => {
        const isActive = scene === "chapter" && chapterId === ch.id
        if (!visited.has(ch.id) && !isActive) return null
        const Comp = ch.component
        return (
          <div
            key={ch.id}
            style={{
              position:"absolute", inset:0,
              opacity: isActive ? 1 : 0,
              pointerEvents: isActive ? "auto" : "none",
              transition: "opacity 0.35s ease",
              zIndex: isActive ? 20 : 1,
              animation: isActive ? "fadeScene 0.4s ease" : "none",
            }}
          >
            <Comp key={visitKey[ch.id] || 0} isActive={isActive} />

            {/* Back to map button */}
            <button
              onClick={goToMap}
              style={{
                position:"fixed", top:18, left:18, zIndex:500,
                background:"rgba(200,169,110,0.12)",
                border:"1px solid rgba(200,169,110,0.3)",
                borderRadius:20, padding:"7px 16px",
                display:"flex", alignItems:"center", gap:7,
                cursor:"pointer", color:"rgba(200,169,110,0.85)",
                fontSize:11, fontFamily:"monospace", letterSpacing:2,
                textTransform:"uppercase", transition:"all 0.25s ease",
                backdropFilter:"blur(8px)",
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
              }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(200,169,110,0.22)";e.currentTarget.style.color="#c8a96e"}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(200,169,110,0.12)";e.currentTarget.style.color="rgba(200,169,110,0.85)"}}
            >
              <span style={{fontSize:14,lineHeight:1}}>←</span>
              <span>Map</span>
            </button>

            {/* Chapter badge */}
            <div style={{
              position:"fixed", top:18, right:18, zIndex:500,
              background:"rgba(0,0,0,0.4)",
              border:`1px solid ${ch.color}44`,
              borderRadius:20, padding:"7px 14px",
              display:"flex", alignItems:"center", gap:7,
              backdropFilter:"blur(8px)", pointerEvents:"none",
              opacity: isActive ? 1 : 0, transition:"opacity 0.3s ease",
            }}>
              <span style={{fontSize:13}}>{ch.icon}</span>
              <span style={{fontSize:9,fontFamily:"monospace",letterSpacing:3,textTransform:"uppercase",color:`${ch.color}cc`}}>
                {ch.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}