/**
 * Load the brand's Google Fonts (Spectral for headlines, Inter for body)
 * so they are available inside Remotion compositions and renders.
 */
import { loadFont as loadSpectral } from "@remotion/google-fonts/Spectral";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

export const spectral = loadSpectral("normal", {
  weights: ["400", "500", "600", "700"],
});

export const inter = loadInter("normal", {
  weights: ["400", "500", "600"],
});
