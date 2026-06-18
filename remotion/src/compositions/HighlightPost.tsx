import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { theme } from "../theme";
import { Background } from "../components/Background";
import { Brandmark } from "../components/Brandmark";
import { Eyebrow, Rise, Tag } from "../components/Primitives";

/**
 * A square (1080x1080) social post template. Generic enough to announce an
 * article, a course, or a project update — drive it via props.
 */
export const highlightPostSchema = z.object({
  eyebrow: z.string(),
  tag: z.string(),
  title: z.string(),
  body: z.string(),
  footnote: z.string(),
});

export type HighlightPostProps = z.infer<typeof highlightPostSchema>;

export const highlightPostDefaults: HighlightPostProps = {
  eyebrow: "New article",
  tag: "AI & Society",
  title: "Large Language Models: How Machines Learned Our Language",
  body: "The systems behind modern chatbots are changing how we search, write, and learn — here's how they actually work.",
  footnote: "Read it now at scitechvoices.com",
};

export const HighlightPost: React.FC<HighlightPostProps> = ({
  eyebrow,
  tag,
  title,
  body,
  footnote,
}) => {
  return (
    <Background>
      <AbsoluteFill style={{ padding: 90 }}>
        {/* header */}
        <Brandmark size={34} />

        {/* main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Rise delay={6} style={{ marginBottom: 28 }}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Rise>
          <Rise delay={14} style={{ marginBottom: 36 }}>
            <Tag>{tag}</Tag>
          </Rise>
          <Rise delay={22}>
            <div
              style={{
                fontFamily: theme.fonts.head,
                fontWeight: 600,
                fontSize: 76,
                lineHeight: 1.12,
                color: theme.colors.ink,
              }}
            >
              {title}
            </div>
          </Rise>
          <Rise delay={32} style={{ marginTop: 34 }}>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 40,
                lineHeight: 1.5,
                color: theme.colors.muted,
                maxWidth: 860,
              }}
            >
              {body}
            </div>
          </Rise>
        </div>

        {/* footer */}
        <Rise delay={40}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: `1px solid ${theme.colors.line}`,
              paddingTop: 34,
            }}
          >
            <span
              style={{
                fontFamily: theme.fonts.body,
                fontWeight: 600,
                fontSize: 34,
                color: theme.colors.ink,
              }}
            >
              {footnote}
            </span>
            <span
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 30,
                color: theme.colors.faint,
              }}
            >
              {theme.brand.handle}
            </span>
          </div>
        </Rise>
      </AbsoluteFill>
    </Background>
  );
};
