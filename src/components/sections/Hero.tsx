import { useState } from "react"
import { MapPin, Mail, ArrowDown, User } from "lucide-react"
import { Github, Linkedin, Twitter } from "@/components/brand-icons"
import { Button } from "@/components/ui/button"
import { profile } from "@/data/resume"

function Avatar() {
  const [broken, setBroken] = useState(false)
  return (
    <div className="reveal size-20 overflow-hidden rounded-full border border-border bg-secondary shadow-sm ring-1 ring-black/5 md:size-24">
      {!broken ? (
        <img
          src={profile.avatar}
          alt={`${profile.name} — portrait`}
          className="size-full object-cover"
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-0.5 text-muted-foreground">
          <User className="size-6" />
          <span className="text-[8px] uppercase tracking-wider">Add photo</span>
        </div>
      )}
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-wash relative flex min-h-[88svh] w-full items-center px-6"
    >
      <div className="mx-auto w-full max-w-3xl py-24">
        <Avatar />

        <p className="reveal mt-8 text-sm font-medium uppercase tracking-[0.2em] text-brand">
          Hi, I&apos;m
        </p>
        <h1 className="reveal mt-2 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
          {profile.name}
        </h1>
        <p className="reveal mt-3 text-lg text-muted-foreground">{profile.role}</p>

        <p className="reveal mt-6 max-w-xl text-pretty text-lg leading-relaxed text-foreground/80">
          {profile.tagline}
        </p>

        <div className="reveal mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4" />
          {profile.location}
        </div>

        <div className="reveal mt-8 flex flex-wrap gap-2.5">
          <Button asChild>
            <a href={`mailto:${profile.email}`}>
              <Mail className="size-4" /> Get in touch
            </a>
          </Button>
          {profile.links.github && (
            <Button asChild variant="outline">
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                <Github className="size-4" /> GitHub
              </a>
            </Button>
          )}
          {profile.links.linkedin && (
            <Button asChild variant="outline">
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="size-4" /> LinkedIn
              </a>
            </Button>
          )}
          {profile.links.twitter && (
            <Button asChild variant="outline">
              <a href={profile.links.twitter} target="_blank" rel="noreferrer">
                <Twitter className="size-4" /> Twitter
              </a>
            </Button>
          )}
        </div>
      </div>

      <a
        href="#interests"
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground sm:flex"
      >
        Scroll <ArrowDown className="size-3.5 animate-bounce" />
      </a>
    </section>
  )
}
