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
import { Brandmark } from "../components/Brandmark";
import { Eyebrow, Rise, SiteFooter, Tag } from "../components/Primitives";
import { articles as defaultArticles } from "../data/content";

const articleSchema = z.object({
  category: z.string(),
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  readTime: z.string(),
});

export const articleReelSchema = z.object({
  heading: z.string(),
  perCard: z.number().min(40).max(180),
  articles: z.array(articleSchema),
});

export type ArticleReelProps = z.infer<typeof articleReelSchema>;

export const PER_CARD = 80; // frames each article is on screen

export const articleReelDefaults: ArticleReelProps = {
  heading: "Fresh on the site",
  perCard: PER_CARD,
  articles: [...defaultArticles],
};

const Intro: React.FC<{ heading: string }> = ({ heading }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, 48, 60], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "center", opacity }}
    >
      <div style={{ textAlign: "center" }}>
        <Rise delay={6}>
          <Eyebrow>New from Science &amp; Tech Voices</Eyebrow>
        </Rise>
        <Rise delay={16} style={{ marginTop: 34 }}>
          <div
            style={{
              fontFamily: theme.fonts.head,
              fontWeight: 600,
              fontSize: 100,
              color: theme.colors.ink,
              lineHeight: 1.1,
              maxWidth: 820,
            }}
          >
            {heading}
          </div>
        </Rise>
      </div>
    </AbsoluteFill>
  );
};

const ArticleCard: React.FC<{
  article: ArticleReelProps["articles"][number];
  index: number;
  total: number;
  perCard: number;
}> = ({ article, index, total, perCard }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const out = interpolate(frame, [perCard - 12, perCard], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 90,
        opacity: out,
      }}
    >
      <div
        style={{
          width: "100%",
          background: theme.colors.card,
          border: `1px solid ${theme.colors.line}`,
          borderRadius: 28,
          boxShadow: "0 24px 60px rgba(31,33,25,0.10)",
          padding: 70,
          transform: `translateY(${interpolate(enter, [0, 1], [40, 0])}px)`,
          opacity: enter,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tag>{article.category}</Tag>
          <span
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 30,
              color: theme.colors.faint,
              fontWeight: 600,
            }}
          >
            {index + 1} / {total}
          </span>
        </div>

        <div
          style={{
            fontFamily: theme.fonts.head,
            fontWeight: 600,
            fontSize: 74,
            lineHeight: 1.14,
            color: theme.colors.ink,
            marginTop: 44,
          }}
        >
          {article.title}
        </div>

        <div
          style={{
            fontFamily: theme.fonts.body,
            fontSize: 40,
            lineHeight: 1.5,
            color: theme.colors.muted,
            marginTop: 36,
          }}
        >
          {article.excerpt}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 48,
            fontFamily: theme.fonts.body,
            fontSize: 30,
            color: theme.colors.faint,
            fontWeight: 500,
          }}
        >
          <span>{article.date}</span>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: theme.colors.faint,
            }}
          />
          <span>{article.readTime}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ArticleReel: React.FC<ArticleReelProps> = ({
  heading,
  perCard,
  articles,
}) => {
  return (
    <Background>
      <Sequence durationInFrames={60} layout="none">
        <Intro heading={heading} />
      </Sequence>

      {articles.map((article, i) => (
        <Sequence
          key={i}
          from={60 + i * perCard}
          durationInFrames={perCard}
          layout="none"
        >
          <ArticleCard
            article={article}
            index={i}
            total={articles.length}
            perCard={perCard}
          />
        </Sequence>
      ))}

      {/* persistent brand header + footer */}
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "flex-start", padding: 70 }}
      >
        <Brandmark size={36} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "flex-end", padding: 70 }}
      >
        <SiteFooter />
      </AbsoluteFill>
    </Background>
  );
};
