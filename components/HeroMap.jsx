"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { SHIP_ROUTES, MAINLINE_ROUTE } from "@/data/shipRoutes";

// Aspect-preserving equirectangular-style projection anchored so Sri Lanka
// sits right-of-center. Real geography from world-atlas (Natural Earth 50m).
// Sri Lanka is enlarged and shifted SE so the island reads clearly.
//
// Route network mirrors the Sri Lanka Ports Authority "shipping lanes"
// diagram: Colombo is the single hub, ~10nm off the Suez–Malacca East-West
// trunk lane, with a feeder network to every major port across the Gulf,
// East Africa, the subcontinent, Bangladesh, Myanmar and Singapore.
//
// ROUTE GEOMETRY — why waypoint paths, not single arcs:
// Real feeder routes are not smooth point-to-point curves. They do three
// things a single quadratic/cubic bezier cannot capture:
//   1. COASTAL HUGGING — west-India traffic runs parallel to the Malabar
//      coast southbound (Mumbai → Goa → Mangalore → Cochin → Cape Comorin
//      offing) before turning for Colombo. Gulf traffic first threads the
//      Strait of Hormuz / Gulf of Oman, THEN strikes out SE across the
//      Arabian Sea.
//   2. THE FUNNEL — all inbound traffic converges into a narrow approach
//      corridor in the last leg. Westbound arrivals enter through a
//      south-west gate; Bay of Bengal arrivals round Dondra Head (Adam's
//      Bridge blocks the Palk Strait at 1–10m depth) and climb into port
//      from the south. On the SLPA diagram this reads as routes bundling
//      into a tight braid near the island — the signature of the image.
//   3. MULTI-BEND HOOKS — an east-coast arrival is an S-manoeuvre: south
//      down the Bay, a turn west in open water below the island, then a
//      climb north up the west coast. Three distinct headings.
// So every route below is an ordered list of real navigational waypoints
// (5–8 per route), rendered as one smooth spline (quadratic segments
// through waypoint midpoints — same technique as the trunk line). Shared
// per-group "gate" waypoints near the island are what produce the braided
// funnel; small per-route offsets keep the strands separable on hover.

// The Sri Lanka landmass is drawn enlarged (see loadGeo below). Every
// waypoint is defined in real lon/lat, and any point that must respect the
// (bigger, shifted) island's coastline is produced by applying the exact
// same enlarge/shift transform — so routes and coastline can never drift
// out of sync.
const SL_K = 2.0, SL_C = [80.75, 7.6], SL_DLON = 1.4, SL_DLAT = -1.6;
const transformSL = ([lon, lat]) => [
  SL_C[0] + (lon - SL_C[0]) * SL_K + SL_DLON,
  SL_C[1] + (lat - SL_C[1]) * SL_K + SL_DLAT,
];

const COL = transformSL([79.85, 6.93]); // Port of Colombo → enlarged island's west coast

// Approach gates — the funnel. Derived relative to the ENLARGED island:
// its SW coast (Galle) transforms to ~[81.1, 2.9] and Dondra Head to
// ~[81.8, 2.6], so the southern corridor must sit below lat ~2.2 while the
// western approach stays west of lon ~79.9 until the final turn-in.
const GATE_W = [78.7, 4.35]; // SW gate — all westbound arrivals turn in here
const GATE_S1 = [84.4, 1.9]; // Bay of Bengal traffic drops below the island
const GATE_S2 = [81.9, 1.35]; // running west, well south of Dondra Head
const GATE_S3 = [79.95, 2.25]; // hard turn north begins
const GATE_S4 = [79.7, 3.6]; // climbing the west coast into port

// Small helper to offset a shared gate slightly per route so the funnel
// reads as a braided bundle (like the SLPA diagram) instead of one line.
const off = ([lon, lat], dLon, dLat) => [lon + dLon, lat + dLat];

