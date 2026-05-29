import type { Metadata } from "next";
import { CheckoutClient } from "@/components/CheckoutClient";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Checkout",
  description: "TrophyGains checkout placeholder met Mollie voorbereiding.",
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        title="Cart, payment en delivery voorbereid."
        text="Deze placeholder toont waar Mollie-betalingen, ordermetadata en automatische e-maildelivery gekoppeld worden."
      />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <CheckoutClient />
        </div>
      </section>
    </>
  );
}
