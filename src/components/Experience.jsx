import Section from './Section'
import { experience } from '../data'

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <div className="space-y-8">
        {experience.map((job) => (
          <article
            key={job.company}
            className="reveal relative rounded-2xl border border-line bg-cloud/70 p-6 transition hover:shadow-lg hover:shadow-ink/5 sm:p-8"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-ink">
                  {job.role} <span className="text-sun">@ {job.company}</span>
                </h3>
                <p className="mt-1 text-sm text-ink/60">{job.summary}</p>
              </div>
              <p className="shrink-0 font-mono text-xs text-ink/50 sm:text-right">
                {job.period}
                <span className="block">{job.location}</span>
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              {job.points.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sun" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
