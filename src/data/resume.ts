// ─────────────────────────────────────────────────────────────────────────
// EDIT THIS FILE to customize your site. Everything below is your content.
// The page renders from this data, so you rarely need to touch the JSX.
// Anything wrapped in [ brackets ] is a placeholder for you to fill in.
// ─────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Nathan Lin",
  role: "Mathematics & Computer Science",
  // The one-liner under your name.
  tagline:  "Mathematics & Computer Science student with an interest in algorithms, game theory and machine learning.",
  location: "Sydney, Australia",
  email: "nathan.lin427@gmail.com",
  // Drop a square headshot at /public/avatar.jpg and it appears in the hero.
  avatar: "/avatar.jpg",
  links: {
    github: "https://github.com/hastyhippo",
    linkedin: "https://linkedin.com/in/your-username", // ← update handle
    twitter: "", // leave "" to hide
  },
}

// ── INTERESTS ─────────────────────────────────────────────────────────────
// A short, text-based note about the strategy games you enjoy.
export const interests = {
  intro: "I've always had an interest in strategy games. Some games I really enjoy playing:",
  games: ["Poker", "Battle for Polytopia", "StarCraft 2"],
}

// ── PROJECTS ──────────────────────────────────────────────────────────────
// Game-solver work. status: "completed" | "in-progress".
// `theme` controls the look of that project's full-screen page.
export type Project = {
  name: string
  status: "completed" | "in-progress"
  theme: "connect4" | "chess" | "poker" | "polytopia"
  blurb: string
  tags: string[]
  href: string
}

export const projects: Project[] = [
  {
    name: "Connect 4 Solver",
    status: "completed",
    theme: "connect4",
    blurb:
      "A perfect-play engine using minimax with alpha-beta pruning, bitboard representation and a transposition table — it never loses moving first.",
    tags: ["Minimax", "Alpha-Beta", "Bitboards"],
    href: "#",
  },
  {
    name: "Chess Engine",
    status: "completed",
    theme: "chess",
    blurb:
      "A search-and-evaluation engine with iterative deepening, move ordering and a hand-tuned positional evaluation function.",
    tags: ["Negamax", "Evaluation", "Zobrist Hashing"],
    href: "#",
  },
  {
    name: "Poker Solver",
    status: "completed",
    theme: "poker",
    blurb:
      "Approximates game-theory-optimal play via counterfactual regret minimization, converging toward Nash equilibria in imperfect-information spots.",
    tags: ["CFR", "Game Theory", "Equilibria"],
    href: "#",
  },
  {
    name: "Polytopia Solver",
    status: "in-progress",
    theme: "polytopia",
    blurb:
      "Currently in development: searching a branching 4X game tree with hidden information and a large action space using heuristics and pruning.",
    tags: ["Tree Search", "Heuristics", "In Progress"],
    href: "#",
  },
]

// ── EXPERIENCE & EDUCATION ────────────────────────────────────────────────
// kind: "education" | "work". Edit the `blurb` text freely.
export type Entry = {
  org: string
  title: string
  period: string
  kind: "education" | "work"
  current?: boolean
  blurb: string
  tags: string[]
}

export const timeline: Entry[] = [
  {
    org: "North Sydney Boys High School",
    title: "Higher School Certificate",
    period: "Graduated",
    kind: "education",
    blurb:
      "[ Add a line about your time here — selective school, achievements, and what drew you toward maths and computer science. ]",
    tags: ["HSC", "Foundations"],
  },
  {
    org: "University", // ← swap in your university
    title: "B. Mathematics & Computer Science",
    period: "Expected Sep 2027",
    kind: "education",
    current: true,
    blurb:
      "[ Add your majors, focus areas, standout coursework, or societies you're involved in. ]",
    tags: ["Mathematics", "Computer Science"],
  },
  {
    org: "Flow Traders",
    title: "Trading Intern",
    period: "Internship",
    kind: "work",
    blurb:
      "[ Describe what you worked on — market making, strategy research, the tools and markets you touched, and what you took away. ]",
    tags: ["Trading", "Quantitative", "Markets"],
  },
  {
    org: "TikTok",
    title: "Software Engineering Intern",
    period: "Internship",
    kind: "work",
    blurb:
      "[ Describe the team and project — systems you built, the scale you worked at, the languages you used, and your impact. ]",
    tags: ["Software Engineering", "Backend", "Scale"],
  },
]
