import Reveal from "./motion/Reveal";

export default function CallToAction() {
  return (
    <section id="contact" className="bg-surface px-8 pb-24 transition-colors duration-300">
      <Reveal className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 rounded-[50px] bg-brand-cta px-8 py-16 shadow-card-lg md:px-16 md:py-20 lg:grid-cols-2">
        <div>
          <h2 className="font-poppins text-[clamp(30px,3.2vw,42px)] font-bold leading-tight tracking-[-0.03em] text-brand-purple">
            Become our customer — ready for smarter and faster service?
          </h2>
          <p className="mt-5 text-base leading-[1.8] text-brand-text-secondary">
            Our Colombo operations desk responds around the clock. Send your
            inquiry and get a detailed proposal, fast.
          </p>
          <a
            href="mailto:info@dpvoffshore.lk?subject=Service Inquiry via .lk Website"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-light px-9 py-4 font-dmsans text-xs font-bold uppercase tracking-[1.8px] text-white shadow-btn transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03]"
          >
            START NOW!
          </a>
        </div>
        <div className="flex flex-col gap-5">
          <div className="rounded-3xl bg-white/65 px-8 py-7">
            <p className="font-poppins text-xs font-bold tracking-[0.15em] text-brand-orange">
              HEAD OFFICE — COLOMBO
            </p>
            <p className="mt-2.5 text-[15px] font-medium leading-[1.8] text-brand-purple">
              DPV Offshore &amp; Marine Services (Pvt) Ltd
              <br />
              No. 59/2, Norris Canal Road,
              <br />
              Colombo 10, Sri Lanka
            </p>
          </div>
          <div className="rounded-3xl bg-white/65 px-8 py-7">
            <p className="font-poppins text-xs font-bold tracking-[0.15em] text-brand-orange">
              24/7 OPERATIONS
            </p>
            <p className="mt-2.5 text-[15px] font-medium leading-[1.8] text-brand-purple">
              <a href="mailto:info@dpvoffshore.lk" className="font-semibold text-brand-purple">
                info@dpvoffshore.lk
              </a>
              <br />
              <a href="tel:+94112682692" className="font-semibold text-brand-purple">
                +94 11 26 82 692
              </a>
              <br />
              Ports: Colombo · Hambantota · Galle · Trincomalee
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
