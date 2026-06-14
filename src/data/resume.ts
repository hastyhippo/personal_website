// ─────────────────────────────────────────────────────────────────────────
// EDIT THIS FILE to customize your site. Everything below is your content.
// The page in App.tsx renders from this data, so you rarely need to touch JSX.
// ─────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Nathan Lin",
  role: "Software Engineer",
  tagline:
    "I build thoughtful, reliable software. Welcome to my corner of the web.",
  location: "San Francisco, CA",
  email: "nathan.lin427@gmail.com",
  // Social / profile links. Remove any you don't want.
  links: {
    github: "https://github.com/hastyhippo",
    linkedin: "https://linkedin.com/in/your-username",
    twitter: "", // leave "" to hide
  },
}

export type Experience = {
  company: string
  role: string
  period: string
  description: string
  tags: string[]
}

export const experience: Experience[] = [
  {
    company: "Example Corp",
    role: "Senior Software Engineer",
    period: "2023 — Present",
    description:
      "Lead development of core platform features. Replace this with a real summary of what you did and the impact you had.",
    tags: ["TypeScript", "React", "Node.js"],
  },
  {
    company: "Startup Inc",
    role: "Software Engineer",
    period: "2021 — 2023",
    description:
      "Built and shipped customer-facing features from design to deploy. Swap in your real experience here.",
    tags: ["Python", "PostgreSQL", "AWS"],
  },
]

export type Project = {
  name: string
  description: string
  href: string
  tags: string[]
}

export const projects: Project[] = [
  {
    name: "This Website",
    description:
      "A personal site built with React, TypeScript, Tailwind CSS, and shadcn/ui.",
    href: "https://github.com/hastyhippo/personal_website",
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    name: "Project Two",
    description:
      "A short description of something you're proud of. Link it to a repo or live demo.",
    href: "#",
    tags: ["Open Source"],
  },
]

export const skills: string[] = [
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "SQL",
  "Tailwind CSS",
  "Git",
  "AWS",
]
