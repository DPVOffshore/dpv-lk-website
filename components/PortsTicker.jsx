import { Diamond } from "lucide-react";

const ITEMS = [
  "PORT OF COLOMBO",
  "HAMBANTOTA",
  "GALLE",
  "TRINCOMALEE",
  "24/7 PORT SUPPORT",
];

export default function PortsTicker() {
  const loop = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden bg-brand-orange py-3.5">
      <div className="flex w-max animate-marquee-fast motion-reduce:animate-none">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap px-7 font-poppins text-sm font-bold tracking-[0.15em] text-white"
          >
            {item}
            <Diamond size={8} className="ml-14 fill-current text-brand-dark-hero" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
