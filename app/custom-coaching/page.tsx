import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PricingCard } from "@/components/PricingCard";

export const metadata: Metadata = {
  title: "Custom Coaching",
  description: "Persoonlijke TrophyGains coaching met intakeformulier.",
};

export default function CustomCoachingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Custom Coaching"
        title="Persoonlijke begeleiding met een premium intake."
        text="Vul je basisgegevens in. De backend en e-mailflow kunnen later worden gekoppeld aan CRM, Mollie en onboarding."
      />
      <section className="section-padding">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_0.75fr]">
          <form className="premium-card grid gap-5 p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <input className="field" name="name" placeholder="Naam" />
              <input className="field" name="age" placeholder="Leeftijd" type="number" />
              <input className="field" name="weight" placeholder="Gewicht in kg" type="number" />
              <input className="field" name="height" placeholder="Lengte in cm" type="number" />
            </div>
            <select className="field" name="goal" defaultValue="">
              <option value="" disabled>
                Doel
              </option>
              <option>Vetverlies</option>
              <option>Spieropbouw</option>
              <option>Onderhoud</option>
              <option>Performance</option>
            </select>
            <select className="field" name="trainingDays" defaultValue="">
              <option value="" disabled>
                Trainingsdagen per week
              </option>
              <option>2 dagen</option>
              <option>3 dagen</option>
              <option>4 dagen</option>
              <option>5 dagen</option>
              <option>6 dagen</option>
            </select>
            <textarea className="field min-h-36" name="notes" placeholder="Opmerkingen, blessures, voorkeuren of context" />
            <button className="btn-gold" type="button">
              Verstuur intake placeholder
            </button>
          </form>
          <PricingCard
            title="Premium Coaching"
            price="Vanaf €149"
            features={[
              "Persoonlijke training en voeding",
              "Check-ins en progressiefeedback",
              "Aanpassingen op basis van data",
              "Mollie betaling later koppelbaar",
            ]}
          />
        </div>
      </section>
    </>
  );
}
