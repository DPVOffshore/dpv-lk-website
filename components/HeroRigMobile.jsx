// Decorative animated rig illustration used as the mobile hero backdrop
// (replaces HeroMap below the `lg` breakpoint — see Hero.jsx). Colors use
// the site's ink/brand-orange design tokens so it flips with dark mode
// automatically, same as the rest of the page.
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

      <g
        className="[transform-box:fill-box] [transform-origin:center_bottom] animate-[rig-rise_1s_cubic-bezier(0.22,1,0.36,1)_both]"
      >
        <g className="animate-[rig-bob_6s_ease-in-out_1s_infinite] motion-reduce:animate-none">
          <circle
            cx="255"
            cy="26"
            r="44"
            fill="url(#hero-rig-glow)"
            className="animate-[rig-glow_3s_ease-in-out_infinite] motion-reduce:animate-none"
          />

          {/* derrick */}
          <g className="stroke-ink/45" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="216" y1="210" x2="248" y2="46" />
            <line x1="294" y1="210" x2="262" y2="46" />
            <line x1="216" y1="210" x2="294" y2="210" />
            <line x1="221.5" y1="182" x2="288.5" y2="182" />
            <line x1="226.9" y1="154" x2="283.1" y2="154" />
            <line x1="232.4" y1="126" x2="277.6" y2="126" />
            <line x1="237.9" y1="98" x2="272.1" y2="98" />
            <line x1="243" y1="72" x2="267" y2="72" />
            <line x1="246.8" y1="52" x2="263.2" y2="52" />
          </g>
          <g className="stroke-ink/45" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round">
            <line x1="221.5" y1="182" x2="294" y2="210" />
            <line x1="288.5" y1="182" x2="216" y2="210" />
            <line x1="226.9" y1="154" x2="288.5" y2="182" />
            <line x1="283.1" y1="154" x2="221.5" y2="182" />
            <line x1="232.4" y1="126" x2="283.1" y2="154" />
            <line x1="277.6" y1="126" x2="226.9" y2="154" />
            <line x1="237.9" y1="98" x2="277.6" y2="126" />
            <line x1="272.1" y1="98" x2="232.4" y2="126" />
            <line x1="243" y1="72" x2="272.1" y2="98" />
            <line x1="267" y1="72" x2="237.9" y2="98" />
            <line x1="246.8" y1="52" x2="267" y2="72" />
            <line x1="263.2" y1="52" x2="243" y2="72" />
          </g>
          <rect x="212" y="200" width="86" height="11" className="fill-ink/70" />
          <line x1="255" y1="50" x2="255" y2="205" className="stroke-ink/45" strokeWidth="1.3" opacity="0.5" />

          {/* traveling block */}
          <g className="animate-[rig-travel_3.2s_ease-in-out_infinite] motion-reduce:animate-none">
            <rect x="245" y="66" width="20" height="7" rx="2" className="fill-ink/70" />
            <circle cx="255" cy="78" r="2.3" className="fill-ink/70" />
          </g>

          <rect x="244" y="40" width="22" height="8" className="fill-ink/70" />
          <circle
            cx="255"
            cy="40"
            r="2.6"
            className="fill-brand-orange animate-[rig-beacon_1.6s_ease-in-out_infinite] motion-reduce:animate-none"
          />
          <line x1="255" y1="40" x2="255" y2="28" className="stroke-ink/45" strokeWidth="2.4" />

          {/* flame */}
          <g className="[transform-box:fill-box] [transform-origin:center_bottom] animate-[rig-flame_1.1s_ease-in-out_infinite] motion-reduce:animate-none">
            <path d="M255 28 C 244 16 260 9 250 1 C 267 7 271 22 264 28 Z" className="fill-brand-orange" />
            <path d="M255 28 C 250 20 259 15 254 7 C 262 13 263 24 259 28 Z" className="fill-brand-orange-light" opacity="0.92" />
          </g>
          <g className="fill-brand-orange">
            <circle cx="256" cy="6" r="1.7" className="[transform-box:fill-box] animate-[rig-spark_1.6s_linear_infinite] motion-reduce:animate-none" />
            <circle cx="251" cy="9" r="1.3" className="[transform-box:fill-box] [animation-delay:0.5s] animate-[rig-spark_2.1s_linear_infinite] motion-reduce:animate-none" />
            <circle cx="260" cy="8" r="1.2" className="[transform-box:fill-box] [animation-delay:0.9s] animate-[rig-spark_1.9s_linear_infinite] motion-reduce:animate-none" />
          </g>

          {/* deckhouse */}
          <g className="fill-ink/70">
            <rect x="118" y="150" width="30" height="60" />
            <rect x="150" y="116" width="30" height="94" />
            <rect x="182" y="142" width="26" height="68" />
          </g>

          {/* crane */}
          <g className="stroke-ink/45" strokeWidth="4.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="96" y1="150" x2="96" y2="210" />
            <line x1="96" y1="150" x2="28" y2="108" />
            <line x1="96" y1="172" x2="34" y2="138" />
            <line x1="96" y1="150" x2="62" y2="210" />
          </g>
          <g className="stroke-ink/45" strokeWidth="1.5" fill="none" opacity="0.5">
            <line x1="50" y1="121" x2="56" y2="150" />
            <line x1="72" y1="133" x2="78" y2="162" />
            <line x1="42" y1="116" x2="90" y2="150" />
          </g>
          <g className="[transform-box:view-box] [transform-origin:28px_108px] animate-[rig-swing_4.2s_ease-in-out_infinite] motion-reduce:animate-none">
            <line x1="28" y1="108" x2="28" y2="150" className="stroke-ink/45" strokeWidth="2" />
            <rect x="23" y="150" width="10" height="13" rx="2" className="fill-ink/70" />
          </g>

          {/* hull */}
          <rect x="80" y="210" width="232" height="20" className="fill-ink/70" />
          <g className="fill-ink/70">
            <rect x="86" y="230" width="18" height="10" />
            <rect x="130" y="230" width="18" height="10" />
            <rect x="196" y="230" width="18" height="10" />
            <rect x="260" y="230" width="18" height="10" />
          </g>
          <g className="fill-ink/70">
            <rect x="130" y="230" width="14" height="70" />
            <rect x="192" y="230" width="14" height="70" />
            <rect x="254" y="230" width="14" height="70" />
          </g>
        </g>
      </g>

      {/* ocean */}
      <g fill="none" strokeLinecap="round">
        <g className="stroke-ink/20 animate-[rig-wave_7s_linear_infinite] motion-reduce:animate-none" strokeWidth="5.5" opacity="0.36">
          <path d="M-44 342 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0" />
        </g>
        <g className="stroke-ink/30 [animation-direction:reverse] animate-[rig-wave_5.5s_linear_infinite] motion-reduce:animate-none" strokeWidth="6.5" opacity="0.62">
          <path d="M-44 322 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0" />
        </g>
        <g className="animate-[rig-boat_16s_linear_infinite] motion-reduce:animate-none">
          <path d="M0 303 L30 303 L26 311 L4 311 Z" className="fill-ink/70" />
          <rect x="9" y="294" width="11" height="9" className="fill-ink/45" />
          <rect x="21" y="291" width="3" height="12" className="fill-ink/45" />
        </g>
        <g className="fill-ink/45">
          <circle cx="164" cy="300" r="2" className="[transform-box:fill-box] animate-[rig-bubble_3s_ease-in_infinite] motion-reduce:animate-none" />
          <circle cx="169" cy="300" r="1.5" className="[transform-box:fill-box] [animation-delay:1.1s] animate-[rig-bubble_3.6s_ease-in_infinite] motion-reduce:animate-none" />
        </g>
        <g className="stroke-ink/45 animate-[rig-wave_4s_linear_infinite] motion-reduce:animate-none" strokeWidth="7">
          <path d="M-44 302 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0 q 11 -12 22 0 q 11 12 22 0" />
        </g>
      </g>
    </svg>
  );
}
