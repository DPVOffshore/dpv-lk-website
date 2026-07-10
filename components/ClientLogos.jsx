/* eslint-disable @next/next/no-img-element */
import Reveal from "./motion/Reveal";

const LOGOS = [
  "MSC_logo.png",
  "Shell_logo.png",
  "adnoc_logo.png",
  "bp_logo.png",
  "Drydocks_World_logo.png",
  "koc_logo.png",
  "sinopec.png",
  "SLMD_logo.png",
];

export default function ClientLogos() {
  const loop = [...LOGOS, ...LOGOS];
  return (
    <section className="overflow-hidden bg-surface pb-[88px] pt-20 transition-colors duration-300">
      <Reveal as="p" className="text-center font-poppins text-sm font-bold uppercase tracking-[0.15em] text-brand-orange">
        OUR VALUED CUSTOMERS
      </Reveal>
      <div className="mt-11 flex w-max animate-marquee-slow motion-reduce:animate-none">
        {loop.map((file, i) => (
          <div
            key={i}
            className="mx-7 flex h-[72px] w-[180px] flex-none items-center justify-center rounded-2xl bg-white dark:p-3"
          >
            <img
              src={`/assets/customer-logos/${file}`}
              alt="Customer logo"
              className="max-h-16 max-w-[150px] object-contain opacity-65 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
