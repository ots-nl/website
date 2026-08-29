export default function Home() {
  return (
    <main>
      <section className="section-ots">
        <div className="container-ots text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-6">
            Step 2b — Design tokens & layout primitives
          </p>
          <h1 className="text-4xl font-bold text-ink mb-4 leading-tight">
            Ontwikkeling Tech Services
          </h1>
          <p className="text-base text-ink-soft mb-10 leading-relaxed max-w-xl mx-auto">
            The visual foundation now includes a 1280px container with responsive
            padding, a section with generous vertical rhythm, and border radius
            tokens for chips, cards, and pills.
          </p>

          <div className="flex gap-2 justify-center flex-wrap mb-10">
            <span className="px-3 py-1 rounded-chip text-xs bg-cream-deep text-ink">
              rounded-chip · cream-deep
            </span>
            <span className="px-3 py-1 rounded-chip text-xs bg-accent text-cream">
              rounded-chip · accent
            </span>
            <span className="px-3 py-1 rounded-chip text-xs bg-night text-cream">
              rounded-chip · night
            </span>
            <span className="px-3 py-1 rounded-chip text-xs bg-mist text-ink">
              rounded-chip · mist
            </span>
          </div>

          <div className="inline-block bg-cream-deep rounded-card p-8 mb-10 max-w-md">
            <p className="text-sm text-ink-soft leading-relaxed">
              This card uses <code className="text-accent">rounded-card</code>{" "}
              (20px). The container respects 96px side padding on desktop,
              48px on tablet, 24px on mobile.
            </p>
          </div>

          <div className="mb-10">
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
