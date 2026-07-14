import { ArrowUpRight } from "lucide-react";
import { MAIN_SITE_LINKS } from "@/data/services";
import Reveal from "./motion/Reveal";
import Stagger, { StaggerItem } from "./motion/Stagger";

export default function MainSiteSection() {
  return (
    <section className="bg-surface-alt px-8 py-24 transition-colors duration-300">
      <div className="mx-auto max-w-[1400px]">
        <Reveal as="p" className="font-poppins text-sm font-bold uppercase tracking-[0.15em] text-brand-orange">
          OUR CORE BUSINESS
        </Reveal>
        <div className="mt-3.5 flex flex-wrap items-end justify-between gap-8">
          <Reveal
            as="h2"
            className="max-w-[560px] font-poppins text-[clamp(36px,4vw,48px)] font-bold leading-tight tracking-[-0.03em] text-ink"
          >
            Explore the full DPV Offshore group.
          </Reveal>
          <Reveal as="p" className="max-w-[440px] text-base leading-[1.8] text-ink-secondary">
            Our active engineering, industrial and marine business runs on
            dpvoffshore.com — see the full group offering there.
          </Reveal>
        </div>
        <Stagger className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {MAIN_SITE_LINKS.map((item) => (
            <StaggerItem key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-3xl border border-line bg-surface-card p-8 transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-card-lg"
              >
                <h3 className="font-poppins text-xl font-bold leading-tight text-ink">
                  {item.label}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.8] text-ink-secondary">{item.desc}</p>
                <div className="mt-6 flex items-center gap-2 font-dmsans text-xs font-bold tracking-[1.8px] text-brand-orange">
                  DPVOFFSHORE.COM
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
