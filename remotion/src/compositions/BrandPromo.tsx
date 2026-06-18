import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { theme } from "../theme";
import { Background } from "../components/Background";
import { Brandmark, Logo } from "../components/Brandmark";
import { Eyebrow, Rise, SiteFooter } from "../components/Primitives";
import { stats as defaultStats } from "../data/content";

export const brandPromoSchema = z.object({
  tagline: z.string(),
  motto: z.string(),
  cta: z.string(),
  stats: z.array(z.object({ value: z.string(), label: z.string() })),
});

export type BrandPromoProps = z.infer<typeof brandPromoSchema>;

export const brandPromoDefaults: BrandPromoProps = {
  tagline: theme.brand.tagline,
  motto: theme.brand.motto,
  cta: "Read • Watch • Learn",
  stats: [...defaultStats],
};

const Scene: React.FC<{
  from: number;
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ from, durationInFrames, children }) => {
  // Cross-fade each scene at its edges for a smooth reel.
  return (
    <Sequence from={from} durationInFrames={durationInFrames} layout="none">
      <FadeWrap durationInFrames={durationInFrames}>{children}</FadeWrap>
    </Sequence>
  );
};

const FadeWrap: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 12, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill
      style={{
        opacity,
        alignItems: "center",
        justifyContent: "center",
        padding: 110,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const BrandPromo: React.FC<BrandPromoProps> = ({
  tagline,
  motto,
  cta,
  stats,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <Background>
      {/* Scene 1 — wordmark + tagline */}
      <Scene from={0} durationInFrames={95}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Logo size={170} />
          </div>
          <Rise delay={10} style={{ marginTop: 50 }}>
            <div
              style={{
                fontFamily: theme.fonts.head,
                fontWeight: 600,
                fontSize: 88,
                lineHeight: 1.08,
                color: theme.colors.ink,
              }}
            >
              Science &amp; Tech{" "}
              <span style={{ color: theme.colors.accent }}>Voices</span>
            </div>
          </Rise>
          <Rise delay={22} style={{ marginTop: 34 }}>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 40,
                color: theme.colors.muted,
                lineHeight: 1.45,
                maxWidth: 780,
                margin: "0 auto",
              }}
            >
              {tagline}
            </div>
          </Rise>
        </div>
      </Scene>

      {/* Scene 2 — the motto */}
      <Scene from={95} durationInFrames={95}>
        <div style={{ textAlign: "center" }}>
          <Rise delay={6}>
            <Eyebrow>Our Motto</Eyebrow>
          </Rise>
          <Rise delay={16} style={{ marginTop: 40 }}>
            <div
              style={{
                fontFamily: theme.fonts.head,
                fontWeight: 600,
                fontSize: 104,
                lineHeight: 1.1,
                color: theme.colors.ink,
                maxWidth: 880,
              }}
            >
              {motto.split(". ").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 ? "." : ""}
                  <br />
                </span>
              ))}
            </div>
          </Rise>
          <Rise delay={34} style={{ marginTop: 46 }}>
            <div
              style={{
                width: 120,
                height: 6,
                borderRadius: 3,
                background: theme.colors.accent,
                margin: "0 auto",
              }}
            />
          </Rise>
        </div>
      </Scene>

      {/* Scene 3 — stats */}
      <Scene from={190} durationInFrames={90}>
        <div style={{ textAlign: "center", width: "100%" }}>
          <Rise delay={6}>
            <Eyebrow>The Project So Far</Eyebrow>
          </Rise>
          <div
            style={{
              marginTop: 70,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 36,
            }}
          >
            {stats.map((s, i) => {
              const enter = spring({
                frame: frame - 190 - 14 - i * 8,
                fps,
                config: { damping: 200 },
              });
              return (
                <div
                  key={s.label}
                  style={{
                    opacity: enter,
                    transform: `scale(${interpolate(enter, [0, 1], [0.86, 1])})`,
                    background: theme.colors.card,
                    border: `1px solid ${theme.colors.line}`,
                    borderRadius: 18,
                    padding: "44px 24px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: theme.fonts.head,
                      fontWeight: 700,
                      fontSize: 110,
                      color: theme.colors.accent,
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      marginTop: 14,
                      fontFamily: theme.fonts.body,
                      fontSize: 34,
                      color: theme.colors.muted,
                      letterSpacing: 1,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Scene>

      {/* Scene 4 — CTA */}
      <Scene from={280} durationInFrames={100}>
        <div style={{ textAlign: "center" }}>
          <Rise delay={6} style={{ marginBottom: 56 }}>
            <Brandmark size={46} />
          </Rise>
          <Rise delay={18}>
            <div
              style={{
                fontFamily: theme.fonts.head,
                fontWeight: 600,
                fontSize: 70,
                color: theme.colors.ink,
              }}
            >
              {cta}
            </div>
          </Rise>
          <Rise delay={30} style={{ marginTop: 50 }}>
            <div
              style={{
                display: "inline-block",
                background: theme.colors.accent,
                color: theme.colors.paper,
                fontFamily: theme.fonts.body,
                fontWeight: 600,
                fontSize: 40,
                padding: "26px 60px",
                borderRadius: 10,
              }}
            >
              {theme.brand.domain}
            </div>
          </Rise>
        </div>
      </Scene>

      {/* persistent footer credit on last scene */}
      <Sequence from={300} layout="none">
        <AbsoluteFill
          style={{ alignItems: "center", justifyContent: "flex-end", padding: 90 }}
        >
          <SiteFooter delay={10} />
        </AbsoluteFill>
      </Sequence>
    </Background>
  );
};