// ---- WEST GROUP — Arabian Sea / Gulf / East Africa -----------------------
// Long coastal-then-oceanic legs; all converge on GATE_W.
const WEST_ROUTES = [
  {
    name: "Mombasa",
    pts: [
      [39.66, -4.05],
      [45.5, -2.6], // clearing the East African coast NE-bound
      [53, -0.4], // open Somali Basin
      [61, 1.4],
      [69, 2.9], // long gentle climb across the equatorial Indian Ocean
      [75, 3.8],
      off(GATE_W, -0.2, -0.3),
    ],
  },
  {
    name: "Mogadishu",
    pts: [
      [45.32, 2.04],
      [52.5, 2.7], // near-latitude run east across the Arabian Sea
      [60.5, 3.1],
      [68.5, 3.4],
      [74.8, 3.9],
      off(GATE_W, -0.15, -0.15),
    ],
  },
  {
    name: "Dubai",
    pts: [
      [55.27, 25.2],
      [55.6, 25.9], // NE up the Gulf, offshore of Ras al Khaimah
      [56.3, 26.85], // Hormuz apex — deliberately OVERSHOT north: the midpoint
      // smoothing never reaches a control point, so the rendered curve
      // peaks mid-strait (~26.6), clearing the Musandam tip (26.38)
      [57.15, 25.85], // out into the Gulf of Oman, east of the peninsula
      [58.6, 24.7],
      [60.0, 23.3], // Muscat offing — stay NE of the Muscat–Ras al Hadd coast
      [61.4, 21.4], // rounding Ras al Hadd, now striking SE across the Arabian Sea
      [65.8, 15.8],
      [71.2, 9.7],
      [75.5, 6.4],
      off(GATE_W, 0, 0.15),
    ],
  },
  {
    name: "Khor Fakkan",
    pts: [
      [56.34, 25.35],
      [57.7, 24.85], // already outside Hormuz — down the Gulf of Oman
      [59.5, 23.95], // Muscat offing
      [61.1, 22.5], // Ras al Hadd offing — the coast bulges east to 59.85E
      [65.4, 16.7],
      [71.0, 10.0],
      [75.7, 6.15],
      off(GATE_W, 0.1, 0.05),
    ],
  },
  {
    name: "Fujairah",
    pts: [
      [56.34, 25.12],
      [57.5, 24.6],
      [59.3, 23.7], // Muscat offing — one strand inside Khor Fakkan's
      [60.8, 22.2], // Ras al Hadd offing
      [64.8, 16.4],
      [70.5, 10.3],
      [75.4, 6.4],
      off(GATE_W, 0.15, -0.05),
    ],
  },
  {
    name: "Karachi",
    pts: [
      [66.99, 24.86],
      [67.3, 22.2], // due south out of the harbour approaches
      [69.4, 17.8], // angling in toward the Indian coastal lane
      [71.8, 13.6],
      [74.2, 10],
      [76.6, 7],
      off(GATE_W, 0.05, 0.25),
    ],
  },
  {
    name: "Mumbai",
    pts: [
      [72.84, 18.95],
      [72.7, 16.6], // the Malabar coastal lane — parallel to shore, not diagonal
      [73.9, 13.6], // off Goa
      [75.1, 11], // off Mangalore
      [76.3, 8.8], // off Cochin
      [77.7, 6.6], // rounding the Cape Comorin offing
      off(GATE_W, 0.35, 0.35),
    ],
  },
  {
    name: "JNPT",
    pts: [
      [72.99, 18.85],
      [73.15, 16.2], // same coastal lane, one strand further offshore
      [74.35, 13.1],
      [75.55, 10.5],
      [76.75, 8.35],
      [78.1, 6.2],
      off(GATE_W, 0.45, 0.2),
    ],
  },
  {
    name: "Cochin",
    pts: [
      [76.26, 9.93],
      [76.65, 8.2], // short coastal leg south
      [77.7, 6.4], // around Cape Comorin
      off(GATE_W, 0.5, 0.45),
    ],
  },
  {
    name: "Tuticorin",
    pts: [
      [78.13, 8.8],
      [78.3, 6.9], // south down the Gulf of Mannar
      [78.95, 5.4], // clear of the island's NW coast, bending SE
      off(GATE_W, 0.6, 0.15),
    ],
  },
];

