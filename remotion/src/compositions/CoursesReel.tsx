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
import { courses as defaultCourses } from "../data/content";

const courseSchema = z.object({
  category: z.string(),
  title: z.string(),
  excerpt: z.string(),
  level: z.string(),
});

export const coursesReelSchema = z.object({
  heading: z.string(),
  subheading: z.string(),
  courses: z.array(courseSchema),
});

export type CoursesReelProps = z.infer<typeof coursesReelSchema>;

export const coursesReelDefaults: CoursesReelProps = {
  heading: "Learn by doing",
  subheading: "Short, hands-on courses that take you from theory to a working project.",
  courses: [...defaultCourses],
};

const CourseRow: React.FC<{
  course: CoursesReelProps["courses"][number];
  delay: number;
}> = ({ course, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        opacity: enter,
        transform: `translateX(${interpolate(enter, [0, 1], [60, 0])}px)`,
        background: theme.colors.card,
        border: `1px solid ${theme.colors.line}`,
        borderLeft: `8px solid ${theme.colors.accent}`,
        borderRadius: 22,
        padding: 56,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tag>{course.category}</Tag>
        <span
          style={{
            fontFamily: theme.fonts.body,
            fontSize: 28,
            fontWeight: 600,
            color: theme.colors.accent,
          }}
        >
          {course.level}
        </span>
      </div>
      <div
        style={{
          fontFamily: theme.fonts.head,
          fontWeight: 600,
          fontSize: 64,
          color: theme.colors.ink,
          marginTop: 30,
          lineHeight: 1.12,
        }}
      >
        {course.title}
      </div>
      <div
        style={{
          fontFamily: theme.fonts.body,
          fontSize: 36,
          lineHeight: 1.5,
          color: theme.colors.muted,
          marginTop: 26,
        }}
      >
        {course.excerpt}
      </div>
    </div>
  );
};

export const CoursesReel: React.FC<CoursesReelProps> = ({
  heading,
  subheading,
  courses,
}) => {
  return (
    <Background>
      <AbsoluteFill style={{ padding: 90, justifyContent: "center" }}>
        <Sequence layout="none">
          <Rise delay={4}>
            <Eyebrow>Courses</Eyebrow>
          </Rise>
          <Rise delay={12} style={{ marginTop: 26 }}>
            <div
              style={{
                fontFamily: theme.fonts.head,
                fontWeight: 600,
                fontSize: 96,
                color: theme.colors.ink,
                lineHeight: 1.08,
              }}
            >
              {heading}
            </div>
          </Rise>
          <Rise delay={20} style={{ marginTop: 24, marginBottom: 64 }}>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 40,
                color: theme.colors.muted,
                lineHeight: 1.45,
                maxWidth: 820,
              }}
            >
              {subheading}
            </div>
          </Rise>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {courses.map((c, i) => (
              <CourseRow key={c.title} course={c} delay={34 + i * 14} />
            ))}
          </div>
        </Sequence>
      </AbsoluteFill>

      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "flex-start", padding: 70 }}
      >
        <Brandmark size={36} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "flex-end", padding: 70 }}
      >
        <SiteFooter delay={50} />
      </AbsoluteFill>
    </Background>
  );
};
