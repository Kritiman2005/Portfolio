export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line/70 py-20 sm:py-28">
      <div className="container-px">
        <div className="reveal mb-12">
          {eyebrow && (
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-sun">{eyebrow}</p>
          )}
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  )
}
