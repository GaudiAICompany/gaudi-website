const logos = [
  { src: "/msft.png", alt: "Microsoft" },
  { src: "/amzn.png", alt: "Amazon" },
  { src: "/gs.png", alt: "Goldman Sachs" },
  { src: "/harvard.png", alt: "Harvard" },
  { src: "/chicago.png", alt: "University of Chicago" },
  { src: "/adtheorent.png", alt: "AdTheorent" },
]

export default function BackedBy() {
  return (
    <section className="border-y border-border bg-secondary/40 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Team experience spans construction, product, and AI at
        </p>
        <div className="relative mt-8 overflow-hidden">
          <div className="flex w-max animate-scroll items-center gap-16">
            {[...logos, ...logos].map((logo, i) => (
              <img
                key={`${logo.alt}-${i}`}
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                className="h-7 w-auto opacity-50 grayscale transition-opacity hover:opacity-80"
                aria-hidden={i >= logos.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
