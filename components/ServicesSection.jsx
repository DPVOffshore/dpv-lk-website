import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import Reveal from "./motion/Reveal";
import Stagger, { StaggerItem } from "./motion/Stagger";

export default function ServicesSection() {
  return (
    <section id="services" className="bg-surface-alt px-8 py-24 transition-colors duration-300">
      <div className="mx-auto max-w-[1400px]">
        <Reveal as="p" className="font-poppins text-sm font-bold uppercase tracking-[0.15em] text-brand-orange">
          WHAT WE DO
        </Reveal>
        <div className="mt-3.5 flex flex-wrap items-end justify-between gap-8">
          <Reveal
            as="h2"
            className="max-w-[560px] font-poppins text-[clamp(36px,4vw,48px)] font-bold leading-tight tracking-[-0.03em] text-ink"
          >
            Three services.
            <br />
            One safe pair of hands.
          </Reveal>
          <Reveal as="p" className="max-w-[440px] text-base leading-[1.8] text-ink-secondary">
            Delivering safe, efficient and cost-effective marine solutions from
            Sri Lanka&apos;s key ports, ensuring maximum value every time.
          </Reveal>
        </div>
        <Stagger className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {Object.values(SERVICES).map((s) => (
            <StaggerItem key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group block rounded-3xl border border-line bg-surface-card p-10 transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-card-lg"
              >
                <div className="bg-gradient-to-b from-brand-purple via-[rgba(94,83,139,0.5)] to-[rgba(255,242,242,0.5)] bg-clip-text font-poppins text-[56px] font-extrabold leading-none text-transparent dark:from-ink dark:via-[rgba(163,170,191,0.6)] dark:to-[rgba(24,27,33,0.4)]">
                  {s.num}
                </div>
                <h3 className="mt-6 font-poppins text-[28px] font-bold leading-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.8] text-ink-secondary">{s.teaser}</p>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {s.highlights.map((hl) => (
                    <li
                      key={hl}
                      className="flex items-center gap-2.5 text-sm font-medium text-brand-purple dark:text-ink"
                    >
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-brand-orange" />
                      {hl}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-center gap-2 font-dmsans text-xs font-bold tracking-[1.8px] text-brand-orange">
                  EXPLORE SERVICE
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
