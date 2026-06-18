import React from "react";
import { Composition } from "remotion";
import "./fonts";

import {
  BrandPromo,
  brandPromoSchema,
  brandPromoDefaults,
} from "./compositions/BrandPromo";
import {
  ArticleReel,
  articleReelSchema,
  articleReelDefaults,
  PER_CARD,
} from "./compositions/ArticleReel";
import {
  CoursesReel,
  coursesReelSchema,
  coursesReelDefaults,
} from "./compositions/CoursesReel";
import {
  HighlightPost,
  highlightPostSchema,
  highlightPostDefaults,
} from "./compositions/HighlightPost";
import { articles, courses } from "./data/content";

const FPS = 30;
const REEL = { width: 1080, height: 1920 }; // 9:16 vertical reel
const POST = { width: 1080, height: 1080 }; // 1:1 square post

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ---- Reels (9:16) ---- */}
      <Composition
        id="BrandPromo"
        component={BrandPromo}
        durationInFrames={380}
        fps={FPS}
        {...REEL}
        schema={brandPromoSchema}
        defaultProps={brandPromoDefaults}
      />

      <Composition
        id="ArticleReel"
        component={ArticleReel}
        durationInFrames={60 + articles.length * PER_CARD}
        fps={FPS}
        {...REEL}
        schema={articleReelSchema}
        defaultProps={articleReelDefaults}
      />

      <Composition
        id="CoursesReel"
        component={CoursesReel}
        durationInFrames={210}
        fps={FPS}
        {...REEL}
        schema={coursesReelSchema}
        defaultProps={coursesReelDefaults}
      />

      {/* ---- Posts (1:1) ---- */}
      <Composition
        id="ArticlePost"
        component={HighlightPost}
        durationInFrames={150}
        fps={FPS}
        {...POST}
        schema={highlightPostSchema}
        defaultProps={highlightPostDefaults}
      />

      <Composition
        id="CoursePost"
        component={HighlightPost}
        durationInFrames={150}
        fps={FPS}
        {...POST}
        schema={highlightPostSchema}
        defaultProps={{
          eyebrow: "Hands-on course",
          tag: courses[0].category,
          title: courses[0].title,
          body: courses[0].excerpt,
          footnote: "Free video lesson at scitechvoices.com",
        }}
      />
    </>
  );
};
