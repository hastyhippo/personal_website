/**
 * Fixed, decorative page background: a faint dot grid plus a few large
 * blurred colour blobs that slowly drift — a soft "aurora" wash that keeps
 * the light, professional feel while adding depth and movement.
 * Purely decorative and non-interactive; respects reduced motion via CSS.
 */
export default function BackgroundFX() {
  return (
    <div className="bg-fx" aria-hidden>
      <div className="bg-grid" />
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />
    </div>
  )
}
