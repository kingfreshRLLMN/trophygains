import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { WorkoutFilters } from "@/components/WorkoutFilters";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Trainingsschema's",
  description: "Premium TrophyGains trainingsschema's voor 2, 3, 4, 5 en 6 dagen per week.",
};

export default function WorkoutPlansPage() {
  const products = getProductsByCategory("workout");

  return (
    <>
      <PageHeader
        eyebrow="Trainingsschema's"
        title="Kies het trainingsschema dat past bij jouw week."
        text="Van compacte krachtopbouw tot een intensief physique-schema: filter op trainingsdagen en voeg je plan direct toe aan je winkelwagen."
      />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <WorkoutFilters products={products} />
        </div>
      </section>
    </>
  );
}
