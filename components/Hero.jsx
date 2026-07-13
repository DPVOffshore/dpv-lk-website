import HeroMap from "./HeroMap";
import HeroRigMobile from "./HeroRigMobile";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100dvh_-_80px)] items-center overflow-hidden bg-surface transition-colors duration-300">
      <div className="hidden lg:block">
        <HeroMap />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 aspect-[340/300] overflow-hidden lg:hidden">
        <HeroRigMobile className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-surface" />
      </div>
      <div className="pointer-events-none relative mr-auto w-full max-w-[960px] px-6 pb-24 pt-[88%] sm:px-10 md:px-14 lg:px-16 lg:pt-24">
        <p className="mb-7 font-poppins text-sm font-bold tracking-[0.15em] text-brand-orange-light">
          DPV OFFSHORE &amp; MARINE SERVICES — SRI LANKA
        </p>
        <h1 className="font-inter text-[clamp(52px,6.4vw,104px)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
          YOUR VESSEL
          <br />
          IN <span className="text-brand-orange">SAFE</span> HANDS
        </h1>
        <p className="mt-8 max-w-[560px] font-inter text-lg leading-[1.8] text-ink-secondary">
          Shipping, ship management and charter services for vessels calling Sri
          Lankan ports — Colombo, Hambantota, Galle and Trincomalee. Operating
          24/7 at the crossroads of East–West trade.
        </p>
        <div className="pointer-events-auto mt-11 flex flex-wrap gap-4">
          <a
            href="#services"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-light px-9 py-4 font-dmsans text-xs font-bold tracking-[1.8px] text-white shadow-btn transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03]"
          >
            OUR SERVICES
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 rounded-full border border-line px-9 py-4 font-dmsans text-xs font-bold tracking-[1.8px] text-ink transition-colors duration-300 hover:border-brand-orange-light hover:text-brand-orange-light"
          >
            CONTACT US
          </a>
        </div>
      </div>
    </section>
  );
}
