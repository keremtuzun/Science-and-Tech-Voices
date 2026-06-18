import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { theme } from "../theme";

/**
 * Branded paper-textured background with a subtle drifting grid and
 * faint green "orbits", echoing the editorial science theme of the site.
 */
export const Background: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();
  const drift = (frame % 1200) / 1200;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.paper }}>
      {/* soft vignette tint */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 80% at 50% 0%, ${theme.colors.accentWash} 0%, rgba(231,236,230,0) 55%)`,
        }}
      />
      {/* faint engineering grid, slowly drifting */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${theme.colors.line} 1px, transparent 1px), linear-gradient(90deg, ${theme.colors.line} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          backgroundPosition: `0px ${drift * 80}px`,
          opacity: 0.35,
        }}
      />
      {/* drifting accent orbits */}
      {[0, 1, 2].map((i) => {
        const size = 700 + i * 360;
        const angle = drift * Math.PI * 2 + i * 2.1;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              left: `${50 + Math.cos(angle) * 6}%`,
              top: `${42 + Math.sin(angle) * 6}%`,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: `1.5px solid ${theme.colors.accent}`,
              opacity: 0.08,
            }}
          />
        );
      })}
      {children}
    </AbsoluteFill>
  );
};
