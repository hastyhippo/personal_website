import { GraduationCap, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { timeline, type Entry } from "@/data/resume"
import { SectionHeading } from "./section-kit"

function TimelineItem({ entry, last }: { entry: Entry; last: boolean }) {
  const Icon = entry.kind === "education" ? GraduationCap : Briefcase
  return (
    <li className="reveal relative pl-12 pb-10 last:pb-0">
      {!last && (
        <span className="absolute left-[1.125rem] top-10 h-[calc(100%-2rem)] w-px bg-border" aria-hidden />
      )}
      <span
        className={`absolute left-0 top-0 grid size-9 place-items-center rounded-full border bg-card ${
          entry.current ? "border-brand text-brand" : "border-border text-muted-foreground"
        }`}
      >
        <Icon className="size-4" />
      </span>

      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            {entry.org}
          </h3>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            {entry.current && (
              <span className="inline-block size-1.5 rounded-full bg-brand" aria-hidden />
            )}
            {entry.period}
          </span>
        </div>
        <p className="mt-0.5 text-sm font-medium text-brand">{entry.title}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          {entry.blurb}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {entry.tags.map((t) => (
            <Badge key={t} variant="secondary" className="font-normal">
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </li>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="mx-auto w-full max-w-3xl px-6 py-20">
      <SectionHeading
        eyebrow="The path so far"
        title="Experience & education"
        description="School, study and the internships along the way. Currently working toward graduation in September 2027."
      />
      <ol className="relative mt-2">
        {timeline.map((entry, i) => (
          <TimelineItem
            key={entry.org + entry.title}
            entry={entry}
            last={i === timeline.length - 1}
          />
        ))}
      </ol>
    </section>
  )
}
