"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/services";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-surface shadow-nav transition-colors duration-300">
      <div className="flex min-h-[80px] w-full items-center justify-between gap-4 px-6 py-2 md:px-10 lg:px-14">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/assets/dpv_logo.png" alt="DPV Offshore" width={188} height={60} className="h-[52px] w-auto" />
          <span className="font-poppins text-[11px] font-bold tracking-[0.15em] text-brand-purple dark:text-ink">
            SRI LANKA
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            const external = link.href.startsWith("http");
            return (
              <Link
                key={link.href}
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className={`whitespace-nowrap rounded-full px-4 py-2 font-inter text-[13px] font-bold tracking-[0.1em] transition-colors ${
                  active
                    ? "bg-brand-orange text-white"
                    : "text-brand-purple hover:text-brand-orange dark:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle className="ml-1" />
          <a
            href="#contact"
            className="ml-1.5 inline-flex items-center whitespace-nowrap rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-light px-[22px] py-3 font-dmsans text-xs font-bold tracking-[1.8px] text-white shadow-btn transition-transform duration-300 hover:-translate-y-[3px] hover:scale-[1.03]"
          >
            CONTACT US
          </a>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full text-ink"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="flex items-center justify-center"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-surface lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                const external = link.href.startsWith("http");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={`rounded-xl px-4 py-3 font-inter text-sm font-bold tracking-[0.1em] transition-colors ${
                      active
                        ? "bg-brand-orange text-white"
                        : "text-brand-purple hover:bg-surface-alt hover:text-brand-orange dark:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <a
                href="#contact"
                className="mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-light px-[22px] py-3.5 font-dmsans text-xs font-bold tracking-[1.8px] text-white shadow-btn"
              >
                CONTACT US
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
