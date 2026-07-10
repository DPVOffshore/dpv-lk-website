// Reference data for the hero map's feeder-route hover panel.
// Distances are sea-route approximations to the Port of Colombo (nm ≈ km / 1.852);
// cargo mix and carriers reflect real, publicly reported trade patterns on each
// lane but are not schedule-verified vessel-by-vessel — informational, not for
// navigation.
export const SHIP_ROUTES = {
  Mombasa: {
    country: "Kenya",
    distanceNm: 2742,
    distanceKm: 5079,
    cargo: ["Tea", "Coffee", "Containers & general cargo"],
    companies: ["Maersk", "MSC", "CMA CGM", "PIL"],
    blurb: "Links Sri Lanka's tea trade with Kenya's auctions and East Africa's transshipment gateway.",
  },
  Mogadishu: {
    country: "Somalia",
    distanceNm: 2210,
    distanceKm: 4093,
    cargo: ["General cargo & containers", "Rice", "Sugar"],
    companies: ["MSC", "CMA CGM", "Maersk"],
    blurb: "Emerging Horn of Africa link serving Somalia's import-driven economy via Colombo.",
  },
  Dubai: {
    country: "UAE",
    distanceNm: 1918,
    distanceKm: 3552,
    cargo: ["Containers & general cargo", "Electronics", "Foodstuffs"],
    companies: ["Maersk", "MSC", "CMA CGM", "Emirates Shipping Line"],
    blurb: "Major Gulf hub lane connecting Colombo to the Middle East's largest re-export centre.",
  },
  "Khor Fakkan": {
    country: "UAE",
    distanceNm: 1700,
    distanceKm: 3148,
    cargo: ["Transshipment containers", "General cargo"],
    companies: ["CMA CGM", "MSC", "COSCO", "X-Press Feeders"],
    blurb: "Gulf gateway outside the Strait of Hormuz, favoured to skip Hormuz transit delays.",
  },
  Fujairah: {
    country: "UAE",
    distanceNm: 1670,
    distanceKm: 3093,
    cargo: ["Bunker fuel & petroleum", "Containers", "General cargo"],
    companies: ["Emirates Shipping Line", "MSC", "Unifeeder", "Simatech"],
    blurb: "Key bunkering and container port on the Gulf of Oman, bypassing Hormuz congestion.",
  },
  Karachi: {
    country: "Pakistan",
    distanceNm: 1531,
    distanceKm: 2835,
    cargo: ["Textiles & garments", "Containers", "Cotton & chemicals"],
    companies: ["MSC", "COSCO", "RCL", "ONE"],
    blurb: "Vital Pakistan gateway using Colombo transshipment for global connectivity.",
  },
  Mumbai: {
    country: "India",
    distanceNm: 897,
    distanceKm: 1661,
    cargo: ["Textiles", "Containers & general cargo", "Machinery"],
    companies: ["Maersk", "MSC", "X-Press Feeders", "CMA CGM"],
    blurb: "Gateway to India's west-coast commercial capital — a top-volume Colombo feeder lane.",
  },
  JNPT: {
    country: "India",
    distanceNm: 918,
    distanceKm: 1700,
    cargo: ["Containers", "Garments & textiles", "Engineering goods"],
    companies: ["Maersk", "MSC", "X-Press Feeders", "CMA CGM"],
    blurb: "India's largest container port, linked to Colombo by high-frequency feeder services.",
  },
  Cochin: {
    country: "India",
    distanceNm: 353,
    distanceKm: 654,
    cargo: ["Spices — pepper & cardamom", "Frozen seafood", "Coir products"],
    companies: ["X-Press Feeders", "Bengal Tiger Line", "Transworld Group"],
    blurb: "Historic spice-trade port on a weekly Cochin–Tuticorin 'butterfly' feeder run.",
  },
  Tuticorin: {
    country: "India",
    distanceNm: 152,
    distanceKm: 282,
    cargo: ["Containers", "Granite & stone", "Fruits & onions"],
    companies: ["Bengal Tiger Line", "X-Press Feeders", "Transworld Group"],
    blurb: "Tamil Nadu's container gateway, served by a dedicated Colombo shuttle feeder.",
  },
  Chennai: {
    country: "India",
    distanceNm: 401,
    distanceKm: 743,
    cargo: ["Automobiles & auto parts", "Containers", "Leather & textiles"],
    companies: ["Maersk", "MSC", "X-Press Feeders", "CMA CGM"],
    blurb: "South India's automotive export hub, feeding Colombo's global container network.",
  },
  Vishakhapatnam: {
    country: "India",
    distanceNm: 820,
    distanceKm: 1519,
    cargo: ["Iron ore & bauxite", "Coal", "Fertiliser & containers"],
    companies: ["Maersk", "X-Press Feeders", "MSC"],
    blurb: "East-coast India's major bulk and container port, serving the mineral-rich hinterland.",
  },
  Calcutta: {
    country: "India",
    distanceNm: 1292,
    distanceKm: 2394,
    cargo: ["Jute & tea", "Containers", "Iron & steel products"],
    companies: ["MSC", "X-Press Feeders", "Gold Star Line", "Maersk"],
    blurb: "Eastern India's historic river port, relying on Colombo transshipment for global reach.",
  },
  Chittagong: {
    country: "Bangladesh",
    distanceNm: 1516,
    distanceKm: 2808,
    cargo: ["Ready-made garments", "Textiles", "Jute goods"],
    companies: ["Maersk", "CMA CGM", "X-Press Feeders", "HR Lines"],
    blurb: "Bangladesh's garment export lifeline, heavily dependent on Colombo transshipment.",
  },
  Yangon: {
    country: "Myanmar",
    distanceNm: 1549,
    distanceKm: 2870,
    cargo: ["Rice", "Garments", "Timber & teak"],
    companies: ["Continental Shipping Lines", "Emirates Shipping Line", "Maersk"],
    blurb: "Myanmar's principal gateway, connected to Colombo by dedicated feeder services.",
  },
  Singapore: {
    country: "Singapore",
    distanceNm: 1670,
    distanceKm: 3093,
    cargo: ["Transshipment containers", "Petroleum products", "Electronics"],
    companies: ["Maersk", "MSC", "CMA CGM", "PIL", "COSCO", "ONE"],
    blurb: "World's premier transshipment hub — the eastern anchor of Colombo's mainline network.",
  },
};

// The Suez–Malacca East–West trunk lane itself (not a feeder route to
// Colombo — the mainline passes just south of the island). Distance is the
// full Jeddah–Hong Kong sea route via Bab-el-Mandeb and the Malacca Strait;
// ports listed are the major waypoints/calls along that corridor.
export const MAINLINE_ROUTE = {
  name: "East–West Mainline",
  country: "Suez ⇄ Malacca",
  distanceNm: 6100,
  distanceKm: 11298,
  ports: ["Jeddah", "Aden", "Colombo (offing)", "Singapore", "Hong Kong"],
  blurb: "The Suez–Malacca trunk lane Colombo sits just off — the world's busiest East–West container corridor.",
};
