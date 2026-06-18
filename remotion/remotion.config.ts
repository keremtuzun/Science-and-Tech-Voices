import { Config } from "@remotion/cli/config";

// Render settings for Science & Tech Voices promo assets.
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(1);

// Higher quality stills for square "post" exports.
Config.setJpegQuality(95);
