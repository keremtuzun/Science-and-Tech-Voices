/**
 * Brand design tokens for Science & Tech Voices.
 * Mirrors the values in the site's styles.css so video assets stay on-brand.
 */
export const theme = {
  colors: {
    paper: "#f6f4ee", // warm off-white page
    paperSoft: "#efece2", // recessed sections
    card: "#fbfaf5", // card surface
    line: "#ddd8c9", // hairline borders
    lineStrong: "#c8c2b1",

    ink: "#1b1b18", // primary text
    muted: "#57544c", // secondary text
    faint: "#8b8779", // meta / captions

    accent: "#2f5d4f", // forest green
    accentDeep: "#244a3f", // hover / pressed
    accentWash: "#e7ece6", // faint green tint
  },
  fonts: {
    // Loaded via @remotion/google-fonts in fonts.ts
    head: '"Spectral", Georgia, "Times New Roman", serif',
    body: '"Inter", "Segoe UI", system-ui, sans-serif',
  },
  brand: {
    name: "Science & Tech Voices",
    domain: "scitechvoices.com",
    handle: "@scitechvoices",
    author: "Kerem Tüzün",
    tagline: "Exploring the frontiers of science & technology",
    motto: "Science is a conversation. Join it.",
  },
} as const;

export type Theme = typeof theme;