// ---- EAST GROUP — Bay of Bengal / Malacca --------------------------------
// The S-manoeuvre: south down the Bay (staying east of the enlarged
// island, whose east coast reaches lon ~84.4), turn west through the
// southern gates below Dondra Head, then climb north into Colombo.
const EAST_ROUTES = [
  {
    name: "Chennai",
    pts: [
      [80.27, 13.08],
      [82.6, 11.4], // standing out east, clear of the island's NE
      [85.4, 8.3],
      [86, 4.8], // due south in open water
      off(GATE_S1, 0.1, 0.25),
      off(GATE_S2, 0, 0.2),
      off(GATE_S3, 0.15, 0.1),
      off(GATE_S4, 0.12, 0),
    ],
  },
  {
    name: "Vishakhapatnam",
    pts: [
      [83.3, 17.7],
      [84.6, 13],
      [86.3, 8], // long southbound leg down the middle of the Bay
      [86.1, 4.2],
      off(GATE_S1, 0.2, 0.1),
      off(GATE_S2, 0, 0.08),
      off(GATE_S3, 0.08, 0.05),
      off(GATE_S4, 0.06, 0),
    ],
  },
  {
    name: "Calcutta",
    pts: [
      [88.3, 22.57],
      [88.1, 17], // out of the Hooghly approaches, due south
      [87.4, 11],
      [86.6, 5.4],
      off(GATE_S1, 0.35, -0.05),
      off(GATE_S2, 0, -0.05),
      off(GATE_S3, 0.02, 0),
      GATE_S4,
    ],
  },
  {
    name: "Chittagong",
    pts: [
      [91.83, 22.34],
      [90.6, 16.5], // SW across the head of the Bay
      [88.8, 10],
      [87, 4.6],
      off(GATE_S1, 0.5, -0.15),
      off(GATE_S2, 0.05, -0.15),
      off(GATE_S3, -0.04, -0.05),
      off(GATE_S4, -0.05, -0.05),
    ],
  },
  {
    name: "Yangon",
    pts: [
      [96.15, 16.8],
      [94.3, 12.2], // down the Andaman Sea
      [90.8, 7], // passing north-west of the Nicobars
      [87.2, 3.6],
      off(GATE_S1, 0.4, -0.35),
      off(GATE_S2, 0.1, -0.28),
      off(GATE_S3, -0.1, -0.12),
      off(GATE_S4, -0.1, -0.1),
    ],
  },
  {
    name: "Singapore",
    pts: [
      [103.85, 1.29],
      [102.75, 1.7], // NW up the strait, mid-channel off Melaka
      [101.15, 2.55], // narrows off Port Klang / Rupat
      [99.9, 3.65], // channel widens — mid-strait, clear of both shores
      [98.4, 4.6], // off Belawan, ~0.6° NE of the Sumatra coast
      [96.6, 5.75], // off Lhokseumawe (coast reaches 5.35 here — stay north)
      [94.8, 6.2], // rounding Banda Aceh's tip (95.3, 5.6) with sea room
      [92.3, 6.0], // westbound across the Andaman Sea
      [87.5, 4.0],
      off(GATE_S1, 0.55, -0.5),
      off(GATE_S2, 0.15, -0.4),
      off(GATE_S3, -0.15, -0.2),
      off(GATE_S4, -0.15, -0.15),
    ],
  },
];

// Append the hub to every route: pts run origin → ... → Colombo.
const ROUTES = [...WEST_ROUTES, ...EAST_ROUTES].map((r) => ({
  ...r,
  pts: [...r.pts, COL],
}));

