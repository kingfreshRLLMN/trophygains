import type { Metadata } from "next";
import { NutritionFilters } from "@/components/NutritionFilters";
import { PageHeader } from "@/components/PageHeader";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Voedingsschema's",
  description: "Realistische voedingsschema's voor vetverlies, onderhoud en spieropbouw van 1500 tot 3500 calorieën.",
};

export default function NutritionPlansPage() {
  const products = getProductsByCategory("nutrition");

  return (
    <>
      <PageHeader
        eyebrow="Voedingsschema's"
        title="Kies voeding die past bij jouw doel en energiebehoefte."
        text="Start met je doel en bekijk daarna alleen de calorie-opties die daarbij logisch zijn. Geen onrealistische combinaties, maar praktische schema's met heldere macro's en maaltijden."
      />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <NutritionFilters products={products} />
        </div>
      </section>
    </>
  );
}
