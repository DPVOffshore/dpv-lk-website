# DPV Offshore & Marine Services — Sri Lanka (.lk website)

Next.js 14 (App Router) + Tailwind CSS implementation of the DPV Offshore Sri Lanka site: Shipping, Ship Management and Ship Charters.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

```
app/
  layout.jsx               Root layout — Google fonts (Poppins/Inter/DM Sans), metadata
  globals.css              Tailwind directives + selection/link colors
  page.jsx                 Homepage
  services/[slug]/page.jsx Service detail pages (shipping, ship-management, ship-charters)
components/
  Navbar.jsx               Sticky navbar with active pill (client)
  Hero.jsx                 Dark hero with animated map
  HeroMap.jsx              Canvas: real Natural Earth geography, glowing Sri Lanka,
                           7 shipping routes with moving ship glyphs + hover tooltips (client)
  PortsTicker.jsx          Orange marquee of SL ports
  ServicesSection.jsx      3 service cards
  AboutStats.jsx           About copy + count-up stats (client)
  WhyChooseUs.jsx          Hexagon badge feature grid
  ClientLogos.jsx          Customer logo marquee
  CallToAction.jsx         Lavender CTA card with contact info
  Footer.jsx               Dark footer with registrations
data/
  services.js              All service/nav content in one place
public/assets/             Logos + customer logos
```

## Notes

- The hero map fetches country boundaries at runtime from
  `https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json` (Natural Earth 50m)
  and renders via `topojson-client`. To ship fully offline, download that JSON into
  `public/` and change the fetch URL in `components/HeroMap.jsx`.
- Sri Lanka is intentionally enlarged 1.5× and shifted SE on the map so the island
  reads clearly; route landing points (Colombo / Trincomalee) are matched to that shift.
- Stats in `components/AboutStats.jsx` (10+ years, 120+ vessels, 350+ port calls)
  are placeholders — replace with real figures.
- Brand tokens (colors, shadows, fonts, keyframes) live in `tailwind.config.js`.
