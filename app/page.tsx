export default function Home() {
  return (
    <main>
      <section className="section-ots">
        <div className="container-ots">
          {/* Header — the real OTS tagline using the new utilities */}
          <div className="text-center mb-20">
            <p className="type-label text-accent mb-8">Step 3b — Type scale</p>
            <h1 className="type-hero text-ink mb-10 max-w-4xl mx-auto">
              Behind every smooth business is a{" "}
              <span className="type-accent-word">better</span> system.
            </h1>
            <p className="type-body-lg text-ink-soft max-w-2xl mx-auto">
              The type scale is now codified. Every heading, body size, and UI
              label is a utility class matching Brand Bible §4.2.
            </p>
          </div>

          {/* Full scale showcase — one style per row */}
          <div className="max-w-3xl mx-auto space-y-16">
            <div>
              <p className="type-label text-muted mb-4">type-hero</p>
              <p className="type-hero text-ink">The quick brown fox</p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">type-h2</p>
              <p className="type-h2 text-ink">The quick brown fox jumps</p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">type-h3</p>
              <p className="type-h3 text-ink">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">
                type-h4 · Inter 600
              </p>
              <p className="type-h4 text-ink">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">type-body-lg</p>
              <p className="type-body-lg text-ink-soft">
                Body large — for section subheads and intro paragraphs. The
                quick brown fox jumps over the lazy dog. The quick brown fox
                jumps over the lazy dog.
              </p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">type-body</p>
              <p className="type-body text-ink-soft">
                Body regular — the default reading size. The quick brown fox
                jumps over the lazy dog. The quick brown fox jumps over the
                lazy dog. The quick brown fox jumps over the lazy dog.
              </p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">type-body-sm</p>
              <p className="type-body-sm text-ink-soft">
                Body small — for meta and secondary information. The quick
                brown fox jumps over the lazy dog.
              </p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">
                type-label · Inter 600 uppercase
              </p>
              <p className="type-label text-ink">The quick brown fox</p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">type-button</p>
              <button className="type-button rounded-pill bg-accent text-cream px-7 py-3.5 hover:bg-accent-deep transition-colors">
                Request an Audit
              </button>
            </div>

            <div>
              <p className="type-label text-muted mb-4">type-caption</p>
              <p className="type-caption text-muted">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">
                type-numeral · Anton at oversized scale
              </p>
              <p className="type-numeral" style={{ color: "var(--color-accent-tint)" }}>
                01
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
