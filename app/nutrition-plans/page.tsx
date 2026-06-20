import type { Metadata } from "next";
import { NutritionFilters } from "@/components/NutritionFilters";
import { PageHeader } from "@/components/PageHeader";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Voedingsschema's",
  description: "Voedingsschema's voor cut, onderhoud en bulk van 1500 tot 3500 calorieën.",
};

export default function NutritionPlansPage() {
  const products = getProductsByCategory("nutrition");

  return (
    <>
      <PageHeader
        eyebrow="Voedingsschema's"
        title="Macro's, maaltijden en calorieën zonder chaos."
        text="Filter op cut, onderhoud of bulk en kies uit 1500, 2000, 2500, 3000 of 3500 calorieën."
      />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <NutritionFilters products={products} />
        </div>
      </section>
    </>
  );
}
