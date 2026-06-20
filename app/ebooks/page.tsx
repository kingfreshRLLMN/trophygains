import type { Metadata } from "next";
import { EbookFilters } from "@/components/EbookFilters";
import { PageHeader } from "@/components/PageHeader";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Digitale bibliotheek",
  description: "Betaalbare TrophyGains gidsen, ebooks, checklists en planners voor training, voeding, mindset en herstel.",
};

export default function EbooksPage() {
  const products = getProductsByCategory("ebook");

  return (
    <>
      <PageHeader
        eyebrow="Digitale bibliotheek"
        title="Kleine downloads. Direct bruikbare kennis."
        text="Gidsen, ebooks, checklists en planners voor €1 tot €4. Kies alleen het onderwerp dat je nu nodig hebt en download direct."
      />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <EbookFilters products={products} />
        </div>
      </section>
    </>
  );
}
