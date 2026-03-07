import Win7System from "./Windows7Desktop"
import StudyRoom  from "./StudyTable"

export default function FirstModel() {
  return (
    <div style={{
      width: "100vw", height: "100vh",
      display: "flex",
      overflow: "hidden",
      background: "linear-gradient(135deg, #0f1b3d 0%, #16213e 40%, #1a2a5e 70%, #0f3460 100%)",
    }}>

      {/* ── Left: Monitor (46%) ── */}
      <div style={{
        width: "60%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "160px 30px 40px 28px",
        flexShrink: 0,
        position: "relative",
      }}>



        <div style={{
          width: "100%", height: "90%",
          display: "flex", flexDirection: "column", alignItems: "center",
          position: "relative", zIndex: 1,
        }}>

          {/* Screen bezel */}
          <div style={{
            width: "100%", flex: 1,
            background: "linear-gradient(160deg, #2c2c2c 0%, #1a1a1a 60%, #111 100%)",
            borderRadius: "10px 10px 3px 3px",
            padding: "6px 6px 4px 6px",
            boxShadow: `
              0 0 0 1px #0a0a0a,
              0 0 0 3px #1e1e1e,
              inset 0 1px 3px rgba(255,255,255,0.04),
              0 40px 80px rgba(0,0,0,0.5),
              0 0 80px rgba(15,52,96,0.3)
            `,
            position: "relative",
          }}>

            {/* Brand engraved */}
            <div style={{
              position: "absolute", top: 3, left: "50%",
              transform: "translateX(-50%)",
              color: "#2a2a2a", fontSize: 8, letterSpacing: 3,
              textTransform: "uppercase", fontFamily: "sans-serif",
              userSelect: "none", whiteSpace: "nowrap",
            }}>KRITIMAN</div>

            {/* Screen */}
            <div style={{
              width: "100%", height: "100%",
              borderRadius: 3, overflow: "hidden",
              position: "relative", background: "#000",
              boxShadow: "inset 0 0 30px rgba(0,0,0,1)",
            }}>
              {/* Glare top */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "35%",
                background: "linear-gradient(150deg, rgba(255,255,255,0.055) 0%, transparent 60%)",
                zIndex: 10, pointerEvents: "none",
              }} />
              {/* Glare dot */}
              <div style={{
                position: "absolute", top: 6, left: 10,
                width: 50, height: 18,
                background: "rgba(255,255,255,0.045)",
                borderRadius: "50%", filter: "blur(8px)",
                zIndex: 10, pointerEvents: "none",
              }} />
              <Win7System />
            </div>
          </div>

          {/* Chin */}
          <div style={{
            width: "100%", height: 22,
            background: "linear-gradient(180deg, #222 0%, #141414 100%)",
            borderRadius: "0 0 4px 4px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 14px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}>
            {/* Power LED */}
            <div style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "#00e676",
              boxShadow: "0 0 5px #00e676, 0 0 10px rgba(0,230,118,0.5)",
            }} />
            <div style={{ color: "#1a1a1a", fontSize: 7, letterSpacing: 2, textTransform: "uppercase", fontFamily: "sans-serif" }}>
              DISPLAY
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: 4, height: 8, background: "#1e1e1e", borderRadius: 1 }} />
              ))}
            </div>
          </div>

          {/* Neck */}
          <div style={{
            width: 36, height: 20,
            background: "linear-gradient(180deg, #1a1a1a, #111)",
            clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
          }} />

          {/* Base */}
          <div style={{
            width: 180, height: 12,
            background: "linear-gradient(180deg, #1c1c1c, #0e0e0e)",
            borderRadius: "0 0 8px 8px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
          }} />

          {/* Desk shadow */}
          <div style={{
            width: 240, height: 10, marginTop: 2,
            background: "radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%)",
            borderRadius: "50%",
          }} />
        </div>
      </div>

      {/* ── Right: Study Room (54%) ── */}
<div style={{
  width: "54%",
  height: "100%",
  position: "relative",
  flexShrink: 0,
}}>

  {/* Soft yellow light from top */}
  <div style={{
    position: "absolute",
    top: "-10%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "70%",
    height: "80%",
    background: "radial-gradient(ellipse at top, rgba(255,210,60,0.18) 0%, rgba(255,180,20,0.08) 35%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 1,
  }} />

  {/* Warm ground glow — light pooling on the floor */}
  <div style={{
    position: "absolute",
    bottom: "8%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "65%",
    height: "28%",
    background: "radial-gradient(ellipse at center, rgba(255,190,40,0.13) 0%, rgba(255,160,10,0.06) 45%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 1,
  }} />

  <StudyRoom />
</div>

    </div>
  )
}