import Section from './Section'
import { services } from '../data'

export default function Services() {
  return (
    <Section id="services" eyebrow="What I do" title="From idea to production">
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="reveal group relative overflow-hidden rounded-2xl border border-line bg-cloud/70 p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-sun/15 blur-2xl transition group-hover:bg-sun/30" />
            <span className="font-mono text-sm text-sun/70">0{i + 1}</span>
            <h3 className="mt-3 text-xl font-semibold text-ink">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{s.description}</p>
            <ul className="mt-5 space-y-2">
              {s.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-ink/70">
                  <span className="size-1.5 rounded-full bg-sun" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
