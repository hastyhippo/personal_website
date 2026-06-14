import { interests } from "@/data/resume"

export default function Games() {
  return (
    <section id="interests" className="mx-auto w-full max-w-3xl px-6 pt-12 pb-2">
      <p className="reveal text-lg leading-relaxed text-foreground/80">
        {interests.intro}{" "}
        {interests.games.map((game, i) => (
          <span key={game}>
            <span className="font-medium text-foreground">{game}</span>
            {i < interests.games.length - 1 ? ", " : "."}
          </span>
        ))}
      </p>
    </section>
  )
}
