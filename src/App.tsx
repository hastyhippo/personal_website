import { useScrollReveal } from "@/lib/useScrollReveal"
import { profile } from "@/data/resume"
import BackgroundFX from "@/components/BackgroundFX"
import Hero from "@/components/sections/Hero"
import Games from "@/components/sections/Games"
import Projects from "@/components/sections/Projects"
import Experience from "@/components/sections/Experience"

const NAV = [
  { href: "#projects", label: "Projects" },
  { href: "#interests", label: "Games" },
  { href: "#experience", label: "Experience" },
]

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
        <a href="#top" className="text-sm font-semibold tracking-tight text-foreground">
          {profile.name}
        </a>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border/70 px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          {profile.email}
        </a>
      </div>
    </footer>
  )
}

export default function App() {
  useScrollReveal()

  return (
    <div className="min-h-svh text-foreground">
      <BackgroundFX />
      <Header />
      <main>
        <Hero />
        <Games />
        <Projects />
        <Experience />
      </main>
      <Footer />
    </div>
  )
}
