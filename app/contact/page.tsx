import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met TrophyGains.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Vragen over producten, coaching of je bestelling?"
        text="Stuur een bericht. De formulieractie is voorbereid als placeholder voor een latere backend of e-mailservice."
      />
      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-6">
          <form className="premium-card grid gap-5 p-6">
            <input className="field" name="name" placeholder="Naam" />
            <input className="field" name="email" placeholder="E-mail" type="email" />
            <input className="field" name="subject" placeholder="Onderwerp" />
            <textarea className="field min-h-40" name="message" placeholder="Bericht" />
            <button className="btn-gold" type="button">
              Verstuur bericht placeholder
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
