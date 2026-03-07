import React, { useState, useRef, useEffect } from "react"
import useSound from "use-sound"

// ── Login Screen ──────────────────────────────────────────────────
function Win7Login({ onLogin }) {
  const [password,  setPassword]  = useState("")
  const [shake,     setShake]     = useState(false)
  const [hint,      setHint]      = useState(false)
  const [booting,   setBooting]   = useState(false)
  const [started,   setStarted]   = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const [playBoot, { stop }] = useSound("/sounds/windows_sound.mp3", { volume: 0.3 })

  const handleStart = () => {
    if (started) return
    setStarted(true)
    setBooting(true)
    playBoot()
    setTimeout(() => stop(),             2800)
    setTimeout(() => setBooting(false),  3000)
    setTimeout(() => setShowLogin(true), 3400)
  }

  const handleLogin = () => {
    if (password === "" || password === "1234") {
      onLogin()
    } else {
      setShake(true)
      setPassword("")
      setTimeout(() => setShake(false), 600)
    }
  }

  // ── pre-boot ──
  if (!started) return (
    <div onClick={handleStart} style={{
      width: "100%", height: "100%", background: "#000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      cursor: "pointer", gap: 24,
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, width: 72, height: 72 }}>
        {["#f25022","#7fba00","#00a4ef","#ffb900"].map((c, i) => (
          <div key={i} style={{ background: c, borderRadius: 3 }} />
        ))}
      </div>
      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, letterSpacing: 3, textTransform: "uppercase" }}>
        Click anywhere to start
      </div>
    </div>
  )

  // ── booting ──
  if (booting) return (
    <div style={{
      width: "100%", height: "100%", background: "#000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 24,
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, width: 64, height: 64 }}>
        {["#f25022","#7fba00","#00a4ef","#ffb900"].map((c, i) => (
          <div key={i} style={{ background: c, borderRadius: 2, animation: `bootFade 0.4s ease ${i * 0.15}s both` }} />
        ))}
      </div>
      <div style={{ color: "#fff", fontSize: 13, letterSpacing: 2, opacity: 0.7 }}>Starting Windows...</div>
      <div style={{ width: 200, height: 3, background: "#222", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", background: "#4a90d9", borderRadius: 2, animation: "bootBar 2s ease forwards" }} />
      </div>
      <style>{`
        @keyframes bootFade { from { opacity:0; transform:scale(0.5) } to { opacity:1; transform:scale(1) } }
        @keyframes bootBar  { from { width:0% } to { width:100% } }
      `}</style>
    </div>
  )

  // ── login screen ──
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(135deg, #1a3a6b 0%, #0d2a5c 50%, #1a3a6b 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      opacity: showLogin ? 1 : 0,
      transition: "opacity 0.4s ease",
    }}>
      {/* Background orbs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[
          { w: 300, h: 300, top: "10%", left: "20%", c: "rgba(74,144,217,0.08)" },
          { w: 200, h: 200, top: "60%", left: "70%", c: "rgba(74,144,217,0.06)" },
          { w: 150, h: 150, top: "40%", left: "5%",  c: "rgba(255,255,255,0.03)" },
        ].map((o, i) => (
          <div key={i} style={{ position: "absolute", borderRadius: "50%", width: o.w, height: o.h, top: o.top, left: o.left, background: o.c, filter: "blur(40px)" }} />
        ))}
      </div>

      {/* Top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 48, background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 20px", gap: 16 }}>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      </div>

      {/* Login card */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, zIndex: 1, animation: "loginFadeIn 0.6s ease forwards" }}>
        <div style={{ width: 96, height: 96, borderRadius: "50%", background: "linear-gradient(135deg, #4a90d9, #1f5fa6)", border: "3px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
          👤
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#fff", fontSize: 22, fontWeight: 300, letterSpacing: 1 }}>User</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 4 }}>Local Account</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", animation: shake ? "shake 0.5s ease" : "none" }}>
          <input
            type="password" value={password} placeholder="Password" autoFocus
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{ width: 220, height: 36, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRight: "none", borderRadius: "3px 0 0 3px", padding: "0 14px", color: "#fff", fontSize: 14, outline: "none" }}
          />
          <button onClick={handleLogin}
            style={{ width: 36, height: 36, background: "linear-gradient(180deg,#4a90d9,#1f5fa6)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "0 3px 3px 0", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(180deg,#5ba0e9,#2f6fb6)"}
            onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(180deg,#4a90d9,#1f5fa6)"}
          >→</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span onClick={() => setHint(h => !h)} style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, cursor: "pointer", textDecoration: "underline" }}>Password hint</span>
          {hint && <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, background: "rgba(0,0,0,0.3)", padding: "4px 12px", borderRadius: 4 }}>Hint: press Enter (no password needed)</span>}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 48, background: "rgba(0,0,0,0.4)", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ display: "flex", gap: 3 }}>
          {["#f25022","#7fba00","#00a4ef","#ffb900"].map((c, i) => <div key={i} style={{ width: 10, height: 10, background: c, borderRadius: 1 }} />)}
        </div>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>Windows 7</span>
        <div style={{ display: "flex", gap: 12 }}>
          {["🔌","♿","🔴"].map((ic, i) => (
            <span key={i} style={{ fontSize: 14, cursor: "pointer", opacity: 0.5 }}
              onMouseEnter={e => e.currentTarget.style.opacity = "1"}
              onMouseLeave={e => e.currentTarget.style.opacity = "0.5"}
            >{ic}</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes loginFadeIn { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
      `}</style>
    </div>
  )
}

// ── Reusable draggable window ─────────────────────────────────────
function Win7Window({ title, icon, onClose, onMinimize, focused, onFocus, defaultPos, defaultSize, children }) {
  const dragOffset = useRef({ x: 0, y: 0 })
  const [pos,       setPos]       = useState(defaultPos  || { x: 80, y: 60 })
  const [size]                    = useState(defaultSize || { w: 520, h: 360 })
  const [maximized, setMaximized] = useState(false)

  const onMouseDown = (e) => {
    if (maximized) return
    onFocus?.()
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    const onMove = (ev) => setPos({ x: ev.clientX - dragOffset.current.x, y: ev.clientY - dragOffset.current.y })
    const onUp   = () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp) }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup",   onUp)
  }

  return (
    <div onMouseDown={onFocus} style={{
      position: "absolute",
      left:   maximized ? 0      : pos.x,
      top:    maximized ? 0      : pos.y,
      width:  maximized ? "100%" : size.w,
      height: maximized ? "calc(100% - 40px)" : size.h,
      zIndex: focused ? 100 : 50,
      display: "flex", flexDirection: "column",
      borderRadius: maximized ? 0 : 6,
      overflow: "hidden",
      boxShadow: focused ? "0 8px 40px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.3)",
      border: "1px solid rgba(255,255,255,0.3)",
      fontFamily: "'Segoe UI', Tahoma, sans-serif",
      userSelect: "none",
      animation: "winOpen 0.15s ease",
    }}>
      {/* Title bar */}
      <div onMouseDown={onMouseDown} style={{
        background: focused
          ? "linear-gradient(180deg, #4a90d9 0%, #1f5fa6 60%, #1a4f8f 100%)"
          : "linear-gradient(180deg, #9ab4cf 0%, #6d8fad 100%)",
        padding: "5px 6px",
        display: "flex", alignItems: "center", gap: 6,
        cursor: "default", flexShrink: 0,
      }}>
        <span style={{ fontSize: 14 }}>{icon}</span>
        <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: "#fff", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
          {title}
        </span>
        <div style={{ display: "flex", gap: 2 }}>
          {[
            { label: "─", action: onMinimize, bg: "#4a90d9" },
            { label: maximized ? "❐" : "□", action: () => setMaximized(m => !m), bg: "#4a90d9" },
            { label: "✕", action: onClose, bg: "#c0392b" },
          ].map((btn, i) => (
            <button key={i} onClick={btn.action} style={{
              width: 22, height: 18, background: btn.bg,
              border: "1px solid rgba(255,255,255,0.3)", borderRadius: 2,
              color: "#fff", fontSize: 10, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{btn.label}</button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        {children}
      </div>
    </div>
  )
}

// ── Terminal ──────────────────────────────────────────────────────
function TerminalApp() {
  const [lines,      setLines]      = useState(["Microsoft Windows [Version 7.0.7601]", "(c) Kritiman Corp. All rights reserved.", "", "Type 'help' for available commands.", ""])
  const [input,      setInput]      = useState("")
  const [history,    setHistory]    = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [currentDir, setCurrentDir] = useState("C:\\Users\\Kritiman")
  const currentDirRef = useRef("C:\\Users\\Kritiman")
  const endRef = useRef()

  const changeDir = (path) => {
    currentDirRef.current = path
    setCurrentDir(path)
  }

  const INITIAL_FS = {
    "C:\\": { type: "dir", children: ["Users", "Windows", "Program Files"] },
    "C:\\Users": { type: "dir", children: ["Kritiman"] },
    "C:\\Users\\Kritiman": { type: "dir", children: ["Desktop", "Documents", "Projects", "resume.txt", "readme.md"] },
    "C:\\Users\\Kritiman\\Desktop": { type: "dir", children: ["portfolio.lnk", "notes.txt"] },
    "C:\\Users\\Kritiman\\Documents": { type: "dir", children: ["about.txt", "skills.txt", "contact.txt"] },
    "C:\\Users\\Kritiman\\Projects": { type: "dir", children: ["portfolio3d", "aichat", "ecommerce"] },
    "C:\\Users\\Kritiman\\Projects\\portfolio3d": { type: "dir", children: ["readme.txt"] },
    "C:\\Users\\Kritiman\\Projects\\aichat":      { type: "dir", children: ["readme.txt"] },
    "C:\\Users\\Kritiman\\Projects\\ecommerce":   { type: "dir", children: ["readme.txt"] },
    "C:\\Users\\Kritiman\\resume.txt": { type: "file", content: `KRITIMAN TALUKDAR\n=================\nFull Stack AI Engineer\nLocation: Assam, India\n\nEXPERIENCE\n----------\nSenior Developer  - XYZ Corp     (2023-Present)\nFrontend Intern   - ABC Studio   (2022-2023)\n\nEDUCATION\n---------\nB.Tech Computer Science - 2024\nGPA: 8.9/10\n\nSKILLS\n------\nReact, Next.js, Three.js, Node.js\nPython, FastAPI, LangChain, OpenAI\nPostgreSQL, MongoDB, Docker, AWS` },
    "C:\\Users\\Kritiman\\readme.md": { type: "file", content: `# Hi, I'm Kritiman 👋\n\nI build immersive 3D web experiences,\nAI-powered apps, and full-stack systems.\n\nCheck out my projects in C:\\Users\\Kritiman\\Projects` },
    "C:\\Users\\Kritiman\\Desktop\\notes.txt": { type: "file", content: "TODO:\n- Finish portfolio\n- Deploy to Vercel\n- Update resume" },
    "C:\\Users\\Kritiman\\Desktop\\portfolio.lnk": { type: "file", content: "Shortcut to: https://kritiman.dev\nType: Web Link" },
    "C:\\Users\\Kritiman\\Documents\\about.txt": { type: "file", content: `Name    : Kritiman Talukdar\nRole    : Full Stack AI Engineer\nLocation: Assam, India\nEmail   : kritiman@example.com\nGitHub  : github.com/kritiman\n\nI specialize in 3D web, AI apps,\nand scalable full-stack systems.` },
    "C:\\Users\\Kritiman\\Documents\\skills.txt": { type: "file", content: `TECHNICAL SKILLS\n================\n\nFrontend  : React, Next.js, Three.js, Tailwind, TypeScript\nBackend   : Node.js, Python, FastAPI, Express\nAI / ML   : LangChain, OpenAI API, HuggingFace, TensorFlow\nDatabase  : PostgreSQL, MongoDB, Redis, Supabase\nDevOps    : Docker, AWS, Vercel, Git, CI/CD\n3D/Design : Three.js, R3F, Blender, Figma` },
    "C:\\Users\\Kritiman\\Documents\\contact.txt": { type: "file", content: `CONTACT INFO\n============\nEmail   : kritiman@example.com\nGitHub  : github.com/kritiman\nLinkedIn: linkedin.com/in/kritiman\nTwitter : @kritiman_dev\nWebsite : kritiman.dev` },
    "C:\\Users\\Kritiman\\Projects\\portfolio3d\\readme.txt": { type: "file", content: `PROJECT: 3D Portfolio\n=====================\nTech   : React, Three.js, R3F, Tailwind\nStatus : Live ✓\nURL    : kritiman.dev\nStars  : ⭐ 120` },
    "C:\\Users\\Kritiman\\Projects\\aichat\\readme.txt": { type: "file", content: `PROJECT: AI Chat App\n====================\nTech   : FastAPI, LangChain, OpenAI, React\nStatus : Live ✓\nURL    : aichat.kritiman.dev\nStars  : ⭐ 89` },
    "C:\\Users\\Kritiman\\Projects\\ecommerce\\readme.txt": { type: "file", content: `PROJECT: E-Commerce\n===================\nTech   : Next.js, Stripe, MongoDB, Node.js\nStatus : Live ✓\nURL    : shop.kritiman.dev\nStars  : ⭐ 56` },
  }

  const [fs, setFs] = useState(INITIAL_FS)
  const fsRef = useRef(INITIAL_FS)

  const updateFs = (updater) => {
    setFs(prev => {
      const next = updater(prev)
      fsRef.current = next
      return next
    })
  }

  const SHORTCUTS = {
    "my computer": "C:\\", "mycomputer": "C:\\", "c:": "C:\\",
    "desktop":   "C:\\Users\\Kritiman\\Desktop",
    "documents": "C:\\Users\\Kritiman\\Documents",
    "projects":  "C:\\Users\\Kritiman\\Projects",
    "home": "C:\\Users\\Kritiman", "~": "C:\\Users\\Kritiman",
  }

  const resolvePath = (target) => {
    const dir = currentDirRef.current
    if (!target) return dir
    if (target === "..") {
      const parts = dir.split("\\")
      return parts.length > 1 ? parts.slice(0, -1).join("\\") || "C:\\" : dir
    }
    if (target.includes(":\\")) return target
    return dir === "C:\\" ? `C:\\${target}` : `${dir}\\${target}`
  }

  const runCommand = (raw) => {
    const trimmed  = raw.trim()
    const spaceIdx = trimmed.indexOf(" ")
    const cmd  = (spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx)).toLowerCase()
    const arg  = spaceIdx === -1 ? "" : trimmed.slice(spaceIdx + 1).trim()
    const out  = []
    const push = (...l) => out.push(...l)
    const fs   = fsRef.current

    switch(cmd) {

      case "help":
        push(
          "┌──────────────────────────────────────────┐",
          "│           Available Commands              │",
          "├──────────────────────────────────────────┤",
          "│  dir / ls       - List directory          │",
          "│  cd <path>      - Change directory        │",
          "│  cd ..          - Go up one level         │",
          "│  cd ~           - Go to home              │",
          "│  cd desktop     - Go to Desktop           │",
          "│  cd documents   - Go to Documents         │",
          "│  cd projects    - Go to Projects          │",
          "│  type <file>    - Read a file             │",
          "│  cat <file>     - Read a file (alias)     │",
          "│  mkdir <name>   - Create directory        │",
          "│  echo <text>    - Print text              │",
          "│  cls / clear    - Clear screen            │",
          "│  pwd            - Show current path       │",
          "│  tree           - Show directory tree     │",
          "│  whoami         - Show current user       │",
          "│  date           - Show date and time      │",
          "│  help           - Show this help          │",
          "└──────────────────────────────────────────┘",
          ""
        )
        break

      case "dir":
      case "ls": {
        const target = arg ? (SHORTCUTS[arg.toLowerCase()] || resolvePath(arg)) : currentDirRef.current
        const node   = fs[target]
        if (!node || node.type !== "dir") { push(`The system cannot find the path: ${target}`, ""); break }
        push("", ` Directory of ${target}`, "")
        let fc = 0, dc = 0
        node.children.forEach(name => {
          const cp    = target === "C:\\" ? `C:\\${name}` : `${target}\\${name}`
          const isDir = fs[cp]?.type === "dir"
          const date  = new Date().toLocaleDateString("en-US")
          if (isDir) { push(`  ${date}    <DIR>          ${name}`); dc++ }
          else       { push(`  ${date}                   ${name}`); fc++ }
        })
        push("", `       ${dc} Dir(s)    ${fc} File(s)`, "")
        break
      }

      case "cd": {
        if (!arg) { push(currentDirRef.current, ""); break }
        let target
        if (arg === "..") {
          const parts = currentDirRef.current.split("\\")
          target = parts.length > 1 ? parts.slice(0, -1).join("\\") || "C:\\" : currentDirRef.current
        } else {
          target = SHORTCUTS[arg.toLowerCase()] || resolvePath(arg)
        }
        if (fsRef.current[target]?.type === "dir") {
          changeDir(target)
          push("")
        } else {
          push(`The system cannot find the path: ${arg}`, "")
        }
        break
      }

      case "type":
      case "cat": {
        if (!arg) { push("Usage: type <filename>", ""); break }
        const path = SHORTCUTS[arg.toLowerCase()] || resolvePath(arg)
        const node = fsRef.current[path]
        if (!node)               { push(`File not found: ${arg}`, ""); break }
        if (node.type === "dir") { push(`'${arg}' is a directory, not a file.`, ""); break }
        push("", ...node.content.split("\n"), "")
        break
      }

      case "mkdir": {
        if (!arg) { push("Usage: mkdir <dirname>", ""); break }
        const path   = resolvePath(arg)
        const parent = path.split("\\").slice(0, -1).join("\\") || "C:\\"
        if (fsRef.current[path]) { push(`A subdirectory already exists: ${arg}`, ""); break }
        updateFs(prev => {
          const next = { ...prev }
          next[path] = { type: "dir", children: [] }
          if (next[parent]) next[parent] = { ...next[parent], children: [...next[parent].children, arg] }
          return next
        })
        push(`Directory created — ${path}`, "")
        break
      }

      case "echo":  push(arg || "", ""); break
      case "pwd":   push(currentDirRef.current, ""); break
      case "whoami": push("KRITIMAN-PC\\Kritiman", ""); break
      case "date":  push(new Date().toLocaleString(), ""); break

      case "tree": {
        const root = arg ? (SHORTCUTS[arg.toLowerCase()] || resolvePath(arg)) : currentDirRef.current
        if (!fsRef.current[root]) { push(`Path not found: ${root}`, ""); break }
        const printTree = (path, prefix = "") => {
          const node = fsRef.current[path]
          if (!node?.children) return
          node.children.forEach((name, i) => {
            const cp     = path === "C:\\" ? `C:\\${name}` : `${path}\\${name}`
            const isLast = i === node.children.length - 1
            const isDir  = fsRef.current[cp]?.type === "dir"
            push(`${prefix}${isLast ? "└── " : "├── "}${name}${isDir ? "\\" : ""}`)
            if (isDir) printTree(cp, prefix + (isLast ? "    " : "│   "))
          })
        }
        push(root)
        printTree(root)
        push("")
        break
      }

      case "cls":
      case "clear": return null

      case "": push(""); break

      default:
        push(`'${cmd}' is not recognized as an internal or external command.`, `Type 'help' for available commands.`, "")
    }

    return out
  }

  const handleKey = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      const idx = Math.min(historyIdx + 1, history.length - 1)
      setHistoryIdx(idx); setInput(history[idx] || "")
      return
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      const idx = Math.max(historyIdx - 1, -1)
      setHistoryIdx(idx); setInput(idx === -1 ? "" : history[idx])
      return
    }
    if (e.key !== "Enter") return

    const cmd    = input.trim()
    const prompt = `${currentDirRef.current}>`
    setHistory(h => [cmd, ...h])
    setHistoryIdx(-1)

    const result = runCommand(cmd)
    if (result === null) {
      setLines([""])
    } else {
      setLines(l => [...l, `${prompt} ${input}`, ...(result || [])])
    }
    setInput("")
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50)
  }

  return (
    <div
      style={{ background: "#0c0c0c", height: "100%", display: "flex", flexDirection: "column" }}
      onClick={() => document.getElementById("term-input")?.focus()}
    >
      {/* Breadcrumb bar */}
      <div style={{
        background: "#1a1a1a", borderBottom: "1px solid #2a2a2a",
        padding: "5px 12px", display: "flex", alignItems: "center", gap: 4, flexShrink: 0,
      }}>
        <span style={{ color: "#569cd6", fontSize: 11, fontFamily: "Consolas, monospace" }}>📁</span>
        {currentDir.split("\\").map((part, i, arr) => (
          <React.Fragment key={i}>
            <span
              onClick={() => {
                const path = arr.slice(0, i + 1).join("\\") || "C:\\"
                if (fsRef.current[path]?.type === "dir") changeDir(path)
              }}
              style={{
                color: i === arr.length - 1 ? "#4ec9b0" : "#569cd6",
                fontSize: 11, fontFamily: "Consolas, monospace",
                cursor: "pointer",
                fontWeight: i === arr.length - 1 ? 700 : 400,
              }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
              onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
            >{part || "C:"}</span>
            {i < arr.length - 1 && (
              <span style={{ color: "#444", fontSize: 11, fontFamily: "Consolas, monospace" }}>›</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Output */}
      <div style={{ flex: 1, overflow: "auto", fontFamily: "Consolas, monospace", fontSize: 12, color: "#c8c8c8", lineHeight: 1.6, padding: 12 }}>
        {lines.map((l, i) => (
          <div key={i} style={{
            color: l.startsWith("C:\\") ? "#4ec9b0"
                 : l.startsWith("┌") || l.startsWith("│") || l.startsWith("└") || l.startsWith("├") ? "#569cd6"
                 : l.startsWith("'") || l.startsWith("The system") || l.startsWith("File not") || l.startsWith("Path not") ? "#f48771"
                 : "#c8c8c8"
          }}>{l || "\u00A0"}</div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", alignItems: "center", borderTop: "1px solid #222", padding: "6px 12px" }}>
        <span style={{ color: "#4ec9b0", fontFamily: "Consolas, monospace", fontSize: 12, whiteSpace: "nowrap" }}>
          {currentDir}&gt;&nbsp;
        </span>
        <input
          id="term-input" autoFocus value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#c8c8c8", fontFamily: "Consolas, monospace", fontSize: 12, caretColor: "#fff" }}
        />
      </div>
    </div>
  )
}

// ── Notepad ───────────────────────────────────────────────────────
function NotepadApp() {
  const content = `About Me\n========\n\nName    : Kritiman Talukdar\nRole    : Full Stack AI Engineer\nLocation: Assam, India\n\nSummary\n-------\nI'm a developer who loves building immersive\ndigital experiences at the intersection of\nweb, mobile, and artificial intelligence.\n\nEducation\n---------\nB.Tech in Electrical Engineering from NIT Silchar\nGraduation: 2028\n\nHobbies\n-------\n- Making Websites and Apps\n- Open source contribution\n- Gaming\n- Playing Football`
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#f0f0f0", borderBottom: "1px solid #ddd", padding: "2px 8px", display: "flex", gap: 16 }}>
        {["File","Edit","Format","View","Help"].map(m => (
          <span key={m} style={{ fontSize: 12, cursor: "pointer", padding: "2px 4px" }}
            onMouseEnter={e => e.currentTarget.style.background = "#d0e0f0"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >{m}</span>
        ))}
      </div>
      <textarea readOnly defaultValue={content} style={{ flex: 1, border: "none", outline: "none", resize: "none", padding: 12, fontFamily: "Consolas, monospace", fontSize: 13, lineHeight: 1.7, color: "#111" }} />
    </div>
  )
}

// ── File Explorer ─────────────────────────────────────────────────
function FileExplorer() {
  const [selected,   setSelected]   = useState(null)
  const [openFolder, setOpenFolder] = useState(null)

  const folders = {
    "💼 Experience": [
      { name: "Data Insight and Market Research Intern.txt",  content: "Role: Python Developer\nDuration: 2025 June - 2025 September\nStack: Python, ScikitLearn, Statistics, Tensorflow" },
      { name: "Execute Head ML Club NITS.txt",     content: "Role: Executive\nDuration: 2025-present\nStack: Core Ml" },
    ],
    "🛠 Skills": [
      { name: "Frontend.txt",  content: "React, Next.js, Three.js\nTailwind, TypeScript, Framer Motion, React Three Fiber" },
      { name: "Backend.txt",   content: "Node.js, Python, Django, FastAPI\nPostgreSQL, MongoDB, Redis" },
      { name: "AI & ML.txt",   content: "LangChain ,Langgraph  ,OpenAI API\nHuggingFace, TensorFlow" },
      { name: "DevOps.txt",    content: "Docker, AWS, Vercel, Git, CI/CD" },
      { name: "3D.txt",        content: "Three.js, R3F, Blender, Figma" },
      {name: "App.txt", content: "Flutter, React Native, Expo, Firebase" },
    ],
    "🎓 Education": [
      { name: "Degree.txt",  content: "B.Tech - Computer Science\nGraduation: 2024\nGPA: 8.9/10" },
    ],
    "📁 Projects": [
      { name: "Ziddfit.txt", content: "Gym Management web and mobile app\nTech: React, Django, Redis, Celery\TanStatus: Ongoing ✓" },
      { name: "8112AI.txt",   content: "LLM powered chat app\nTech: FastAPI, LangChain, React\nStatus: Live ✓" },
      {name: "Scholr.txt", content:"Daily Routine and Task Management app\nTech: Flutter, Local Storage\nStatus: Live ✓" },
    ],
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(180deg,#f5f5f5,#e0e0e0)", borderBottom: "1px solid #bbb", padding: "4px 8px", display: "flex", gap: 8, alignItems: "center" }}>
        <button style={{ fontSize: 11, padding: "2px 8px", background: "#ddd", border: "1px solid #bbb", borderRadius: 2, cursor: "pointer" }}>← Back</button>
        <button style={{ fontSize: 11, padding: "2px 8px", background: "#ddd", border: "1px solid #bbb", borderRadius: 2, cursor: "pointer" }}>→ Forward</button>
        <span style={{ fontSize: 11, marginLeft: 8, color: "#555" }}>📂 Kritiman's Files</span>
      </div>
      <div style={{ flex: 1, display: "flex" }}>
        <div style={{ width: 160, background: "#f0f4f8", borderRight: "1px solid #ddd", padding: 8 }}>
          <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Folders</div>
          {Object.keys(folders).map(name => (
            <div key={name} onClick={() => { setOpenFolder(name); setSelected(null) }}
              style={{ padding: "6px 8px", borderRadius: 3, fontSize: 12, cursor: "pointer", background: openFolder === name ? "#cce0f5" : "transparent", fontWeight: openFolder === name ? 600 : 400, marginBottom: 2 }}
              onMouseEnter={e => { if (openFolder !== name) e.currentTarget.style.background = "#ddeeff" }}
              onMouseLeave={e => { if (openFolder !== name) e.currentTarget.style.background = "transparent" }}
            >{name}</div>
          ))}
        </div>
        <div style={{ flex: 1, display: "flex" }}>
          <div style={{ width: 180, borderRight: "1px solid #eee", padding: 8 }}>
            {openFolder ? folders[openFolder].map(file => (
              <div key={file.name} onClick={() => setSelected(file)}
                style={{ padding: "6px 8px", borderRadius: 3, fontSize: 12, cursor: "pointer", background: selected?.name === file.name ? "#cce0f5" : "transparent", marginBottom: 2 }}
                onMouseEnter={e => { if (selected?.name !== file.name) e.currentTarget.style.background = "#ddeeff" }}
                onMouseLeave={e => { if (selected?.name !== file.name) e.currentTarget.style.background = "transparent" }}
              >📄 {file.name}</div>
            )) : <div style={{ fontSize: 12, color: "#999", padding: 8 }}>Select a folder</div>}
          </div>
          <div style={{ flex: 1, padding: 16 }}>
            {selected
              ? <><div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, color: "#333" }}>📄 {selected.name}</div>
                  <pre style={{ fontSize: 12, color: "#444", lineHeight: 1.8, fontFamily: "Consolas, monospace", whiteSpace: "pre-wrap" }}>{selected.content}</pre></>
              : <div style={{ fontSize: 12, color: "#999", marginTop: 20, textAlign: "center" }}>Select a file to preview</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Browser ───────────────────────────────────────────────────────
function FakeBrowser() {
  const [tabs,      setTabs]      = useState([{ id: 1, url: "https://wikipedia.org", title: "Wikipedia", loading: false }])
  const [activeTab, setActiveTab] = useState(1)
  const [inputUrl,  setInputUrl]  = useState("https://wikipedia.org")
  const iframeRef = useRef()
  const active = tabs.find(t => t.id === activeTab)

  const navigate = (url) => {
    let fullUrl = url.trim()
    const lower = fullUrl.toLowerCase()
    if (lower === "example")                       fullUrl = "https://example.com"
    else if (lower === "wiki" || lower === "wikipedia") fullUrl = "https://wikipedia.org"
    else if (lower === "hn"   || lower === "hackernews") fullUrl = "https://news.ycombinator.com"
    else if (fullUrl.includes(".")) {
      if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) fullUrl = "https://" + fullUrl
    } else {
      fullUrl = `https://duckduckgo.com/?q=${encodeURIComponent(url)}`
    }
    setTabs(t => t.map(tab => tab.id === activeTab ? { ...tab, url: fullUrl, title: fullUrl, loading: true } : tab))
    setInputUrl(fullUrl)
  }

  const addTab = () => {
    const id = Date.now()
    setTabs(t => [...t, { id, url: "https://wikipedia.org", title: "New Tab", loading: false }])
    setActiveTab(id)
    setInputUrl("https://wikipedia.org")
  }

  const closeTab = (id, e) => {
    e.stopPropagation()
    if (tabs.length === 1) return
    const remaining = tabs.filter(t => t.id !== id)
    setTabs(remaining)
    if (activeTab === id) { setActiveTab(remaining[remaining.length - 1].id); setInputUrl(remaining[remaining.length - 1].url) }
  }

  const handleLoad = () => {
    setTabs(t => t.map(tab => tab.id === activeTab
      ? { ...tab, loading: false, title: inputUrl.replace("https://","").replace("http://","").split("/")[0] }
      : tab
    ))
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: "linear-gradient(180deg, #e8e8e8, #d0d0d0)", borderBottom: "1px solid #aaa", flexShrink: 0 }}>
        {/* Tabs */}
        <div style={{ display: "flex", alignItems: "flex-end", padding: "6px 6px 0", gap: 2 }}>
          {tabs.map(tab => (
            <div key={tab.id} onClick={() => { setActiveTab(tab.id); setInputUrl(tab.url) }}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: "4px 4px 0 0", background: activeTab === tab.id ? "linear-gradient(180deg,#fff,#f5f5f5)" : "linear-gradient(180deg,#d0d0d0,#c0c0c0)", border: "1px solid #aaa", borderBottom: activeTab === tab.id ? "1px solid #fff" : "none", cursor: "pointer", maxWidth: 160, minWidth: 80, fontSize: 11, userSelect: "none" }}
            >
              <img src={`https://www.google.com/s2/favicons?domain=${tab.url}&sz=16`} style={{ width: 14, height: 14, flexShrink: 0 }} onError={e => e.target.style.display = "none"} />
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 11, color: "#222" }}>{tab.loading ? "Loading..." : tab.title}</span>
              {tabs.length > 1 && (
                <span onClick={(e) => closeTab(tab.id, e)} style={{ fontSize: 11, color: "#666", padding: "0 2px", borderRadius: 2 }}
                  onMouseEnter={e => e.currentTarget.style.background = "#e0e0e0"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >✕</span>
              )}
            </div>
          ))}
          <div onClick={addTab} style={{ padding: "4px 10px", cursor: "pointer", fontSize: 16, color: "#555", borderRadius: "4px 4px 0 0" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >+</div>
        </div>
        {/* Nav bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 8px 6px" }}>
          {[
            { label: "←", action: () => iframeRef.current?.contentWindow?.history?.back() },
            { label: "→", action: () => iframeRef.current?.contentWindow?.history?.forward() },
            { label: "↻", action: () => navigate(active?.url) },
          ].map((btn, i) => (
            <button key={i} onClick={btn.action} style={{ width: 26, height: 24, background: "linear-gradient(180deg,#f5f5f5,#e0e0e0)", border: "1px solid #bbb", borderRadius: 3, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(180deg,#fff,#eee)"}
              onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(180deg,#f5f5f5,#e0e0e0)"}
            >{btn.label}</button>
          ))}
          <div style={{ flex: 1, display: "flex", alignItems: "center", background: "#fff", border: "1px solid #bbb", borderRadius: 3, padding: "0 8px", height: 24, gap: 6 }}>
            <span style={{ fontSize: 11 }}>{active?.url?.startsWith("https") ? "🔒" : "🔓"}</span>
            <input value={inputUrl} onChange={e => setInputUrl(e.target.value)} onKeyDown={e => e.key === "Enter" && navigate(inputUrl)} onFocus={e => e.target.select()}
              style={{ flex: 1, border: "none", outline: "none", fontSize: 12, color: "#222", background: "transparent" }}
            />
            {active?.loading && <span style={{ fontSize: 11, color: "#888" }}>⏳</span>}
          </div>
          <button onClick={() => navigate(inputUrl)} style={{ padding: "3px 12px", fontSize: 11, height: 24, background: "linear-gradient(180deg,#4a90d9,#1f5fa6)", color: "#fff", border: "none", borderRadius: 3, cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(180deg,#5ba0e9,#2f6fb6)"}
            onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(180deg,#4a90d9,#1f5fa6)"}
          >Go</button>
        </div>
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        {tabs.map(tab => (
          <iframe key={tab.id} ref={tab.id === activeTab ? iframeRef : null}
            src={tab.url} onLoad={tab.id === activeTab ? handleLoad : undefined}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: tab.id === activeTab ? "block" : "none" }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-navigation"
          />
        ))}
      </div>
    </div>
  )
}

// ── Clock ─────────────────────────────────────────────────────────
function Clock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ color: "#fff", fontSize: 11, textAlign: "right", padding: "0 8px" }}>
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      <br />
      <span style={{ fontSize: 10, opacity: 0.7 }}>{time.toLocaleDateString()}</span>
    </div>
  )
}

// ── Desktop ───────────────────────────────────────────────────────
function Win7Desktop({ onReboot }) {
  const [windows, setWindows] = useState([])
  const [focused, setFocused] = useState(null)

  const APPS = [
    { id: "terminal", label: "Terminal",    icon: ">_", component: <TerminalApp />  },
    { id: "notepad",  label: "Notepad",     icon: "📝", component: <NotepadApp />   },
    { id: "explorer", label: "My Computer", icon: "💻", component: <FileExplorer /> },
    { id: "browser",  label: "Browser",     icon: "🌐", component: <FakeBrowser />  },
  ]

  const openApp     = (app) => {
    if (windows.find(w => w.id === app.id)) { setFocused(app.id); return }
    const offsets = windows.length * 24
    setWindows(w => [...w, { ...app, minimized: false, pos: { x: 60 + offsets, y: 40 + offsets } }])
    setFocused(app.id)
  }
  const closeApp    = (id) => setWindows(w => w.filter(x => x.id !== id))
  const minimizeApp = (id) => setWindows(w => w.map(x => x.id === id ? { ...x, minimized: true }  : x))
  const restoreApp  = (id) => { setWindows(w => w.map(x => x.id === id ? { ...x, minimized: false } : x)); setFocused(id) }

  const handleReboot = () => {
    setWindows([])
    setTimeout(() => onReboot(), 800)
  }

  return (
    <div style={{
      width: "100%", height: "100%",
      backgroundImage: "url('/wallpapers/windows71.webp')",
      backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
      position: "relative", overflow: "hidden",
      fontFamily: "'Segoe UI', Tahoma, sans-serif",
    }}>

      {/* Desktop icons */}
      <div style={{ position: "absolute", top: 16, left: 16, display: "flex", flexDirection: "column", gap: 20 }}>
        {APPS.map(app => (
          <div key={app.id} onDoubleClick={() => openApp(app)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", padding: "6px 8px", borderRadius: 4, width: 72 }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <span style={{ fontSize: 32 }}>{app.icon}</span>
            <span style={{ fontSize: 11, color: "#fff", textAlign: "center", textShadow: "0 1px 3px rgba(0,0,0,0.8)", lineHeight: 1.2 }}>{app.label}</span>
          </div>
        ))}
      </div>


      {/* Windows */}
      {windows.filter(w => !w.minimized).map(win => (
        <Win7Window key={win.id} title={win.label} icon={win.icon}
          focused={focused === win.id} onFocus={() => setFocused(win.id)}
          onClose={() => closeApp(win.id)} onMinimize={() => minimizeApp(win.id)}
          defaultPos={win.pos}
        >{win.component}</Win7Window>
      ))}

      {/* Taskbar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 40, background: "linear-gradient(180deg,rgba(20,60,130,0.97),rgba(10,40,100,0.99))", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", gap: 4, padding: "0 8px" }}>

        {/* Restart button */}
        <button onClick={handleReboot} title="Restart Windows"
          style={{ background: "linear-gradient(180deg,#c0392b,#922b21)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 3, padding: "4px 14px", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
          onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(180deg,#e74c3c,#c0392b)"}
          onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(180deg,#c0392b,#922b21)"}
        >
          <span style={{ fontSize: 14 }}>↺</span> Restart
        </button>

        <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.2)", margin: "0 4px" }} />

        {windows.map(win => (
          <button key={win.id} onClick={() => win.minimized ? restoreApp(win.id) : minimizeApp(win.id)}
            style={{ background: focused === win.id && !win.minimized ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 3, padding: "4px 12px", color: "#fff", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, minWidth: 100 }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            onMouseLeave={e => e.currentTarget.style.background = focused === win.id ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)"}
          >{win.icon} {win.label}</button>
        ))}

        <div style={{ marginLeft: "auto" }}><Clock /></div>
      </div>

      <style>{`@keyframes winOpen { from { opacity:0; transform:scale(0.95) } to { opacity:1; transform:scale(1) } }`}</style>
    </div>
  )
}

// ── Root ──────────────────────────────────────────────────────────
export default function Win7System() {
  const [loggedIn,      setLoggedIn]      = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [rebooting,     setRebooting]     = useState(false)

  const handleLogin = () => {
    setTransitioning(true)
    setTimeout(() => { setLoggedIn(true); setTransitioning(false) }, 600)
  }

  const handleReboot = () => {
    setRebooting(true)
    setLoggedIn(false)
    setTimeout(() => setRebooting(false), 1200)
  }

  if (rebooting) return (
    <div style={{ width: "100%", height: "100%", background: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, width: 48, height: 48 }}>
        {["#f25022","#7fba00","#00a4ef","#ffb900"].map((c, i) => (
          <div key={i} style={{ background: c, borderRadius: 2, opacity: 0.4 }} />
        ))}
      </div>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: 3, textTransform: "uppercase" }}>
        Restarting...
      </div>
      <div style={{ width: 160, height: 2, background: "#222", borderRadius: 2, overflow: "hidden", marginTop: 8 }}>
        <div style={{ height: "100%", background: "#c0392b", borderRadius: 2, animation: "rebootBar 1s ease forwards" }} />
      </div>
      <style>{`@keyframes rebootBar { from { width:0% } to { width:100% } }`}</style>
    </div>
  )

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: transitioning ? 0 : 1, transition: "opacity 0.6s ease" }}>
        {loggedIn
          ? <Win7Desktop onReboot={handleReboot} />
          : <Win7Login   onLogin={handleLogin}   />
        }
      </div>
    </div>
  )
}