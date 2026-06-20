import Link from "next/link";
import { ArrowRight, BadgeCheck, ClipboardCheck, MessageCircle, Target } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";

const supportPoints = [
  {
    icon: Target,
    title: "Plan op maat",
    text: "Training en voeding afgestemd op jouw doel, ritme en niveau.",
  },
  {
    icon: ClipboardCheck,
    title: "Heldere structuur",
    text: "Geen losse tips, maar een systeem dat je precies kunt volgen.",
  },
  {
    icon: MessageCircle,
    title: "Hulp bij alles",
    text: "Vragen, aanpassingen en begeleiding wanneer je vastloopt.",
  },
];

export function CTASection() {
  return (
    <MotionSection className="section-padding border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-lg border border-gold/40 bg-[linear-gradient(135deg,rgba(239,211,130,0.18),rgba(255,255,255,0.045)_42%,rgba(0,0,0,0.55)_100%)] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.38)] md:p-12">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-36 w-80 bg-gradient-to-r from-gold/10 to-transparent blur-2xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <p className="eyebrow">Persoonlijke coaching</p>
              <h2 className="section-title mt-4">Alles wat je nodig hebt in een plan dat bij jou past.</h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300">
                Start met persoonlijke begeleiding voor training, voeding, progressie en vragen onderweg. Jij hoeft niet te
                gokken; je krijgt een duidelijke route.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link className="btn-gold pressable" href="/custom-coaching">
                  Start jouw plan <ArrowRight className="h-4 w-4" />
                </Link>
                <Link className="btn-secondary pressable" href="/contact">
                  Stel je vraag
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              {supportPoints.map((point) => (
                <div
                  className="grid grid-cols-[auto_1fr] gap-4 rounded-md border border-white/10 bg-black/45 p-4 backdrop-blur transition hover:border-gold-soft/60 hover:bg-gold/10"
                  key={point.title}
                >
                  <span className="gold-surface flex h-11 w-11 items-center justify-center rounded-md text-black">
                    <point.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="flex items-center gap-2 text-base font-black text-white">
                      {point.title}
                      <BadgeCheck className="h-4 w-4 text-gold-soft" />
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-zinc-400">{point.text}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