// East-West mainline (Suez Canal — Strait of Malacca) — passes close by
// Colombo without every ship actually calling; drawn as a distinct trunk
// line. Reworked as a full real-world course: down the Red Sea axis,
// through Bab el-Mandeb to Aden, south of Socotra, then one long shallow
// diagonal across the Arabian Sea to the Dondra Head offing. It crosses
// south of the island at lat ~1.1 — just OUTSIDE the feeder gate braid
// (1.35–2.25), since through-traffic sails wider than vessels calling at
// the port. From there it climbs NE across the Bay to the GREAT CHANNEL
// (the gap between Great Nicobar at 6.75N and Aceh at 5.6N — the actual
// mainline entrance to the Malacca Strait), runs the same offshore strait
// lane as the Singapore feeder, then up the South China Sea offshore of
// the Vietnamese coast to Hong Kong.
// NOTE: no transformSL here. Applying the island-enlarge transform to a
// waypoint far from the island's center flings it wildly (the old
// transformSL([83, 2.2]) landed at ~[86.6, -4.8] — the deep sag bug).
// Island clearance is instead built into the plain coordinates: the
// enlarged coast bottoms out at [81.8, 2.6], and the trunk holds 1.1–1.2
// beneath it.
const JEDDAH = [39.19, 21.54];
const ADEN = [45.03, 12.78];
const HONG_KONG = [114.17, 22.28];
const TRUNK = {
  points: [
    JEDDAH,
    [40.6, 18.4], // down the Red Sea axis
    [42.6, 14.7],
    [43.35, 12.65], // Bab el-Mandeb strait
    ADEN,
    [49.5, 12.4], // east along the Gulf of Aden
    [54.2, 11.6], // passing south of Socotra (53.8, 12.5)
    [61, 9.2], // the long shallow diagonal across the Arabian Sea
    [68, 6.3],
    [74, 3.9],
    [78.5, 2.2],
    [81.5, 1.1], // Dondra Head offing — just south of the feeder braid
    [85, 1.2],
    [88.8, 3.4], // climbing NE across the Bay of Bengal
    [92.2, 5.4],
    [94.7, 6.05], // Great Channel — between Great Nicobar and Aceh
    [96.9, 5.55], // into the strait on the offshore Sumatra lane
    [98.9, 4.15],
    [100.6, 2.95], // Strait narrows, near Port Klang
    [102.2, 1.85], // off Melaka
    [103.85, 1.29], // Singapore
    [105.2, 2.6], // out into the South China Sea
    [108.0, 8.0],
    [110.8, 13.0], // offshore of the Vietnamese coast (109.3 at this lat)
    [112.3, 18.0],
    HONG_KONG,
  ],
  name: "East–West Mainline (Suez ⇄ Malacca)",
};

// Trunk waypoints that aren't feeder origins but deserve a hover label.
const TRUNK_ONLY_PORTS = [
  { coord: JEDDAH, name: "Jeddah" },
  { coord: ADEN, name: "Aden" },
  { coord: HONG_KONG, name: "Hong Kong" },
];

const HUB_PORTS = [{ coord: COL, name: "Port of Colombo" }];

const PORT_MARKERS = [
  ...ROUTES.map((r) => ({ coord: r.pts[0], name: r.name, hub: false })),
  ...TRUNK_ONLY_PORTS.map((p) => ({ ...p, hub: false })),
  ...HUB_PORTS.map((h) => ({ ...h, hub: true })),
];

let geoCache = null;
let geoPromise = null;

function loadGeo() {
  if (geoCache) return Promise.resolve(geoCache);
  if (geoPromise) return geoPromise;
  geoPromise = Promise.all([
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json").then((r) => r.json()),
    import("topojson-client"),
  ]).then(([topo, tj]) => {
    const fc = tj.feature(topo, topo.objects.countries);
    const inBox = (ring) =>
      ring.some(([lon, lat]) => lon >= 30 && lon <= 118 && lat >= -12 && lat <= 32);
    const countries = [];
    let sl = null;
    fc.features.forEach((f) => {
      const name = (f.properties && f.properties.name) || "";
      const polys =
        f.geometry.type === "Polygon"
          ? [f.geometry.coordinates]
          : f.geometry.type === "MultiPolygon"
          ? f.geometry.coordinates
          : [];
      const rings = [];
      polys.forEach((poly) => poly.forEach((ring) => { if (inBox(ring)) rings.push(ring); }));
      if (!rings.length) return;
      if (name === "Sri Lanka") sl = rings;
      else countries.push({ name, rings });
    });
    // Enlarge Sri Lanka and shift it SE — same transformSL used for every
    // island-relative waypoint above, so they can never drift out of sync.
    sl = (sl || []).map((ring) => ring.map(transformSL));
    geoCache = { countries, sl };
    return geoCache;
  });
  return geoPromise;
}

// Sentinel key for the trunk mainline in the hover-panel state, distinct from
// any feeder route/port name.
const MAINLINE_KEY = "__mainline__";

