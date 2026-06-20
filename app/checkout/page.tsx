import type { Metadata } from "next";
import { CheckoutClient } from "@/components/CheckoutClient";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Afrekenen",
  description: "TrophyGains afrekenpagina met voorbereiding voor Mollie.",
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Afrekenen"
        title="Je bestelling veilig en snel afronden."
        text="De betaalomgeving is voorbereid voor Mollie en automatische levering van je digitale producten."
      />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <CheckoutClient />
        </div>
      </section>
    </>
  );
}
