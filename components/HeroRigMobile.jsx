// Decorative animated rig illustration used as the mobile hero backdrop
// (replaces HeroMap below the `lg` breakpoint — see Hero.jsx). Geometry is
// modeled on the DPV logo mark: X-braced derrick with flare stack, lattice
// crane, stepped deckhouse, jack-up hull with three legs, and three bold
// wave lines. Colors use the site's ink/brand-orange design tokens so it
// flips with dark mode automatically, same as the rest of the page.
export default function HeroRigMobile({ className = "" }) {
  return (
    <svg
      viewBox="0 0 340 360"
      preserveAspectRatio="xMidYMin slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hero-rig-glow">
          <stop offset="0" stopColor="#EC4A0A" stopOpacity="0.5" />
          <stop offset="1" stopColor="#EC4A0A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="[transform-box:fill-box] [transform-origin:center_bottom] animate-[rig-rise_1s_cubic-bezier(0.22,1,0.36,1)_both]">
        <g className="animate-[rig-bob_6s_ease-in-out_1s_infinite] motion-reduce:animate-none">
          <circle
            cx="255"
            cy="22"
            r="44"
            fill="url(#hero-rig-glow)"
            className="animate-[rig-glow_3s_ease-in-out_infinite] motion-reduce:animate-none"
          />

          {/* derrick — tapered rails with bold X-bracing, like the logo mark */}
          <g className="stroke-ink/70" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="216" y1="210" x2="248" y2="60" />
            <line x1="294" y1="210" x2="262" y2="60" />
          </g>
          <g className="stroke-ink/70" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* X braces, one per bay */}
            <line x1="216" y1="210" x2="287.6" y2="180" />
            <line x1="294" y1="210" x2="222.4" y2="180" />
            <line x1="222.4" y1="180" x2="281.2" y2="150" />
            <line x1="287.6" y1="180" x2="228.8" y2="150" />
            <line x1="228.8" y1="150" x2="274.8" y2="120" />
            <line x1="281.2" y1="150" x2="235.2" y2="120" />
            <line x1="235.2" y1="120" x2="268.4" y2="90" />
            <line x1="274.8" y1="120" x2="241.6" y2="90" />
            <line x1="241.6" y1="90" x2="262" y2="60" />
            <line x1="268.4" y1="90" x2="248" y2="60" />
            {/* horizontal chords at each bay line */}
            <line x1="222.4" y1="180" x2="287.6" y2="180" />
            <line x1="228.8" y1="150" x2="281.2" y2="150" />
            <line x1="235.2" y1="120" x2="274.8" y2="120" />
            <line x1="241.6" y1="90" x2="268.4" y2="90" />
          </g>
          {/* derrick base beam + crown */}
          <rect x="210" y="200" width="90" height="12" className="fill-ink/80" />
          <rect x="245" y="54" width="20" height="8" rx="1" className="fill-ink/80" />

          {/* kelly line + traveling block */}
          <line x1="255" y1="62" x2="255" y2="200" className="stroke-ink/45" strokeWidth="1.4" opacity="0.6" />
          <g className="animate-[rig-travel_3.2s_ease-in-out_infinite] motion-reduce:animate-none">
            <rect x="246" y="78" width="18" height="7" rx="2" className="fill-ink/80" />
            <circle cx="255" cy="90" r="2.3" className="fill-ink/80" />
          </g>

          {/* flare stack + beacon */}
          <rect x="251.5" y="36" width="7" height="20" className="fill-ink/80" />
          <circle
            cx="264"
            cy="58"
            r="2.6"
            className="fill-brand-orange animate-[rig-beacon_1.6s_ease-in-out_infinite] motion-reduce:animate-none"
          />

          {/* flame — plump, curvy tongues like the logo */}
          <g className="[transform-box:fill-box] [transform-origin:center_bottom] animate-[rig-flame_1.1s_ease-in-out_infinite] motion-reduce:animate-none">
            <path
              d="M249 37
                 C 239 27, 246 18, 243 7
                 C 250 11, 252 16, 254 9
                 C 256 14, 255 18, 259 5
                 C 266 14, 270 27, 262 37 Z"
              className="fill-brand-orange"
            />
            <path
              d="M252.5 37
                 C 248 30, 252 24, 250.5 16
                 C 255 20, 256 25, 257.5 18
                 C 261 25, 261 32, 258 37 Z"
              className="fill-brand-orange-light"
              opacity="0.92"
            />
          </g>
          <g className="fill-brand-orange">
            <circle cx="257" cy="4" r="1.7" className="[transform-box:fill-box] animate-[rig-spark_1.6s_linear_infinite] motion-reduce:animate-none" />
            <circle cx="250" cy="8" r="1.3" className="[transform-box:fill-box] [animation-delay:0.5s] animate-[rig-spark_2.1s_linear_infinite] motion-reduce:animate-none" />
            <circle cx="262" cy="9" r="1.2" className="[transform-box:fill-box] [animation-delay:0.9s] animate-[rig-spark_1.9s_linear_infinite] motion-reduce:animate-none" />
          </g>

          {/* deckhouse — abutting stepped blocks, like the logo */}
          <g className="fill-ink/80">
            <rect x="116" y="152" width="30" height="58" />
            <rect x="146" y="116" width="32" height="94" />
            <rect x="178" y="144" width="26" height="66" />
          </g>
          {/* small deck block right of the derrick */}
          <rect x="298" y="194" width="18" height="16" className="fill-ink/80" />

          {/* crane — lattice boom with hanging block */}
          <rect x="88" y="198" width="16" height="12" className="fill-ink/80" />
          <g className="stroke-ink/70" strokeWidth="4.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="96" y1="150" x2="96" y2="204" />
            <line x1="96" y1="150" x2="28" y2="108" />
            <line x1="98" y1="172" x2="34" y2="138" />
            <line x1="96" y1="150" x2="62" y2="204" />
          </g>
          <g className="stroke-ink/70" strokeWidth="2.4" fill="none" opacity="0.7" strokeLinecap="round">
            <line x1="42" y1="117" x2="46" y2="146" />
            <line x1="58" y1="127" x2="63" y2="156" />
            <line x1="74" y1="137" x2="80" y2="166" />
            <line x1="42" y1="145" x2="60" y2="128" />
            <line x1="60" y1="156" x2="76" y2="138" />
          </g>
          <g className="[transform-box:view-box] [transform-origin:28px_108px] animate-[rig-swing_4.2s_ease-in-out_infinite] motion-reduce:animate-none">
            <line x1="28" y1="108" x2="28" y2="150" className="stroke-ink/70" strokeWidth="2" />
            <rect x="22" y="150" width="12" height="14" rx="2" className="fill-ink/80" />
          </g>

          {/* hull — deck bar with a wider hull band beneath (sponsons), like the logo */}
          <rect x="80" y="210" width="236" height="12" className="fill-ink/80" />
          <rect x="66" y="222" width="260" height="18" className="fill-ink/80" />

          {/* legs — three chunky columns into the water */}
          <g className="fill-ink/80">
            <rect x="116" y="240" width="20" height="70" />
            <rect x="186" y="240" width="20" height="70" />
            <rect x="256" y="240" width="20" height="70" />
          </g>
        </g>
      </g>

      {/* ocean — three bold wave lines, matching the logo mark */}
      <g fill="none" strokeLinecap="round">
        <g className="stroke-ink/30 animate-[rig-wave_7s_linear_infinite] motion-reduce:animate-none" strokeWidth="8" opacity="0.5">
          <path d="M-44 342 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0" />
        </g>
        <g className="stroke-ink/45 [animation-direction:reverse] animate-[rig-wave_5.5s_linear_infinite] motion-reduce:animate-none" strokeWidth="8.5" opacity="0.75">
          <path d="M-44 322 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0" />
        </g>
        <g className="stroke-ink/60 animate-[rig-wave_4s_linear_infinite] motion-reduce:animate-none" strokeWidth="9">
          <path d="M-44 302 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0 q 11 -16 22 0 q 11 16 22 0" />
        </g>
      </g>
    </svg>
  );
}