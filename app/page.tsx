export default function Home() {
  return (
    <main>
      <section className="section-ots">
        <div className="container-ots text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-8">
            Step 3a — Typography
          </p>

          <h1 className="font-display text-[clamp(48px,7vw,112px)] text-ink leading-[0.92] tracking-[-0.02em] mb-10 max-w-4xl mx-auto">
            Behind every smooth business is a{" "}
            <span className="font-italic italic text-accent">better</span>{" "}
            system.
          </h1>

          <p className="text-lg text-ink-soft leading-relaxed max-w-2xl mx-auto mb-12">
            The typography now carries the voice of the brand. Anton for
            display headlines, Cormorant Garamond italic for the single accent
            word, Inter for everything else you&apos;re reading right now.
          </p>

          <div className="flex gap-2 justify-center flex-wrap mb-10">
            <span className="px-3 py-1 rounded-chip text-xs bg-cream-deep text-ink">
              cream-deep
            </span>
            <span className="px-3 py-1 rounded-chip text-xs bg-accent text-cream">
              accent
            </span>
            <span className="px-3 py-1 rounded-chip text-xs bg-night text-cream">
              night
            </span>
            <span className="px-3 py-1 rounded-chip text-xs bg-mist text-ink">
              mist
            </span>
          </div>

          <div className="inline-block bg-cream-deep rounded-card p-8 mb-10 max-w-md">
            <p className="text-sm text-ink-soft leading-relaxed">
              Card body in Inter. Container respects 96px side padding on
              desktop, 48px on tablet, 24px on mobile.
            </p>
          </div>

          <div className="mb-12">
            <button className="rounded-pill bg-accent text-cream px-7 py-3.5 text-sm font-medium hover:bg-accent-deep transition-colors">
              Pill button — hover me
            </button>
          </div>

          <p className="text-xs text-muted">
            Behind every smooth business is a better system.
          </p>
        </div>
      </section>
    </main>
  );
}