// Everything orange (feeder routes, Sri Lanka's outline, the Colombo glow,
// hub markers, the tooltip's accent border) is brand color and stays
// identical in both themes — only the neutral white/dark map chrome flips.
// Values mirror the site's existing --surface/--ink/--line CSS vars so the
// canvas stays in sync with the rest of the light/dark system.
const DARK_PALETTE = {
  fadeRGB: "15,17,21", // matches --surface (dark)
  landFill: "rgba(255,255,255,0.045)",
  landStroke: "rgba(163,170,182,0.30)",
  trunkDefault: "rgba(255,255,255,0.6)",
  trunkHover: "rgba(255,255,255,0.95)",
  trunkGlow: "rgba(255,255,255,0.7)",
  portFill: "rgba(203,208,217,0.55)",
  hubHoverStroke: "rgba(255,255,255,0.9)",
  tooltipBg: "rgba(17,20,26,0.92)",
  tooltipText: "#FFFFFF",
  countryHoverStroke: "rgba(255,255,255,0.85)",
  countryHoverGlow: "rgba(255,255,255,0.6)",
  colomboLabel: "rgba(255,220,200,0.7)",
};
const LIGHT_PALETTE = {
  fadeRGB: "255,255,255", // matches --surface (light)
  landFill: "rgba(26,26,26,0.05)",
  landStroke: "rgba(100,106,120,0.35)",
  trunkDefault: "rgba(26,26,26,0.55)",
  trunkHover: "rgba(17,17,17,0.92)",
  trunkGlow: "rgba(0,0,0,0.35)",
  portFill: "rgba(74,74,104,0.6)",
  hubHoverStroke: "rgba(17,17,17,0.85)",
  tooltipBg: "rgba(255,255,255,0.95)",
  tooltipText: "#141414",
  countryHoverStroke: "rgba(17,17,17,0.85)",
  countryHoverGlow: "rgba(0,0,0,0.3)",
  colomboLabel: "rgba(26,26,26,0.75)",
};

