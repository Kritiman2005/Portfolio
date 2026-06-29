import { profile, images } from '../data'

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line/70 py-20 sm:py-28">
      <div className="container-px">
        <div className="reveal relative overflow-hidden rounded-3xl border border-line p-8 text-center sm:p-14">
          <img
            src={images.heroClouds}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/80 to-cream/95" />
          <div className="pointer-events-none absolute -right-10 -top-10 size-40 animate-float-slow rounded-full bg-sun/30 blur-3xl" />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-sun">Contact</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              Let's build something intelligent.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/70">
              Open to AI and full-stack opportunities, collaborations, and interesting problems.
              The fastest way to reach me is email.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-ink/85"
              >
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="rounded-full border border-ink/15 bg-cloud/70 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/30"
              >
                {profile.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
