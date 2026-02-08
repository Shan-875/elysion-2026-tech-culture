/**
 * Program images sourced from IEEE SB CE Munnar (ieeesbcemunnar.org).
 * Used for activities, workshops, and gallery to reflect the same event legacy.
 */
const BASE = "https://ieeesbcemunnar.org";

function url(path: string) {
  return `${BASE}/${path}`;
}

export const programImages = {
  base: BASE,

  /** Activity / program section */
  activities: {
    trekking: url("stock.jpg"),
    campfire: url("campfire.jpg"),
    skyLantern: url("14.jpg"),
    culturalNight: url("15.jpg"),
  },

  /** Workshops */
  workshops: {
    photography: url("photography.jpg"),
    arVr: url("vr.jpg"),
  },

  /** Gallery / glimpses */
  gallery: [
    url("14.jpg"),
    url("15.jpg"),
    url("stock.jpg"),
    url("campfire.jpg"),
    url("photography.jpg"),
    url("vr.jpg"),
  ],

  /** Other assets from source (logos, branding) */
  other: {
    evensiaLogo: url("EVENSIA.png"),
    evensia2: url("EVENSIA2.png"),
    version50: url("5.0.png"),
    logoWhite: url("logo-white.png"),
    e3: url("e3.png"),
  },
} as const;
