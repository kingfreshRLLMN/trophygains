import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";

export function CTASection() {
  return (
    <MotionSection className="section-padding border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-lg border border-gold/40 bg-[linear-gradient(135deg,rgba(183,154,87,0.18),rgba(255,255,255,0.04))] p-8 md:p-12">
          <p className="eyebrow">Ready for the next level</p>
          <h2 className="section-title mt-4">Laat je plan voelen als een premium systeem.</h2>
          <p className="mt-6 max-w-2xl text-zinc-300">
            Kies een digitaal product of start met custom coaching als je volledige begeleiding wilt.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="btn-primary" href="/nutrition-plans">
              Nutrition plans <ArrowRight className="h-4 w-4" />
            </Link>
            <Link className="btn-secondary" href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
