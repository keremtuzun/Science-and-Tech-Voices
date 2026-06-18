// Renders every promo asset into ./out in one go.
// Reels export as MP4 (9:16), square posts as PNG stills (1:1).
import { execSync } from "node:child_process";

const reels = ["BrandPromo", "ArticleReel", "CoursesReel"];
const posts = ["AboutPost", "ArticlePost", "CoursePost", "RecruitPost"];

// Optional overrides for sandboxed / restricted-network machines:
//   REMOTION_BROWSER_EXECUTABLE=/path/to/headless_shell  (reuse a local Chromium)
//   REMOTION_IGNORE_CERT=1                                (TLS-intercepting proxy)
const extra = [
  process.env.REMOTION_BROWSER_EXECUTABLE
    ? `--browser-executable="${process.env.REMOTION_BROWSER_EXECUTABLE}"`
    : "",
  process.env.REMOTION_IGNORE_CERT ? "--ignore-certificate-errors" : "",
]
  .filter(Boolean)
  .join(" ");

const run = (cmd) => {
  const full = `${cmd} ${extra}`.trim();
  console.log(`\n▶ ${full}`);
  execSync(full, { stdio: "inherit" });
};

for (const id of reels) {
  run(`npx remotion render ${id} out/${id}.mp4`);
}

for (const id of posts) {
  // Render a representative frame as a still image for image posts.
  run(`npx remotion still ${id} out/${id}.png --frame=70`);
}

console.log("\n✓ All assets rendered to ./out");
