"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./motion/Reveal";
import Stagger, { StaggerItem } from "./motion/Stagger";

const STATS = [
  { target: 10, suffix: "+", label: "Years of Experience" },
  { target: 120, suffix: "+", label: "Vessels Served" },
  { target: 350, suffix: "+", label: "Port Calls Handled" },
  { target: 4, suffix: "", label: "Sri Lankan Ports" },
];

export default function AboutStats() {
  const ref = useRef(null);
  const counted = useRef(false);
  const [p, setP] = useState(1); // start at final values; animate when visible

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = () => {
      if (counted.current) return;
      counted.current = true;
      const t0 = performance.now();
      const tick = (now) => {
        const q = Math.min((now - t0) / 1400, 1);
        setP(1 - Math.pow(1 - q, 3));
        if (q < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="about" className="bg-surface px-8 py-24 transition-colors duration-300">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-x-[72px] gap-y-12 lg:grid-cols-2">
        <Reveal>
          <p className="font-poppins text-sm font-bold uppercase tracking-[0.15em] text-brand-orange">
            ABOUT US
          </p>
          <h2 className="mt-3.5 font-poppins text-[clamp(32px,3.4vw,44px)] font-bold leading-tight tracking-[-0.03em] text-ink">
            A trusted marine, offshore &amp; subsea partner — recognized for
            quality, safety and on-time delivery.
          </h2>
          <p className="mt-6 text-base leading-[1.8] text-ink-secondary">
            Founded in 2018 by Duminda Gunathilake and a team of seasoned
            marine professionals, DPV Offshore set out to raise industry
            standards with comprehensive, dependable and high-quality
            maritime solutions. What began locally has grown into a
            world-class engineering group delivering reliable, end-to-end
            marine and industrial solutions across the Middle East, South
            Asia and beyond.
          </p>
          <p className="mt-4 text-base leading-[1.8] text-ink-secondary">
            Every project is guided by five principles: safety first in
            every job and location, quality workmanship and attention to
            detail, integrity and transparency in all dealings, commitment
            to on-time delivery, and pride in our Sri Lankan roots alongside
            a global standard of service.
          </p>
          <blockquote className="mt-7 border-l-[3px] border-brand-orange pl-5 font-poppins text-[17px] font-semibold leading-normal text-brand-purple dark:text-ink">
            &ldquo;Anchored in Sri Lanka. Connected to the world.&rdquo;
          </blockquote>
        </Reveal>
        <div ref={ref}>
          <Stagger className="grid grid-cols-2 gap-6">
            {STATS.map((st) => (
              <StaggerItem key={st.label} className="rounded-3xl bg-surface-alt px-8 py-9">
                <div className="font-poppins text-[52px] font-extrabold leading-none text-brand-purple dark:text-ink">
                  {Math.round(st.target * p)}
                  <span className="text-brand-orange">{st.suffix}</span>
                </div>
                <div className="mt-3 font-inter text-sm font-semibold uppercase tracking-[0.05em] text-ink-secondary">
                  {st.label}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <a
            href="https://dpvoffshore.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-light px-9 py-4 font-dmsans text-xs font-bold tracking-[1.8px] text-white shadow-btn transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03]"
          >
            MORE ABOUT US <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
