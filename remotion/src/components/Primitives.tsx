import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

/** Spring-driven fade + rise wrapper used to stagger elements in. */
export const Rise: React.FC<{
  delay?: number;
  distance?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, distance = 26, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        opacity: interpolate(s, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(s, [0, 1], [distance, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** The small uppercase "eyebrow" label used across the site. */
export const Eyebrow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <span
    style={{
      fontFamily: theme.fonts.body,
      fontWeight: 600,
      fontSize: 26,
      letterSpacing: 4,
      textTransform: "uppercase",
      color: theme.colors.accent,
    }}
  >
    {children}
  </span>
);

/** Category pill, mirroring the site's .tag chip. */
export const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      display: "inline-block",
      fontFamily: theme.fonts.body,
      fontWeight: 600,
      fontSize: 24,
      letterSpacing: 1,
      textTransform: "uppercase",
      color: theme.colors.accent,
      background: theme.colors.accentWash,
      border: `1px solid ${theme.colors.line}`,
      borderRadius: 999,
      padding: "10px 22px",
    }}
  >
    {children}
  </span>
);

/** Footer lockup with domain + handle, pinned at the bottom of a reel. */
export const SiteFooter: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        opacity,
        fontFamily: theme.fonts.body,
        fontSize: 30,
        color: theme.colors.muted,
        fontWeight: 500,
      }}
    >
      <span style={{ color: theme.colors.accent, fontWeight: 600 }}>
        {theme.brand.domain}
      </span>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: theme.colors.faint,
        }}
      />
      <span>{theme.brand.handle}</span>
    </div>
  );
};
