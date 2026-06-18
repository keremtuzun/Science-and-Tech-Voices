import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

/**
 * The wordmark lockup: "Science & Tech Voices" with the green accent on
 * "Voices", matching the site's .brand styling. Animates in on mount.
 */
export const Brandmark: React.FC<{
  delay?: number;
  size?: number;
}> = ({ delay = 0, size = 40 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const y = interpolate(enter, [0, 1], [14, 0]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <Logo size={size * 1.15} />
      <div
        style={{
          fontFamily: theme.fonts.head,
          fontWeight: 600,
          fontSize: size,
          color: theme.colors.ink,
          letterSpacing: -0.5,
        }}
      >
        Science &amp; Tech{" "}
        <span style={{ color: theme.colors.accent }}>Voices</span>
      </div>
    </div>
  );
};

/** Simple on-brand monogram mark (atom-in-a-square) used as the logo. */
export const Logo: React.FC<{ size?: number }> = ({ size = 48 }) => {
  const frame = useCurrentFrame();
  const spin = frame * 0.6;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: theme.colors.accent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 12px 30px rgba(31, 33, 25, 0.18)",
        flexShrink: 0,
      }}
    >
      <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 100 100">
        <g
          stroke={theme.colors.paper}
          strokeWidth={5}
          fill="none"
          transform={`rotate(${spin} 50 50)`}
        >
          <ellipse cx="50" cy="50" rx="42" ry="16" />
          <ellipse
            cx="50"
            cy="50"
            rx="42"
            ry="16"
            transform="rotate(60 50 50)"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="42"
            ry="16"
            transform="rotate(120 50 50)"
          />
        </g>
        <circle cx="50" cy="50" r="9" fill={theme.colors.paper} />
      </svg>
    </div>
  );
};
