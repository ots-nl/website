export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-6">
          Step 2a — Brand tokens verification
        </p>
        <h1 className="text-4xl font-bold text-ink mb-4 leading-tight">
          Ontwikkeling Tech Services
        </h1>
        <p className="text-base text-ink-soft mb-8 leading-relaxed">
          The visual foundation is in place. Cream background, ink text,
          considered accent. Everything else builds on this.
        </p>
        <div className="flex gap-2 justify-center flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs bg-cream-deep text-ink">
            cream-deep
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-accent text-cream">
            accent
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-night text-cream">
            night
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-mist text-ink">
            mist
          </span>
        </div>
        <p className="text-xs text-muted mt-12">
          Behind every smooth business is a better system.
        </p>
      </div>
    </main>
  );
}
