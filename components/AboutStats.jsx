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
    <section className="bg-surface px-8 py-24 transition-colors duration-300">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-x-[72px] gap-y-12 lg:grid-cols-2">
        <Reveal>
          <p className="font-poppins text-sm font-bold uppercase tracking-[0.15em] text-brand-orange">
            ABOUT US
          </p>
          <h2 className="mt-3.5 font-poppins text-[clamp(32px,3.4vw,44px)] font-bold leading-tight tracking-[-0.03em] text-ink">
            Your trusted partner in navigating tomorrow&apos;s maritime challenges.
          </h2>
          <p className="mt-6 text-base leading-[1.8] text-ink-secondary">
            DPV Offshore &amp; Marine Services (Pvt) Ltd does more than deliver
            maritime services — we deliver trust, reliability and innovation.
            From our base in Colombo, we serve international owners and
            operators with the same precision and dedication that define the
            maritime world.
          </p>
          <p className="mt-4 text-base leading-[1.8] text-ink-secondary">
            We value every partnership we build. Your success is at the heart of
            everything we do, backed by our regional network across the UAE,
            Singapore and the Indian Ocean.
          </p>
          <blockquote className="mt-7 border-l-[3px] border-brand-orange pl-5 font-poppins text-[17px] font-semibold leading-normal text-brand-purple">
            &ldquo;Anchored in Sri Lanka. Connected to the world.&rdquo;
          </blockquote>
        </Reveal>
        <div ref={ref}>
          <Stagger className="grid grid-cols-2 gap-6">
            {STATS.map((st) => (
              <StaggerItem key={st.label} className="rounded-3xl bg-surface-alt px-8 py-9">
                <div className="font-poppins text-[52px] font-extrabold leading-none text-brand-purple">
                  {Math.round(st.target * p)}
                  <span className="text-brand-orange">{st.suffix}</span>
                </div>
                <div className="mt-3 font-inter text-sm font-semibold uppercase tracking-[0.05em] text-ink-secondary">
                  {st.label}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
