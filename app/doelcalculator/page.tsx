import type { Metadata } from "next";
import { GoalCalculator } from "@/components/GoalCalculator";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Doelcalculator",
  description:
    "Bereken een persoonlijk startpunt voor onderhoud, vetverlies, droogtrainen of spieropbouw met de TrophyGains doelcalculator.",
};

export default function GoalCalculatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gratis hulptool"
        title="Ontdek welke richting bij jouw lichaam past."
        text="Bereken je geschatte onderhoud, doelcalorieën en eiwitrichtlijn. Je krijgt een praktische start voor vetverlies, droogtrainen, onderhoud of spieropbouw."
      />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <GoalCalculator />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="premium-card p-5">
              <h2 className="font-black">Hoe wordt dit berekend?</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Rustverbranding via Mifflin-St Jeor, vermenigvuldigd met je gekozen activiteitsniveau.
              </p>
            </div>
            <div className="premium-card p-5">
              <h2 className="font-black">Waarom BMI en taille?</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                BMI is alleen een screening. Taille ten opzichte van lengte geeft extra context over vet rond de buik.
              </p>
            </div>
            <div className="premium-card p-5">
              <h2 className="font-black">Wanneer hulp inschakelen?</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Bij medische klachten, een eetstoornis, zwangerschap, onbedoeld gewichtsverlies of een BMI boven 35.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs leading-6 text-zinc-500">
            <span>Onderbouwing:</span>
            <a className="transition hover:text-gold-soft" href="https://pubmed.ncbi.nlm.nih.gov/2305711/" rel="noreferrer" target="_blank">
              Mifflin-St Jeor
            </a>
            <a className="transition hover:text-gold-soft" href="https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" rel="noreferrer" target="_blank">
              BMI-categorieën van CDC
            </a>
            <a className="transition hover:text-gold-soft" href="https://www.nhs.uk/health-assessment-tools/calculate-your-waist-to-height-ratio" rel="noreferrer" target="_blank">
              Taille-lengteadvies van NHS
            </a>
            <a className="transition hover:text-gold-soft" href="https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0177-8" rel="noreferrer" target="_blank">
              Eiwitrichtlijnen van ISSN
            </a>
            <span>Deze tool geeft algemene informatie en vervangt geen arts of diëtist.</span>
          </div>
        </div>
      </section>
    </>
  );
}
