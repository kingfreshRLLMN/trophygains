import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { WorkoutFilters } from "@/components/WorkoutFilters";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Trainingsschema's",
  description: "Trainingsschema's voor vetverlies, onderhoud, spieropbouw en kracht, van 2 tot 6 dagen per week.",
};

export default function WorkoutPlansPage() {
  const products = getProductsByCategory("workout");

  return (
    <>
      <PageHeader
        eyebrow="Trainingsschema's"
        title="Jouw doel. Jouw week. Jouw schema."
        text="Kies eerst je doel en daarna hoeveel dagen je wilt trainen. Voor iedere combinatie staat een gericht trainingsschema klaar."
      />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <WorkoutFilters products={products} />
        </div>
      </section>
    </>
  );
}
