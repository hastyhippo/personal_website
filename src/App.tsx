import { useEffect, useState } from "react"
import { Mail, MapPin, ArrowUpRight, Moon, Sun } from "lucide-react"
import { Github, Linkedin, Twitter } from "@/components/brand-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { profile, experience, projects, skills } from "@/data/resume"

function ThemeToggle() {
  const [dark, setDark] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  )

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setDark((d) => !d)}
    >
      {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-16">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-16">
        {/* Header */}
        <header className="mb-16 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {profile.name}
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">{profile.role}</p>
            <p className="mt-4 max-w-prose text-pretty leading-relaxed">
              {profile.tagline}
            </p>

            <div className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" />
                {profile.location}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {profile.links.github && (
                <Button asChild variant="outline" size="sm">
                  <a href={profile.links.github} target="_blank" rel="noreferrer">
                    <Github className="size-4" /> GitHub
                  </a>
                </Button>
              )}
              {profile.links.linkedin && (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin className="size-4" /> LinkedIn
                  </a>
                </Button>
              )}
              {profile.links.twitter && (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={profile.links.twitter}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Twitter className="size-4" /> Twitter
                  </a>
                </Button>
              )}
              {profile.email && (
                <Button asChild variant="outline" size="sm">
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="size-4" /> Email
                  </a>
                </Button>
              )}
            </div>
          </div>
          <ThemeToggle />
        </header>

        {/* Experience */}
        <Section title="Experience">
          <div className="space-y-4">
            {experience.map((job) => (
              <Card key={job.company}>
                <CardHeader>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <CardTitle className="text-base">
                      {job.role} · {job.company}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {job.period}
                    </span>
                  </div>
                  <CardDescription className="mt-1 leading-relaxed">
                    {job.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section title="Projects">
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <Card className="h-full transition-colors hover:border-foreground/30">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-base">
                      {project.name}
                      <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <footer className="border-t pt-8 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with React,
            Tailwind CSS &amp; shadcn/ui.
          </p>
        </footer>
      </div>
    </div>
  )
}
