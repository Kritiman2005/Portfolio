import Section from './Section'
import { education, images } from '../data'

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Engineering AI that ships">
      <div className="grid gap-10 md:grid-cols-5">
        <div className="reveal space-y-4 text-lg leading-relaxed text-ink/70 md:col-span-3">
          <p>
            I'm a Full Stack AI Engineer who likes living at the intersection of{' '}
            <span className="font-medium text-ink">applied AI</span> and{' '}
            <span className="font-medium text-ink">solid backend engineering</span>. I design
            multi-agent systems, RAG pipelines, and the distributed infrastructure that keeps them
            reliable in production.
          </p>
          <p>
            Recently I architected the multi-agent core of a clinical AI platform — adversarial
            reasoning loops, intent-aware retrieval, and OCR reconciliation that pushed document
            accuracy past 85%. I care about systems that are accurate, observable, and don't
            hallucinate when it matters.
          </p>
          <p>
            When I'm not wiring up agents, I'm building full-stack products end to end, from REST
            APIs and auth to polished React frontends.
          </p>

          <div className="!mt-8 rounded-2xl border border-line bg-cloud/70 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-sun">Education</p>
            <h3 className="mt-3 text-lg font-semibold text-ink">{education.school}</h3>
            <p className="mt-1 text-sm text-ink/60">{education.degree}</p>
            <p className="mt-3 font-mono text-xs text-ink/50">{education.period}</p>
          </div>
        </div>

        <div className="reveal md:col-span-2">
          <div className="group relative h-full min-h-72 overflow-hidden rounded-2xl border border-line">
            <img
              src={images.aboutAtmosphere}
              alt="Atmospheric clouds at dusk"
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 font-mono text-xs uppercase tracking-[0.25em] text-cream/90">
              Building in the clouds — literally.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
