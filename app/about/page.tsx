import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { MotionSection } from "@/components/MotionSection";

export const metadata: Metadata = {
  title: "About",
  description: "Over TrophyGains, missie en visie.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About TrophyGains"
        title="Discipline verdient een systeem dat even strak is als je doel."
        text="TrophyGains is gebouwd voor sporters die premium begeleiding, duidelijke structuur en digitale producten zonder ruis willen."
      />
      <MotionSection className="section-padding">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3">
          {[
            ["Over TrophyGains", "Een modern fitnessmerk voor digitale schema's, ebooks en coaching met een luxe, resultaatgerichte ervaring."],
            ["Missie", "Sporters helpen consistente progressie te maken met heldere plannen die makkelijk uitvoerbaar zijn."],
            ["Visie", "Een premium fitnessplatform waar training, voeding, betaling en levering naadloos samenkomen."],
          ].map(([title, text]) => (
            <div className="premium-card p-6" key={title}>
              <h2 className="text-2xl font-black">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{text}</p>
            </div>
          ))}
        </div>
      </MotionSection>
    </>
  );
}
