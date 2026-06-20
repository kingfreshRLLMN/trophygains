import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Ebooks",
  description: "Downloadbare TrophyGains ebooks en gidsen voor training, voeding en discipline.",
};

export default function EbooksPage() {
  const products = getProductsByCategory("ebook");

  return (
    <>
      <PageHeader
        eyebrow="Ebooks"
        title="Digitale kennisproducten die je steeds opnieuw gebruikt."
        text="Downloadbare ebooks en gidsen voor betere keuzes in de gym, keuken en planning."
      />
      <section className="section-padding">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </>
  );
}
