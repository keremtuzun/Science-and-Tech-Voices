/**
 * Content used across the promotional videos.
 * Kept in one place so new articles/courses just need an entry here.
 */

export type Article = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
};

export type Course = {
  category: string;
  title: string;
  excerpt: string;
  level: string;
};

// A rotating selection of featured articles (from posts.html / index.html).
export const articles: Article[] = [
  {
    category: "AI & Society",
    title: "Large Language Models: How Machines Learned Our Language",
    excerpt:
      "The systems behind modern chatbots are changing how we search, write, and learn. Here is how they actually work.",
    date: "June 9, 2026",
    readTime: "5 min read",
  },
  {
    category: "Biotech",
    title: "CRISPR: Rewriting the Code of Life",
    excerpt:
      "A bacterial immune system became the most powerful gene-editing tool ever discovered.",
    date: "May 21, 2026",
    readTime: "5 min read",
  },
  {
    category: "Space",
    title: "Exoplanets: The Search for Other Earths",
    excerpt:
      "Thousands of planets orbit other stars. The next question is the biggest science has ever asked: is anyone home?",
    date: "May 6, 2026",
    readTime: "5 min read",
  },
  {
    category: "Energy",
    title: "Solid-State Batteries: The Quiet Revolution",
    excerpt:
      "Replacing the liquid inside a battery with a solid could change everything that runs on electricity.",
    date: "April 20, 2026",
    readTime: "4 min read",
  },
  {
    category: "Computing",
    title: "Quantum Computers: The Gateway to the Future",
    excerpt:
      "Qubits, superposition, and how quantum computing could solve problems classical machines never will.",
    date: "March 14, 2026",
    readTime: "4 min read",
  },
];

// The two hands-on courses (from courses.html).
export const courses: Course[] = [
  {
    category: "Electronics",
    title: "Arduino Distance Measurement",
    excerpt:
      "Build a working distance sensor with an Arduino and an ultrasonic module: wiring, code, and live data.",
    level: "Beginner friendly",
  },
  {
    category: "Mathematics",
    title: "Algebra Fundamentals",
    excerpt:
      "Variables, equations, and functions: the language every branch of science is written in.",
    level: "Beginner friendly",
  },
];

// Headline stats shown in the brand promo (from the homepage hero).
export const stats = [
  { value: "12", label: "Articles" },
  { value: "2", label: "Videos" },
  { value: "2", label: "Courses" },
  { value: "8", label: "Fields" },
];
