import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/data/services";

export default function Footer() {
  return (
    <footer className="bg-brand-dark-footer px-8 pb-10 pt-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/assets/dpv_icon.png" alt="DPV Offshore" width={41} height={64} className="h-14 w-auto" />
              <h3 className="leading-tight">
                <span className="block font-poppins text-xl font-extrabold tracking-[-0.01em] text-brand-logo-red">
                  DPV offshore
                </span>
                <span className="mt-0.5 block font-poppins text-sm font-bold tracking-[-0.005em] text-brand-logo-navy">
                  Marine Services (Pvt) Ltd
                </span>
              </h3>
            </div>
            <p className="mt-4 text-sm leading-[1.8] text-gray-300">
              Shipping, ship management and ship charters for the Indian
              Ocean&apos;s busiest crossroads.
            </p>
          </div>
          <div>
            <h4 className="font-poppins text-sm font-bold uppercase tracking-[0.1em] text-white">
              Quick Links
            </h4>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV_LINKS.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="text-sm text-gray-300 transition-colors hover:text-brand-orange-alt"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href="https://dpvoffshore.com"
                  className="text-sm text-gray-300 transition-colors hover:text-brand-orange-alt"
                >
                  dpvoffshore.com — Global (UAE)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-poppins text-sm font-bold uppercase tracking-[0.1em] text-white">
              Registrations
            </h4>
            <ul className="mt-5 flex flex-col gap-3 text-sm leading-[1.7] text-gray-300">
              <li>
                Sri Lanka Company Reg: <span className="font-semibold text-white">PV 00270574</span>
              </li>
              <li>
                ShipServ – TNID: <span className="font-semibold text-white">311752</span>
              </li>
              <li>Group Licenses: Dubai 929197 · Abu Dhabi 6357970 · Fujairah TN-26-10934</li>
            </ul>
          </div>
          <div>
            <h4 className="font-poppins text-sm font-bold uppercase tracking-[0.1em] text-white">
              Follow Us
            </h4>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.linkedin.com/company/102757900/"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand-dark transition-colors hover:bg-brand-orange-alt hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-gray-800 pt-7 text-[13px] text-gray-500">
          <span>© 2026 DPV Offshore. All rights reserved.</span>
          <span className="font-poppins font-bold tracking-[0.1em] text-gray-300">
            YOUR ASSET IN SAFE HANDS
          </span>
        </div>
      </div>
    </footer>
  );
}
