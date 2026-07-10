import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroMap from "@/components/HeroMap";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import Stagger, { StaggerItem } from "@/components/motion/Stagger";
import { SERVICES, STEPS } from "@/data/services";

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const svc = SERVICES[params.slug];
  if (!svc) return {};
  return {
    title: `${svc.title} — DPV Offshore Sri Lanka`,
    description: svc.intro,
  };
}

export default function ServicePage({ params }) {
  const svc = SERVICES[params.slug];
  if (!svc) notFound();

  const others = Object.values(SERVICES).filter((s) => s.slug !== svc.slug);

  return (
    <>
      <Navbar />
      <main>
        {/* Service hero */}
        <section className="relative overflow-hidden bg-brand-dark-hero">
          <HeroMap className="opacity-55" />
          <div className="pointer-events-none relative mx-auto max-w-[1400px] px-12 pb-24 pt-20">
            <Link
              href="/"
              className="pointer-events-auto inline-flex items-center gap-2 font-dmsans text-xs font-bold tracking-[1.8px] text-white/60 transition-colors hover:text-brand-orange-light"
            >
              <ArrowLeft size={14} />
              BACK TO HOME
            </Link>
            <p className="mt-10 font-poppins text-sm font-bold tracking-[0.15em] text-brand-orange-light">
              {svc.kicker}
            </p>
            <h1 className="mt-4 font-inter text-[clamp(44px,5.5vw,88px)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
              {svc.title}
            </h1>
            <p className="mt-7 max-w-[620px] text-lg leading-[1.8] text-gray-300">{svc.intro}</p>
          </div>
        </section>

        {/* Scope */}
        <section className="bg-surface px-8 py-24 transition-colors duration-300">
          <div className="mx-auto max-w-[1400px]">
            <Reveal as="p" className="font-poppins text-sm font-bold uppercase tracking-[0.15em] text-brand-orange">
              SCOPE OF SERVICES
            </Reveal>
            <Reveal
              as="h2"
              className="mt-3.5 font-poppins text-[clamp(32px,3.4vw,44px)] font-bold leading-tight tracking-[-0.03em] text-ink"
            >
              {svc.scopeHeading}
            </Reveal>
            <Stagger className="mt-12 grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 xl:grid-cols-3">
              {svc.scope.map((item, i) => (
                <StaggerItem
                  key={item.t}
                  className="rounded-3xl bg-surface-alt px-8 py-9 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
                >
                  <div className="font-poppins text-[15px] font-extrabold text-brand-orange">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h4 className="mt-3.5 font-poppins text-xl font-bold text-ink">{item.t}</h4>
                  <p className="mt-3 text-sm leading-[1.8] text-ink-secondary">{item.d}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Process */}
        <section className="bg-surface-alt px-8 py-24 transition-colors duration-300">
          <div className="mx-auto max-w-[1400px]">
            <Reveal as="p" className="font-poppins text-sm font-bold uppercase tracking-[0.15em] text-brand-orange">
              HOW WE WORK
            </Reveal>
            <Reveal
              as="h2"
              className="mt-3.5 font-poppins text-[clamp(32px,3.4vw,44px)] font-bold leading-tight tracking-[-0.03em] text-ink"
            >
              Your project, guided step by step.
            </Reveal>
            <Stagger className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {STEPS.map((sp) => (
                <StaggerItem key={sp.num}>
                  <div className="bg-gradient-to-b from-brand-purple via-[rgba(94,83,139,0.5)] to-[rgba(255,242,242,0.5)] bg-clip-text font-poppins text-[64px] font-extrabold leading-none text-transparent dark:from-ink dark:via-[rgba(163,170,191,0.6)] dark:to-[rgba(20,23,28,0.4)]">
                    {sp.num}
                  </div>
                  <h4 className="mt-4 font-poppins text-lg font-bold text-ink">{sp.title}</h4>
                  <p className="mt-3 text-sm leading-[1.8] text-ink-secondary">{sp.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Other services */}
        <section className="bg-surface px-8 pb-24 pt-20 transition-colors duration-300">
          <div className="mx-auto max-w-[1400px]">
            <Reveal as="p" className="font-poppins text-sm font-bold uppercase tracking-[0.15em] text-brand-orange">
              EXPLORE MORE
            </Reveal>
            <Stagger className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2">
              {others.map((os) => (
                <StaggerItem key={os.slug}>
                  <Link
                    href={`/services/${os.slug}`}
                    className="group flex items-center justify-between gap-5 rounded-3xl bg-brand-purple px-9 py-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(37,26,102,0.25)]"
                  >
                    <div>
                      <div className="font-poppins text-[13px] font-extrabold text-brand-orange-light">
                        {os.num}
                      </div>
                      <div className="mt-2 font-poppins text-[22px] font-bold text-white">
                        {os.title}
                      </div>
                    </div>
                    <ArrowRight
                      size={24}
                      className="flex-none text-brand-orange-light transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
