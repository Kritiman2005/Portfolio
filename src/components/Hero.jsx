import { profile, images } from '../data'
import { useParallax } from '../hooks/useParallax'

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  )
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z" />
    </svg>
  )
}

export default function Hero() {
  const { ref, offset } = useParallax()

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* Cloud photo layer */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-70 mix-blend-luminosity"
        style={{
          backgroundImage: `url(${images.heroClouds})`,
          transform: `translate3d(${offset.x * -18}px, ${offset.y * -18}px, 0) scale(1.1)`,
        }}
      />
      {/* Soft cloud puffs */}
      <div
        className="animate-drift pointer-events-none absolute -left-10 top-1/3 h-72 w-[36rem] rounded-full bg-cloud/70 blur-3xl"
        style={{ transform: `translate3d(${offset.x * 26}px, ${offset.y * 18}px, 0)` }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-[40rem] rounded-full bg-cream/80 blur-3xl"
        style={{ transform: `translate3d(${offset.x * -22}px, ${offset.y * -14}px, 0)` }}
      />
      {/* Sun */}
      <div
        className="animate-float-slow pointer-events-none absolute right-[10%] top-28 sm:top-32"
        style={{ transform: `translate3d(${offset.x * 40}px, ${offset.y * 30}px, 0)` }}
      >
        <div className="relative grid place-items-center">
          <div className="absolute size-40 rounded-full bg-sun/25 blur-2xl" />
          <div className="animate-spin-slow size-16 rounded-full bg-gradient-to-br from-sun-soft to-sun shadow-[0_0_60px_rgba(232,161,60,0.6)]" />
        </div>
      </div>
      {/* Bottom fade into page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-cream" />

      <div className="container-px relative flex min-h-[100svh] flex-col justify-center pt-28 pb-24">
        <div className="reveal is-visible inline-flex w-fit items-center gap-2 rounded-full border border-white/40 glass px-3 py-1.5 text-xs font-medium text-ink/70 shadow-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-sun opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-sun" />
          </span>
          Open to AI / Full-Stack roles
        </div>

        <h1 className="mt-7 text-balance text-6xl font-bold leading-[0.95] tracking-tight text-ink drop-shadow-sm sm:text-8xl">
          {profile.name.split(' ')[0]}
          <br />
          {profile.name.split(' ').slice(1).join(' ')}
        </h1>

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.35em] text-ink/60">
          {profile.role}
        </p>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">{profile.tagline}</p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-ink/85"
          >
            Get in touch
            <span className="transition group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#projects"
            className="rounded-full border border-ink/15 glass px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/30"
          >
            View work
          </a>
          <div className="ml-1 flex items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid size-11 place-items-center rounded-full border border-ink/15 glass text-ink/70 transition hover:border-ink/30 hover:text-ink"
            >
              <GithubIcon className="size-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid size-11 place-items-center rounded-full border border-ink/15 glass text-ink/70 transition hover:border-ink/30 hover:text-ink"
            >
              <LinkedinIcon className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
