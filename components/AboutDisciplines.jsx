import Image from "next/image";
import Reveal from "./motion/Reveal";
import Stagger, { StaggerItem } from "./motion/Stagger";

const PILLARS = [
  {
    title: "Single point of answer",
    body: "No subcontracted handoffs between harbours. Whoever takes the call owns it until the vessel is away.",
  },
  {
    title: "Shore and sea, one house",
    body: "Agency, technical management, engineering and supply sit together, so a fault found on deck is not waiting on a second company to quote it.",
  },
  {
    title: "Partners on call",
    body: "Our partners work around the clock to meet the requirements, so whatever is needed can be found, priced and delivered without delay.",
  },
];

const DISCIPLINES = [
  { img: "c03_agency", title: "Port Agency & Husbandry", body: "Clearance, berth attendance, sea marshal transfers and every formality between ship and shore." },
  { img: "c04_bunkering", title: "Bunkering, Water & Fuel", body: "Fresh water and lubricants supplied alongside or at anchorage." },
  { img: "c10_chandelling", title: "Ships Chandelling", body: "Provisions, bonded stores and deck and engine consumables, delivered to the pier." },
  { img: "c05_crew", title: "Crew Management", body: "Manning, certification, joining and repatriation — a full complement or one relief." },
  { img: "c08_maintenance", title: "Maintenance Afloat", body: "Hull, machinery, electrical and hydraulic repairs while the vessel remains in service." },
  { img: "c09_drydock", title: "Docking Services", body: "Docking specification, yard selection and supervision through to undocking." },
  { img: "c01_brokerage", title: "Brokerage & Commercial", body: "Time, voyage and bareboat fixtures, sale and purchase, and the negotiation behind them." },
  { img: "c07_management", title: "Management & Operations", body: "Technical and operational support, with ISM (International Safety Management) compliance." },
  { img: "c02_offshore", title: "Offshore & Marine Operations", body: "Platform, subsea and workboat support for operators working off the coast." },
  { img: "c06_projects", title: "Marine Project Development", body: "Scoping, engineering and site supervision for work outlasting a single port call." },
  { img: "c11_spares", title: "Machinery & Spare Parts", body: "Sourcing and supply of marine machinery and components, new and reconditioned." },
  { img: "c12_trade", title: "Import & Export", body: "Customs, freight and documentation for machinery moving by air, land and sea." },
];

export default function AboutDisciplines() {
  return (
    <div className="mx-auto mt-24 max-w-[1400px]">
      <div className="grid grid-cols-1 items-center gap-x-[72px] gap-y-12 lg:grid-cols-2">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src="/assets/ship-superintendent-master-office.webp"
            alt="Ship superintendent and master reviewing documents on board"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <div>
          <Reveal as="p" className="font-poppins text-sm font-bold uppercase tracking-[0.15em] text-brand-orange">
            THE MEASURE OF US
          </Reveal>
          <Reveal
            as="h3"
            className="mt-3.5 font-poppins text-[clamp(28px,3vw,38px)] font-bold leading-tight tracking-[-0.03em] text-ink"
          >
            Sail with passion.
          </Reveal>
          <Reveal as="p" className="mt-6 text-base leading-[1.8] text-ink-secondary">
            One umbrella over the entire coastline. One desk to answer, one
            standard to hold, one team to work your vessel — from first line
            ashore to sail-away. The stay is planned before she arrives, the
            work scoped before she berths, and the hands are waiting when she
            does.
          </Reveal>
          <Stagger className="mt-8 flex flex-col gap-4">
            {PILLARS.map((p) => (
              <StaggerItem key={p.title} className="rounded-3xl bg-surface-alt px-6 py-5">
                <h4 className="font-poppins text-base font-bold text-brand-purple dark:text-ink">
                  {p.title}
                </h4>
                <p className="mt-1.5 text-sm leading-[1.7] text-ink-secondary">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      <div className="mt-24">
        <Reveal as="p" className="font-poppins text-sm font-bold uppercase tracking-[0.15em] text-brand-orange">
          TWELVE DISCIPLINES
        </Reveal>
        <div className="mt-3.5 flex flex-wrap items-end justify-between gap-8">
          <Reveal
            as="h3"
            className="max-w-[560px] font-poppins text-[clamp(28px,3vw,38px)] font-bold leading-tight tracking-[-0.03em] text-ink"
          >
            From the moment a line goes ashore.
          </Reveal>
          <Reveal as="p" className="max-w-[440px] text-base leading-[1.8] text-ink-secondary">
            Our businesses support every voyage, from the contract desk and
            workshop through to the vessel&apos;s next destination.
          </Reveal>
        </div>
        <Stagger className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
          {DISCIPLINES.map((d) => (
            <StaggerItem
              key={d.title}
              className="group overflow-hidden rounded-3xl border border-line bg-surface-card transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-card-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={`/assets/${d.img}.webp`}
                  alt={d.title}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <h4 className="font-poppins text-lg font-bold text-ink">{d.title}</h4>
                <p className="mt-2 text-sm leading-[1.7] text-ink-secondary">{d.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
