import { profile } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-line/70 py-10">
      <div className="container-px flex flex-col items-center justify-between gap-4 text-sm text-ink/50 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, Vite & Tailwind.
        </p>
        <div className="flex items-center gap-6">
          <a href={profile.github} target="_blank" rel="noreferrer" className="transition hover:text-ink">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-ink">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="transition hover:text-ink">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
