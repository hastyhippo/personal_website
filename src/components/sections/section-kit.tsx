import { useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

/** Quiet eyebrow + display title used at the top of every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="reveal mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
          {eyebrow}
        </span>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}

/**
 * Horizontal scroll-snap slider with prev/next controls.
 * Pass the slides as children; each child is a slide.
 */
export function Slider({
  children,
  className,
  ariaLabel,
}: {
  children: React.ReactNode
  className?: string
  ariaLabel: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollByDir = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const amount = Math.max(track.clientWidth * 0.8, 280)
    track.scrollBy({ left: dir * amount, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className={cn(
          "no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-1 pb-2",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
      >
        {children}
      </div>

      <div className="reveal mt-4 flex justify-end gap-2">
        <SliderButton label="Previous" onClick={() => scrollByDir(-1)}>
          <ArrowLeft className="size-4" />
        </SliderButton>
        <SliderButton label="Next" onClick={() => scrollByDir(1)}>
          <ArrowRight className="size-4" />
        </SliderButton>
      </div>
    </div>
  )
}

function SliderButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
    </button>
  )
}
