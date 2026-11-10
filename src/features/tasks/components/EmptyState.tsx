export function EmptyState() {
  return (
    <div className="glass flex flex-col items-center gap-4 rounded-2xl border border-dashed p-10 text-center">
      {/* Aurora: Mond mit drei Sternen */}
      <svg
        width={120}
        height={120}
        viewBox="0 0 120 120"
        aria-hidden
        className="hidden [[data-look=aurora]_&]:block"
      >
        <circle cx="60" cy="60" r="34" className="fill-accent opacity-80" />
        <circle cx="60" cy="60" r="34" className="fill-background opacity-40" />
        <path
          d="M60 26a34 34 0 0 1 0 68 38 38 0 0 1 0-68z"
          className="fill-accent"
        />
        <circle cx="30" cy="28" r="3" className="fill-accent animate-pulse" />
        <circle cx="88" cy="20" r="4" className="fill-accent animate-pulse" />
        <circle cx="96" cy="52" r="2" className="fill-accent animate-pulse" />
      </svg>
      {/* Candy: lächelnde Wolke */}
      <svg
        width={120}
        height={120}
        viewBox="0 0 120 120"
        aria-hidden
        className="hidden [[data-look=candy]_&]:block"
      >
        <path
          d="M40 84a16 16 0 0 1-4-31 24 24 0 0 1 46-6 18 18 0 0 1 2 37z"
          className="fill-accent"
        />
        <circle cx="46" cy="66" r="4" className="fill-background" />
        <circle cx="74" cy="66" r="4" className="fill-background" />
        <path d="M52 78q8 8 16 0" className="fill-none stroke-background" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {/* Neon: Blitz in einem Kreis */}
      <svg
        width={120}
        height={120}
        viewBox="0 0 120 120"
        aria-hidden
        className="hidden [[data-look=neon]_&]:block"
      >
        <circle cx="60" cy="60" r="42" className="fill-none stroke-primary" strokeWidth="4" />
        <polygon
          points="64,36 46,66 58,66 54,84 76,52 63,52 67,36"
          className="fill-accent"
        />
      </svg>
      <p className="font-heading text-xl">Alles erledigt. Zeit für Kaffee.</p>
      <p className="text-muted-foreground">Tippe oben eine neue Aufgabe ein oder drücke N.</p>
    </div>
  )
}
