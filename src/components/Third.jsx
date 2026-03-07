import React, { useState, useRef, useEffect } from "react"
import TVRoom from "./Tvwatch"

const MOVIES = [
  { id: 1, title: "Interstellar", year: 2014, genre: "Sci-Fi", video: "/videos/interstellar.mp4", accent: "#00d4ff", rating: "9.0" },
  { id: 2, title: "Dar", year: 1992, genre: "Romantic Madness", video: "/videos/Dar.mp4", accent: "#a78bfa", rating: "8.8" },
  { id: 3, title: "Titanic", year: 1997, genre: "Adventure Drama", video: "/videos/titanic.mp4", accent: "#f5a623", rating: "8.6" },
]

function VideoCard({ item, isActive, onClick }) {
  const videoRef = useRef()
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!videoRef.current) return
    if (isActive) videoRef.current.play().catch(() => {})
    else {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [isActive])

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: isActive ? 160 : 110,
        height: isActive ? 105 : 75,
        borderRadius: 8,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transform: isActive ? "scale(1)" : hovered ? "scale(1.04)" : "scale(0.94)",
        opacity: isActive ? 1 : 0.5,
        transition: "all 0.35s cubic-bezier(0.34,1.2,0.64,1)",
        boxShadow: isActive
          ? `0 8px 24px rgba(0,0,0,0.8), 0 0 0 1.5px ${item.accent}`
          : "0 3px 10px rgba(0,0,0,0.5)",
      }}
    >
      <video
        ref={videoRef}
        src={item.video}
        muted
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.8) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "6px 8px",
          pointerEvents: "none",
        }}
      >
        <div style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>
          {item.title}
        </div>
      </div>
    </div>
  )
}

function VideoReel({ title, items, accentColor, onWatch }) {
  const [active, setActive] = useState(0)

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <div style={{ width: 2, height: 11, background: accentColor }} />
        <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 10, fontWeight: 700 }}>
          {title}
        </span>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {items.map((item, i) => (
          <VideoCard
            key={item.id}
            item={item}
            isActive={i === active}
            onClick={() => {
              setActive(i)
              onWatch(item)
            }}
          />
        ))}
      </div>
    </div>
  )
}

function IPad({ children }) {
  return (
    <div
      style={{
        position: "relative",
        width: 620,
        height: 500,
        borderRadius: 28,
        background: "linear-gradient(145deg,#f0f0f0,#e0e0e0,#f5f5f5)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
        padding: 14,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 18,
          overflow: "hidden",
          background: "#080808",
        }}
      >
        {children}
      </div>
    </div>
  )
}

function IPadContent({ selectedVideo, onWatch }) {
  const allItems = [...MOVIES]
  const [featured, setFeatured] = useState(0)

  const featuredItem = selectedVideo || allItems[featured]

  useEffect(() => {
    if (selectedVideo) return

    const t = setInterval(() => {
      setFeatured((i) => (i + 1) % allItems.length)
    }, 5000)

    return () => clearInterval(t)
  }, [selectedVideo])

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#080808",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "42%",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <video
          key={featuredItem.video}
          src={featuredItem.video}
          autoPlay
          muted={!selectedVideo}
          loop={!selectedVideo}
          controls
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 30% 50%, ${featuredItem.accent}18, transparent 60%)`,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "absolute", bottom: 10, left: 14, zIndex: 2, pointerEvents: "none" }}>
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 7,
              fontFamily: "monospace",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            {selectedVideo ? "Now Playing" : "Now Featured"}
          </div>

          <div
            style={{
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "Georgia,serif",
              textShadow: "0 1px 6px rgba(0,0,0,0.9)",
            }}
          >
            {featuredItem.title}
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: "10px 12px",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        <VideoReel title="Movies" items={MOVIES} accentColor="#e50914" onWatch={onWatch} />
      </div>
    </div>
  )
}

export default function Third({ isActive }) {
  const [watchVideo, setWatchVideo] = useState(null)

  useEffect(() => {
    if (!isActive) {
      const videos = document.querySelectorAll("video")
      videos.forEach(v => {
        try {
          v.pause()
        } catch {}
      })
    }
  }, [isActive])

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#080808",
        display: "flex",
      }}
    >
      <div style={{ width: "54%" }}>
        <TVRoom />
      </div>

      <div
        style={{
          width: "40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IPad>
          <IPadContent
            selectedVideo={watchVideo}
            onWatch={(video) => setWatchVideo(video)}
          />
        </IPad>
      </div>
    </div>
  )
}