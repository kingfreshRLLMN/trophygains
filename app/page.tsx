import {
  ArrowRight,
  BadgeCheck,
  Dumbbell,
  Flame,
  Trophy,
  Utensils,
} from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { MotionSection } from "@/components/MotionSection";
import { ReviewsSection } from "@/components/ReviewsSection";

const benefits = [
  {
    icon: Trophy,
    title: "Elite structuur",
    text: "Heldere schema's, progressieblokken en meetpunten zodat je precies weet wat je moet doen.",
  },
  {
    icon: Dumbbell,
    title: "Gebouwd voor resultaat",
    text: "Programma's voor spieropbouw, vetverlies en performance met praktische uitvoerbaarheid.",
  },
  {
    icon: BadgeCheck,
    title: "Direct digitaal",
    text: "Na checkout voorbereid voor automatische levering met downloadlinks en e-mailflows.",
  },
];

const categories = [
  {
    icon: Dumbbell,
    href: "/workout-plans",
    title: "Workout Plans",
    text: "Filter op 2, 3, 4, 5 of 6 trainingsdagen en kies direct jouw schema.",
  },
  {
    icon: Utensils,
    href: "/nutrition-plans",
    title: "Nutrition Plans",
    text: "Cut, maintain en bulk schema's met calorie-opties van 1500 tot 3500 kcal.",
  },
  {
    icon: Flame,
    href: "/custom-coaching",
    title: "Custom Coaching",
    text: "Voor sporters die persoonlijke sturing, check-ins en maatwerk willen.",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      <MotionSection className="section-padding border-y border-white/10 bg-zinc-950/80">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Shop per doel</p>
              <h2 className="section-title">Alles staat klaar om direct te starten.</h2>
            </div>
            <a className="text-link" href="/checkout">
              Naar checkout <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {categories.map((category, index) => (
              <a
                className="premium-card shine-card pressable group p-6 transition hover:-translate-y-1 hover:border-gold-soft/60"
                href={category.href}
                key={category.title}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <category.icon className="mb-7 h-8 w-8 text-gold-soft" />
                <h2 className="text-2xl font-black">{category.title}</h2>
                <p className="mt-4 min-h-20 text-sm leading-7 text-zinc-400">{category.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-gold-soft">
                  Bekijk aanbod <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-padding">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div className="premium-card shine-card p-6" key={benefit.title}>
              <benefit.icon className="mb-5 h-7 w-7 text-gold" />
              <h2 className="text-xl font-semibold">{benefit.title}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{benefit.text}</p>
            </div>
          ))}
        </div>
      </MotionSection>

      <ReviewsSection />

      <CTASection />
    </>
  );
}
