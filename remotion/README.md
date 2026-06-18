# Science & Tech Voices — Remotion Studio

Branded promotional **reels** and **posts** for [scitechvoices.com](https://scitechvoices.com),
built with [Remotion](https://www.remotion.dev/). Every asset uses the site's
own colours (forest green `#2f5d4f` on warm paper `#f6f4ee`) and fonts
(Spectral + Inter), so video output matches the website.

## Getting started

```bash
cd remotion
npm install        # already run once during setup
npm run studio     # open the visual editor at http://localhost:3000
```

In the Studio you can tweak any text live in the right-hand props panel
(titles, excerpts, stats…) without touching code.

## Compositions

| ID            | Format        | Use                                              |
| ------------- | ------------- | ------------------------------------------------ |
| `BrandPromo`  | Reel 1080×1920 | Org intro + motto "Science is a conversation."   |
| `ArticleReel` | Reel 1080×1920 | News carousel of the latest articles             |
| `CoursesReel` | Reel 1080×1920 | Promotes the hands-on courses                     |
| `ArticlePost` | Post 1080×1080 | Single-article announcement (square)             |
| `CoursePost`  | Post 1080×1080 | Single-course announcement (square)              |

## Rendering

```bash
# one asset
npx remotion render BrandPromo out/BrandPromo.mp4

# a square post as an image
npx remotion still ArticlePost out/ArticlePost.png --frame=70

# everything at once → ./out
npm run render:all
```

### Restricted / sandboxed machines

On a normal machine Remotion downloads its own headless Chromium the first
time you render — nothing extra is needed. If you're behind a corporate
proxy or in a locked-down environment, you can reuse an existing Chromium
and bypass the proxy's self-signed cert:

```bash
export REMOTION_BROWSER_EXECUTABLE=/path/to/chrome-headless-shell
export REMOTION_IGNORE_CERT=1
npm run render:all
```

(For a single command, pass `--browser-executable=...` and
`--ignore-certificate-errors` directly.)

## Editing content

All article/course copy and the headline stats live in
[`src/data/content.ts`](src/data/content.ts). Add a new entry there and it
flows into the reels automatically. Brand tokens (colours, fonts, motto,
handle) live in [`src/theme.ts`](src/theme.ts).

To make a one-off post, open `ArticlePost`/`CoursePost` in the Studio and
override `eyebrow`, `tag`, `title`, `body`, and `footnote` in the props panel.
