import Section from './Section'
import { projects } from '../data'

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  )
}

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Featured work">
      <div className="space-y-10">
        {projects.map((p) => (
          <article
            key={p.name}
            className="reveal group grid overflow-hidden rounded-3xl border border-line bg-cloud/70 shadow-sm transition hover:shadow-xl hover:shadow-ink/10 md:grid-cols-2"
          >
            {/* Image */}
            <div className="relative min-h-64 overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent md:bg-gradient-to-r" />
            </div>

            {/* Body */}
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-sun">{p.blurb}</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {p.name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">{p.description}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-line bg-cream px-2.5 py-1 font-mono text-xs text-ink/60"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-ink/85"
                  >
                    <GithubIcon className="size-4" />
                    View code
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/30"
                  >
                    Live demo
                    <ArrowIcon className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
