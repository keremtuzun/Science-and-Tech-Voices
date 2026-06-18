import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { theme } from "../theme";
import { Background } from "../components/Background";
import { Brandmark } from "../components/Brandmark";
import { Eyebrow, Rise } from "../components/Primitives";

/**
 * A square (1080x1080) recruiting post: invites students to join the
 * Science & Tech Voices team, with a short list of what members do.
 */
export const recruitPostSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  intro: z.string(),
  perks: z.array(z.string()),
  cta: z.string(),
});

export type RecruitPostProps = z.infer<typeof recruitPostSchema>;

export const recruitPostDefaults: RecruitPostProps = {
  eyebrow: "We are recruiting",
  title: "Join Science & Tech Voices",
  intro:
    "We are a student-run science and technology publication, and we are looking for curious minds to grow it with us.",
  perks: [
    "Write articles on the science shaping our future",
    "Produce videos and hands-on courses",
    "Build your portfolio with a real audience",
  ],
  cta: "Apply at scitechvoices.com",
};

const Perk: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        opacity: enter,
        transform: `translateX(${interpolate(enter, [0, 1], [40, 0])}px)`,
        display: "flex",
        alignItems: "center",
        gap: 24,
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          flexShrink: 0,
          borderRadius: "50%",
          background: theme.colors.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={24} height={24} viewBox="0 0 24 24">
          <path
            d="M5 12.5l4 4 10-10"
            fill="none"
            stroke={theme.colors.paper}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span
        style={{
          fontFamily: theme.fonts.body,
          fontSize: 38,
          color: theme.colors.ink,
          lineHeight: 1.35,
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const RecruitPost: React.FC<RecruitPostProps> = ({
  eyebrow,
  title,
  intro,
  perks,
  cta,
}) => {
  return (
    <Background>
      <AbsoluteFill style={{ padding: 90 }}>
        <Brandmark size={34} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Rise delay={6} style={{ marginBottom: 26 }}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Rise>
          <Rise delay={14}>
            <div
              style={{
                fontFamily: theme.fonts.head,
                fontWeight: 600,
                fontSize: 84,
                lineHeight: 1.08,
                color: theme.colors.ink,
              }}
            >
              {title}
            </div>
          </Rise>
          <Rise delay={22} style={{ marginTop: 28, marginBottom: 52 }}>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 38,
                lineHeight: 1.5,
                color: theme.colors.muted,
                maxWidth: 880,
              }}
            >
              {intro}
            </div>
          </Rise>

          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            {perks.map((p, i) => (
              <Perk key={p} text={p} delay={32 + i * 8} />
            ))}
          </div>
        </div>

        <Rise delay={56}>
          <div
            style={{
              display: "inline-block",
              alignSelf: "flex-start",
              background: theme.colors.accent,
              color: theme.colors.paper,
              fontFamily: theme.fonts.body,
              fontWeight: 600,
              fontSize: 38,
              padding: "24px 52px",
              borderRadius: 10,
            }}
          >
            {cta}
          </div>
        </Rise>
      </AbsoluteFill>
    </Background>
  );
};