export default function HeroMap({ className = "", motion = true }) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const active = motion && !prefersReducedMotion;
  const [activeRoute, setActiveRoute] = useState(null); // route name, drives the left-side info panel

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, disposed = false;
    let geo = geoCache, geoPaths = null, mouse = null;
    let routePix = null, trunkPix = null; // pixel-space caches, rebuilt on resize
    let countryHitPaths = null; // per-country Path2Ds for hover hit-testing/highlight
    let lastActiveRoute = null; // avoids calling setState every animation frame

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      geoPaths = null;
      routePix = null;
      trunkPix = null;
      countryHitPaths = null;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    loadGeo().then((g) => { if (!disposed) geo = g; });

    // Wider scale (degrees-per-screen-width) so the full Gulf-to-Hong Kong
    // port network fits on screen.
    const px = (lon) => w * 0.62 + (lon - 80.75) * (w / 95);
    const py = (lat) => h * 0.56 + (7.6 - lat) * (w / 95);

    const project = (pts) => pts.map(([lon, lat]) => [px(lon), py(lat)]);
    const getRoutePix = () => routePix || (routePix = ROUTES.map((r) => project(r.pts)));
    const getTrunkPix = () => trunkPix || (trunkPix = project(TRUNK.points));

    // One smooth spline through a waypoint list: quadratic segments using
    // each waypoint as a control point and segment midpoints as knots.
    // This is what turns the raw navigational fixes into a continuous
    // multi-bend course with no kinks — used for trunk AND every feeder.
    const strokeSmooth = (pts) => {
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i][0] + pts[i + 1][0]) / 2;
        const my = (pts[i][1] + pts[i + 1][1]) / 2;
        ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
      }
      const last = pts[pts.length - 1];
      ctx.lineTo(last[0], last[1]);
    };

    // Sample the same course for hover hit-testing (segment-walk is a
    // close enough approximation of the smoothed curve at 14px tolerance).
    const polyPointAt = (pts, t) => {
      const segs = pts.length - 1;
      const segT = t * segs;
      const i = Math.min(Math.floor(segT), segs - 1);
      const localT = segT - i;
      const a = pts[i], b = pts[i + 1];
      return [a[0] + (b[0] - a[0]) * localT, a[1] + (b[1] - a[1]) * localT];
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse = null; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const start = performance.now();

    const draw = (now) => {
      if (disposed) return;
      const time = (now - start) / 1000;
      const pulse = active ? 0.5 + 0.5 * Math.sin(time * 1.6) : 0.7;
      // read live off the <html> class next-themes toggles, so this is
      // always correct instantly with no extra state/effect wiring
      const pal = document.documentElement.classList.contains("dark") ? DARK_PALETTE : LIGHT_PALETTE;
      ctx.clearRect(0, 0, w, h);

      // country outlines — real geography, thin gray lines
      let slPath = null;
      if (geo) {
        if (!geoPaths) {
          const land = new Path2D();
          const slp = new Path2D();
          const addRings = (rings, path) => {
            rings.forEach((ring) => {
              ring.forEach(([lon, lat], i) => {
                const x = px(lon), y = py(lat);
                i === 0 ? path.moveTo(x, y) : path.lineTo(x, y);
              });
              path.closePath();
            });
          };
          geo.countries.forEach((c) => addRings(c.rings, land));
          addRings(geo.sl, slp);
          geoPaths = { land, slp };

          // one Path2D per country (plus Sri Lanka) for hover hit-testing and
          // for stroking just that country's border on hover. A pixel bbox
          // per country lets the hover test skip isPointInPath (expensive on
          // ~180 shapes, every animation frame) for anything clearly outside it.
          const bboxOf = (rings) => {
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            rings.forEach((ring) => ring.forEach(([lon, lat]) => {
              const x = px(lon), y = py(lat);
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }));
            return { minX, minY, maxX, maxY };
          };
          countryHitPaths = geo.countries.map((c) => {
            const path = new Path2D();
            addRings(c.rings, path);
            return { name: c.name, path, bbox: bboxOf(c.rings) };
          });
          countryHitPaths.push({ name: "Sri Lanka", path: slp, bbox: bboxOf(geo.sl) });
        }
        ctx.fillStyle = pal.landFill;
        ctx.fill(geoPaths.land);
        ctx.strokeStyle = pal.landStroke;
        ctx.lineWidth = 1;
        ctx.stroke(geoPaths.land);
        slPath = geoPaths.slp;
      }

      // Sri Lanka — outline only (no solid fill) so routes stay visible
      if (slPath) {
        ctx.fillStyle = "rgba(236,74,10,0.08)";
        ctx.fill(slPath);
        ctx.strokeStyle = `rgba(255,138,61,${0.6 + pulse * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke(slPath);
      }

      const rPix = getRoutePix();
      const tPix = getTrunkPix();

      // hover detection — port markers first, then feeder routes, then trunk
      let hover = null;
      if (mouse) {
        let bestPortD = 13;
        let bestPort = null;
        PORT_MARKERS.forEach((pm) => {
          const x = px(pm.coord[0]), y = py(pm.coord[1]);
          const d = Math.hypot(x - mouse.x, y - mouse.y);
          if (d < bestPortD) { bestPortD = d; bestPort = pm; }
        });
        if (bestPort) {
          hover = { type: "port", name: bestPort.name };
        } else {
          let best = 14, bestRi = -1;
          rPix.forEach((pts, ri) => {
            const samples = pts.length * 8; // denser paths need denser sampling
            for (let i = 0; i <= samples; i++) {
              const [x, y] = polyPointAt(pts, i / samples);
              const d = Math.hypot(x - mouse.x, y - mouse.y);
              if (d < best) { best = d; bestRi = ri; }
            }
          });
          if (bestRi >= 0) {
            hover = { type: "route", index: bestRi };
          } else {
            let bestT = 14;
            for (let i = 0; i <= 80; i++) {
              const [x, y] = polyPointAt(tPix, i / 80);
              const d = Math.hypot(x - mouse.x, y - mouse.y);
              if (d < bestT) bestT = d;
            }
            if (bestT < 14) hover = { type: "trunk" };
            else if (countryHitPaths) {
              const hit = countryHitPaths.find(
                (c) =>
                  mouse.x >= c.bbox.minX &&
                  mouse.x <= c.bbox.maxX &&
                  mouse.y >= c.bbox.minY &&
                  mouse.y <= c.bbox.maxY &&
                  ctx.isPointInPath(c.path, mouse.x, mouse.y)
              );
              if (hit) hover = { type: "country", name: hit.name };
            }
          }
        }
      }
      // sync the React-rendered info panel only when the hovered route actually
      // changes, so this doesn't trigger a re-render every animation frame
      const hoveredRouteName =
        hover && hover.type === "route"
          ? ROUTES[hover.index].name
          : hover && hover.type === "trunk"
          ? MAINLINE_KEY
          : null;
      if (hoveredRouteName !== lastActiveRoute) {
        lastActiveRoute = hoveredRouteName;
        setActiveRoute(hoveredRouteName);
      }

      const isPortHover = (name) => hover && hover.type === "port" && hover.name === name;
      const isTrunkHover = () => hover && hover.type === "trunk";
      const routeHighlighted = (r, ri) =>
        (hover && hover.type === "route" && hover.index === ri) ||
        isPortHover(r.name) ||
        isPortHover("Port of Colombo");

      // country hover — highlight just that border. Sri Lanka already has its
      // own permanent pulsing highlight, so skip re-stroking it here.
      if (hover && hover.type === "country" && hover.name !== "Sri Lanka" && countryHitPaths) {
        const entry = countryHitPaths.find((c) => c.name === hover.name);
        if (entry) {
          ctx.strokeStyle = pal.countryHoverStroke;
          ctx.lineWidth = 1.8;
          ctx.shadowColor = pal.countryHoverGlow;
          ctx.shadowBlur = 6;
          ctx.stroke(entry.path);
          ctx.shadowBlur = 0;
        }
      }

      // trunk mainline — distinct pale/white styling from the orange feeders,
      // and always bolder/heavier than them since it's the primary corridor
      const trunkHover =
        isTrunkHover() ||
        isPortHover("Port of Colombo") ||
        isPortHover("Jeddah") ||
        isPortHover("Aden") ||
        isPortHover("Hong Kong");
      ctx.beginPath();
      strokeSmooth(tPix);
      ctx.setLineDash(trunkHover ? [9, 5] : [7, 6]);
      ctx.shadowColor = pal.trunkGlow;
      ctx.shadowBlur = trunkHover ? 12 : 5;
      ctx.strokeStyle = trunkHover ? pal.trunkHover : pal.trunkDefault;
      ctx.lineWidth = trunkHover ? 3.2 : 2.2;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.setLineDash([]);

      // feeder spokes — all converge on Colombo through the gates
      ROUTES.forEach((r, ri) => {
        const isHover = routeHighlighted(r, ri);
        ctx.beginPath();
        strokeSmooth(rPix[ri]);
        if (isHover) { ctx.shadowColor = "rgba(255,107,53,0.9)"; ctx.shadowBlur = 10; }
        ctx.strokeStyle = isHover ? "#FF6B35" : "rgba(255,107,53,0.3)";
        ctx.lineWidth = isHover ? 2 : 1.1;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Colombo hub — small pulsing halo around the port itself
      const hubX = px(COL[0]), hubY = py(COL[1]);
      const hubGlowR = 20 + pulse * 9;
      const hubGlow = ctx.createRadialGradient(hubX, hubY, 0, hubX, hubY, hubGlowR);
      hubGlow.addColorStop(0, `rgba(236,74,10,${0.5 + pulse * 0.3})`);
      hubGlow.addColorStop(1, "rgba(236,74,10,0)");
      ctx.fillStyle = hubGlow;
      ctx.beginPath();
      ctx.arc(hubX, hubY, hubGlowR, 0, Math.PI * 2);
      ctx.fill();

      // port markers
      PORT_MARKERS.forEach((pm) => {
        const x = px(pm.coord[0]), y = py(pm.coord[1]);
        const isHover = isPortHover(pm.name);
        const r = pm.hub ? (isHover ? 6 : 4.5) : isHover ? 4 : 2.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = isHover ? "#FF6B35" : pm.hub ? "rgba(255,180,140,0.75)" : pal.portFill;
        ctx.fill();
        if (pm.hub) {
          ctx.lineWidth = 1;
          ctx.strokeStyle = isHover ? pal.hubHoverStroke : "rgba(255,180,140,0.4)";
          ctx.stroke();
        }
      });

      // tooltip — follows the cursor
      if (hover && mouse) {
        const label =
          hover.type === "port" || hover.type === "country"
            ? hover.name.toUpperCase()
            : hover.type === "trunk"
            ? TRUNK.name.toUpperCase()
            : ROUTES[hover.index].name.toUpperCase() + " — COLOMBO";
        ctx.font = "600 11px Poppins, sans-serif";
        const tw = ctx.measureText(label).width;
        let tx = mouse.x + 16, ty = mouse.y - 14;
        if (tx + tw + 22 > w) tx = mouse.x - tw - 34;
        if (ty < 12) ty = mouse.y + 26;
        ctx.fillStyle = pal.tooltipBg;
        ctx.strokeStyle = "rgba(255,107,53,0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(tx - 10, ty - 15, tw + 20, 24, 12);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = pal.tooltipText;
        ctx.fillText(label, tx, ty + 1);
      }

      // labels — hub port
      ctx.font = "600 10px Poppins, sans-serif";
      ctx.fillStyle = pal.colomboLabel;
      ctx.fillText("COLOMBO", px(COL[0]) + 8, py(COL[1]) + 3);

      // fade map behind the hero text (left side)
      const fade = ctx.createLinearGradient(0, 0, w * 0.62, 0);
      fade.addColorStop(0, `rgba(${pal.fadeRGB},0.92)`);
      fade.addColorStop(0.65, `rgba(${pal.fadeRGB},0.55)`);
      fade.addColorStop(1, `rgba(${pal.fadeRGB},0)`);
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w * 0.62, h);

      canvas.style.cursor = hover ? "pointer" : "default";

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [active]);

  // Retain the last non-null route info while fading out, so the panel
  // cross-fades its own content instead of going blank mid-transition.
  const [panelData, setPanelData] = useState(null);
  useEffect(() => {
    if (activeRoute === MAINLINE_KEY) {
      setPanelData(MAINLINE_ROUTE);
    } else if (activeRoute && SHIP_ROUTES[activeRoute]) {
      setPanelData({ name: activeRoute, ...SHIP_ROUTES[activeRoute] });
    }
  }, [activeRoute]);
  const panelVisible = Boolean(
    activeRoute && (activeRoute === MAINLINE_KEY || SHIP_ROUTES[activeRoute])
  );

  return (
    <>
      <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} />
      {/* Right side of the map is open ocean with no hero copy behind it, so
          the panel lives there — three stacked, thin-bordered readouts that
          slide/fade in from the right. No card fill, no shadow, no popup. */}
      <div
        aria-hidden={!panelVisible}
        className={`pointer-events-none absolute right-6 top-6 z-10 w-[320px] transition-all duration-500 ease-out sm:right-10 sm:top-8 md:right-14 ${
          panelVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
        }`}
      >
        {panelData && (
          <div className="flex flex-col gap-2.5">
            <div className="border border-line px-4 py-2.5">
              <p className="font-poppins text-sm font-bold tracking-[0.2em] text-brand-orange-light">
                {panelData.name.toUpperCase()}
                {panelData.country ? ` · ${panelData.country.toUpperCase()}` : ""}
              </p>
            </div>
            <div className="border border-line px-4 py-2.5">
              <div className="flex items-baseline gap-2">
                <span className="font-orbitron text-3xl font-semibold leading-none text-ink">
                  {panelData.distanceKm.toLocaleString()}
                </span>
                <span className="font-orbitron text-sm font-medium tracking-wider text-ink-secondary">
                  KM
                </span>
              </div>
              <p className="mt-1.5 font-orbitron text-sm tracking-wider text-ink-secondary">
                {panelData.distanceNm.toLocaleString()} NM
              </p>
            </div>
            <div className="border border-line px-4 py-3">
              <p className="font-inter text-[15px] leading-[1.6] text-ink">
                {panelData.blurb}
              </p>
              {panelData.ports ? (
                <p className="mt-3 font-inter text-sm leading-[1.6] text-ink">
                  <span className="text-ink-secondary">Route — </span>
                  {panelData.ports.join(" → ")}
                </p>
              ) : (
                <>
                  <p className="mt-3 font-inter text-sm leading-[1.6] text-ink">
                    <span className="text-ink-secondary">Cargo — </span>
                    {panelData.cargo.join(", ")}
                  </p>
                  <p className="mt-2 font-inter text-sm leading-[1.6] text-ink">
                    <span className="text-ink-secondary">Carriers — </span>
                    {panelData.companies.join(", ")}
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}