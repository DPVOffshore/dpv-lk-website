import { Anchor, Clock, ShieldCheck, Globe2 } from "lucide-react";
import Reveal from "./motion/Reveal";
import Stagger, { StaggerItem } from "./motion/Stagger";

const REASONS = [
  {
    Icon: Anchor,
    title: "Island-wide Port Coverage",
    body: "One agency agreement covering Colombo, Hambantota, Galle and Trincomalee — no gaps, no handoffs.",
  },
  {
    Icon: Clock,
    title: "Always-on Operations",
    body: "A 24/7 operations desk in Colombo backed by our regional hubs in Dubai and Singapore.",
  },
  {
    Icon: ShieldCheck,
    title: "Safety & Compliance First",
    body: "ISM, ISPS and MLC discipline in everything we do — your asset stays inspection-ready.",
  },
  {
    Icon: Globe2,
    title: "Regional Group Network",
    body: "Part of the DPV Offshore group serving 20+ countries across the Gulf and Indian Ocean.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-surface-alt px-8 py-24 transition-colors duration-300">
      <div className="mx-auto max-w-[1400px]">
        <Reveal as="p" className="font-poppins text-sm font-bold uppercase tracking-[0.15em] text-brand-orange">
          WHY CHOOSE US
        </Reveal>
        <Reveal
          as="h2"
          className="mt-3.5 font-poppins text-[clamp(32px,3.4vw,44px)] font-bold leading-tight tracking-[-0.03em] text-ink"
        >
          Built for owners who can&apos;t afford delays.
        </Reveal>
        <Stagger className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {REASONS.map((r) => (
            <StaggerItem key={r.title} className="flex flex-col gap-5">
              <div
                className="flex h-20 w-[72px] items-center justify-center bg-brand-orange"
                style={{
                  clipPath:
                    "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                }}
              >
                <r.Icon className="text-white" size={28} strokeWidth={1.75} />
              </div>
              <h4 className="font-poppins text-xl font-bold text-ink">{r.title}</h4>
              <p className="text-sm leading-[1.8] text-ink-secondary">{r.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
