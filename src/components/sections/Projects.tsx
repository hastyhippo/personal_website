import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react"
import { ArrowUpRight, ArrowLeft, CircleCheck, CircleDashed } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { projects, type Project } from "@/data/resume"
import { SectionHeading } from "./section-kit"

function StatusPill({ status }: { status: Project["status"] }) {
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
        <CircleCheck className="size-3.5" /> Completed
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-brand">
      <CircleDashed className="size-3.5" /> In progress
    </span>
  )
}

// ── Full-screen themed project page, opened with a circular reveal ──────────
const THEMES: Record<
  Project["theme"],
  { bg: string; text: string; sub: string }
> = {
  connect4: { bg: "proj-bg-connect4", text: "#f8fafc", sub: "rgba(248,250,252,0.72)" },
  chess: { bg: "proj-bg-chess", text: "#fdf3e3", sub: "rgba(253,243,227,0.78)" },
  poker: { bg: "proj-bg-poker", text: "#eafff2", sub: "rgba(234,255,242,0.72)" },
  polytopia: { bg: "proj-bg-polytopia", text: "#0c2233", sub: "rgba(12,34,51,0.72)" },
}

function ProjectOverlay({
  project,
  origin,
  onClose,
}: {
  project: Project
  origin: { x: number; y: number }
  onClose: () => void
}) {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const fullClip = `circle(${radiusToCorner(origin)}px at ${origin.x}px ${origin.y}px)`
  const zeroClip = `circle(0px at ${origin.x}px ${origin.y}px)`

  const [clip, setClip] = useState(reduce ? fullClip : zeroClip)
  const [show, setShow] = useState(reduce)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    let raf = 0
    let t = 0
    if (!reduce) {
      raf = requestAnimationFrame(() => setClip(fullClip))
      t = window.setTimeout(() => setShow(true), 360)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      cancelAnimationFrame(raf)
      clearTimeout(t)
      window.removeEventListener("keydown", onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    if (reduce) {
      onClose()
      return
    }
    setShow(false)
    setClip(zeroClip)
    window.setTimeout(onClose, 560)
  }

  const theme = THEMES[project.theme]

  return (
    <div
      className="fixed inset-0 z-[100]"
      style={{
        clipPath: clip,
        WebkitClipPath: clip,
        transition: reduce ? "none" : "clip-path 0.62s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className={`relative h-full w-full ${theme.bg}`} style={{ color: theme.text }}>
        <button
          type="button"
          onClick={handleClose}
          className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium backdrop-blur transition hover:brightness-110"
          style={{ background: "rgba(255,255,255,0.16)", color: theme.text }}
        >
          <ArrowLeft className="size-4" /> Back
        </button>

        <div
          className={`flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          <span
            className="mb-3 text-xs font-medium uppercase tracking-[0.25em]"
            style={{ color: theme.sub }}
          >
            Project
          </span>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            {project.name}
          </h2>
          <p className="mt-4 max-w-sm text-sm" style={{ color: theme.sub }}>
            This page is intentionally empty for now — content coming soon.
          </p>
        </div>
      </div>
    </div>
  )
}

function radiusToCorner(origin: { x: number; y: number }) {
  const w = window.innerWidth
  const h = window.innerHeight
  return Math.hypot(Math.max(origin.x, w - origin.x), Math.max(origin.y, h - origin.y)) + 4
}

type Point = {
  x: number
  y: number
  cardLeft: number
  cardWidth: number
  project: Project
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const tailRef = useRef<SVGPathElement>(null)
  const arrowRef = useRef<SVGGElement>(null)
  const destRefs = useRef<(HTMLDivElement | null)[]>([])
  const [width, setWidth] = useState(0)
  const [overlay, setOverlay] = useState<{ project: Project; x: number; y: number } | null>(
    null,
  )

  const open = (e: ReactMouseEvent, project: Project) =>
    setOverlay({ project, x: e.clientX, y: e.clientY })

  // Measure available width (before paint) so the route scales responsively.
  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => setWidth(el.clientWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Geometry: destination points + the winding SVG path between them.
  const geo = useMemo(() => {
    const W = width
    if (!W) return null
    const mobile = W < 720
    const PAD_TOP = 84
    const SLOT = mobile ? 210 : 240
    const TAIL = 132
    // small curvature — gentle wiggle close to the centre line
    const leftX = mobile ? W * 0.13 : W * 0.44
    const rightX = mobile ? W * 0.27 : W * 0.56

    const pts: Point[] = projects.map((project, i) => {
      const x = i % 2 === 0 ? leftX : rightX
      const y = PAD_TOP + SLOT * i + SLOT / 2
      let cardWidth: number
      let cardLeft: number
      if (mobile) {
        cardWidth = W * 0.66
        cardLeft = W * 0.31 - x
      } else {
        cardWidth = Math.min(320, W * 0.42)
        // left-side stops splay left, right-side stops splay right
        cardLeft = i % 2 === 0 ? -(cardWidth + 28) : 28
      }
      return { x, y, cardLeft, cardWidth, project }
    })

    const last = pts[pts.length - 1]
    const tailTop = last.y
    const tailBottom = last.y + TAIL
    const H = tailBottom + 24

    // Start as a straight vertical line in the middle, then ease into the wiggle.
    const leadX = mobile ? pts[0].x : W * 0.5
    const p0 = pts[0]
    const m0 = (PAD_TOP + p0.y) / 2
    let d = `M ${leadX} 0 L ${leadX} ${PAD_TOP} C ${leadX} ${m0}, ${p0.x} ${m0}, ${p0.x} ${p0.y}`
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1]
      const b = pts[i]
      const m = (a.y + b.y) / 2
      d += ` C ${a.x} ${m}, ${b.x} ${m}, ${b.x} ${b.y}`
    }

    // dotted trail that runs off below the last stop and fades to nothing
    const tailD = `M ${last.x} ${tailTop} L ${last.x} ${tailBottom}`

    return { W, H, pts, d, tailD, tailTop, tailBottom, leadFade: PAD_TOP + 8 }
  }, [width])

  // Scroll-drive the arrow + the route fill + the destination reveals.
  useEffect(() => {
    if (!geo) return
    const path = pathRef.current
    const cont = containerRef.current
    if (!path || !cont) return

    const total = path.getTotalLength()
    path.style.strokeDasharray = String(total)

    // Map each destination to a fraction of the path length (matched by y).
    const K = 240
    const samples: { l: number; y: number }[] = []
    for (let k = 0; k <= K; k++) {
      const l = (total * k) / K
      samples.push({ l, y: path.getPointAtLength(l).y })
    }
    const thresholds = geo.pts.map((p) => {
      let bestL = 0
      let bestD = Infinity
      for (const s of samples) {
        const dd = Math.abs(s.y - p.y)
        if (dd < bestD) {
          bestD = dd
          bestL = s.l
        }
      }
      return bestL / total
    })

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      path.style.strokeDashoffset = "0"
      arrowRef.current?.setAttribute("opacity", "0")
      if (tailRef.current) tailRef.current.style.opacity = "1"
      destRefs.current.forEach((el) => el?.classList.add("reached"))
      return
    }

    let raf = 0
    const update = () => {
      raf = 0
      const rect = cont.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const anchor = vh * 0.5
      // < 1 makes the route finish before you've scrolled the whole section.
      const SPEED = 0.6
      let prog = (anchor - rect.top) / (rect.height * SPEED)
      prog = Math.max(0, Math.min(1, prog))

      // route fills from the start
      path.style.strokeDashoffset = String(total * (1 - prog))

      // arrow rides along the path, rotated to the local tangent
      const len = total * prog
      const pt = path.getPointAtLength(len)
      const ahead = path.getPointAtLength(Math.min(total, len + 1.5))
      const ang = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI
      const a = arrowRef.current
      if (a) {
        a.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${ang})`)
        a.setAttribute("opacity", prog > 0.002 ? "1" : "0")
      }

      // destinations light up once the arrow passes them
      thresholds.forEach((t, i) => {
        destRefs.current[i]?.classList.toggle("reached", prog >= t - 0.002)
      })

      // dotted tail fades in as the route completes
      if (tailRef.current) {
        tailRef.current.style.opacity = String(
          Math.max(0, Math.min(1, (prog - 0.8) / 0.2)),
        )
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [geo])

  return (
    <section id="projects" className="mx-auto w-full max-w-5xl px-6 pt-6 pb-20">
      <SectionHeading
        eyebrow="Selected work"
        title="Algorithmic game solvers"
        description="My projects center on one idea: writing algorithms that play the games I find interesting."
      />
      <p className="reveal -mt-2 mb-6 text-sm text-muted-foreground">
        Follow the route — each stop is a project, ending with what I&apos;m building now.
        Click a bauble to open it.
      </p>

      <div ref={containerRef} className="relative" style={{ height: geo ? geo.H : 600 }}>
        {geo && (
          <>
            <svg
              className="pointer-events-none absolute left-0 top-0"
              width={geo.W}
              height={geo.H}
              viewBox={`0 0 ${geo.W} ${geo.H}`}
              fill="none"
              aria-hidden
              style={{
                maskImage: `linear-gradient(to bottom, transparent 0, #000 ${geo.leadFade}px)`,
                WebkitMaskImage: `linear-gradient(to bottom, transparent 0, #000 ${geo.leadFade}px)`,
              }}
            >
              <defs>
                <linearGradient
                  id="tail-fade"
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1={geo.tailTop}
                  x2="0"
                  y2={geo.tailBottom}
                >
                  <stop offset="0%" style={{ stopColor: "var(--brand)" }} stopOpacity={0.8} />
                  <stop offset="100%" style={{ stopColor: "var(--brand)" }} stopOpacity={0} />
                </linearGradient>
              </defs>
              <path d={geo.d} className="route-base" strokeWidth={3} strokeLinecap="round" />
              <path
                ref={pathRef}
                d={geo.d}
                className="route-progress"
                strokeWidth={3}
                strokeLinecap="round"
                style={{ willChange: "stroke-dashoffset" }}
              />
              <path
                ref={tailRef}
                d={geo.tailD}
                stroke="url(#tail-fade)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray="0.5 9"
                opacity="0"
                style={{ willChange: "opacity" }}
              />
              <g ref={arrowRef} opacity="0" style={{ willChange: "transform" }}>
                <circle r={15} className="arrow-core" />
                <circle r={15} fill="none" stroke="white" strokeWidth={2} />
                <path
                  d="M -3.5 -5 L 5 0 L -3.5 5"
                  fill="none"
                  stroke="white"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>

            {geo.pts.map((p, i) => (
              <div
                key={p.project.name}
                ref={(el) => {
                  destRefs.current[i] = el
                }}
                className="dest absolute"
                style={{ left: p.x, top: p.y }}
              >
                {/* clickable bauble sitting on the route */}
                <button
                  type="button"
                  onClick={(e) => open(e, p.project)}
                  aria-label={`Open ${p.project.name}`}
                  className="marker absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="marker-ring grid size-9 place-items-center rounded-full text-xs font-semibold">
                    {i + 1}
                  </span>
                  <span className="click-hint pointer-events-none absolute left-1/2 top-full mt-1.5 whitespace-nowrap rounded-full bg-brand px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white shadow">
                    Click me
                  </span>
                </button>

                {/* card, vertically centered on the bauble */}
                <div
                  className="absolute"
                  style={{
                    left: p.cardLeft,
                    top: 0,
                    width: p.cardWidth,
                    transform: "translateY(-50%)",
                  }}
                >
                  <div className="card-anim">
                    <button
                      type="button"
                      onClick={(e) => open(e, p.project)}
                      className="group block w-full rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="flex items-center justify-between">
                        <StatusPill status={p.project.status} />
                        <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                      </div>
                      <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                        {p.project.name}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {p.project.blurb}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.project.tags.map((t) => (
                          <Badge key={t} variant="secondary" className="font-normal">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {overlay && (
        <ProjectOverlay
          project={overlay.project}
          origin={{ x: overlay.x, y: overlay.y }}
          onClose={() => setOverlay(null)}
        />
      )}
    </section>
  )
}
