import { useEffect } from "react"

/**
 * Subtle, professional scroll entrance: any element with the `.reveal` class
 * fades/slides in once when it enters the viewport. Respects reduced motion.
 */
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in-view"))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
