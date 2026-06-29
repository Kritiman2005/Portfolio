import Section from './Section'
import { skills } from '../data'

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="My toolkit">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s) => (
          <div
            key={s.group}
            className="reveal rounded-2xl border border-line bg-cloud/70 p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-sun">{s.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-line bg-cream px-2.5 py-1 text-sm text-ink/80"
                >
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
