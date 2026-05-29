import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  Download,
  Dumbbell,
  Flame,
  Sparkles,
  Target,
  Trophy,
  Utensils,
} from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { MotionSection } from "@/components/MotionSection";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

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

const reviews = [
  "Sterke opbouw, premium uitstraling en vooral duidelijk. Geen ruis.",
  "Mijn cut is eindelijk gestructureerd. Training en voeding sluiten goed aan.",
  "De coaching-intake voelt persoonlijk en professioneel.",
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

const steps = [
  {
    icon: Target,
    title: "Kies je doel",
    text: "Ga voor cut, maintain, bulk, kracht of physique. De homepage leidt je direct naar de juiste route.",
  },
  {
    icon: CalendarDays,
    title: "Match je week",
    text: "Filter op trainingsdagen of calorieen en kies een plan dat realistisch past bij jouw leven.",
  },
  {
    icon: Download,
    title: "Start direct",
    text: "Digitale downloads en e-maildelivery zijn voorbereid voor een snelle checkout-flow.",
  },
];

const commandStats = [
  ["Workout split", "4-Day Hypertrophy", "border-gold/40"],
  ["Nutrition target", "2500 kcal Maintain", "border-white/10"],
  ["Delivery", "PDF + email ready", "border-white/10"],
];

export default function Home() {
  const featuredProducts = getFeaturedProducts();

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
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="eyebrow">Trophy system</p>
            <h2 className="section-title mt-4">Van keuze naar actie in drie stappen.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
              De site voelt meer als een premium fitness dashboard: snel kiezen, makkelijk vergelijken en meteen starten.
            </p>
          </div>
          <div className="grid gap-4">
            {steps.map((step, index) => (
              <div className="premium-card shine-card grid gap-5 p-5 sm:grid-cols-[auto_1fr]" key={step.title}>
                <div className="gold-surface flex h-14 w-14 items-center justify-center rounded-md text-black">
                  <step.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-gold-soft">0{index + 1}</span>
                    <h3 className="text-xl font-black">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-zinc-400">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-padding border-y border-white/10 bg-black/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="premium-card gold-border shine-card p-6 md:p-8">
            <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-6">
              <div>
                <p className="eyebrow">Command center</p>
                <h2 className="mt-3 text-3xl font-black md:text-5xl">Jouw plan in beeld.</h2>
              </div>
              <BarChart3 className="h-10 w-10 text-gold-soft" />
            </div>
            <div className="mt-6 grid gap-4">
              {commandStats.map(([label, value, border]) => (
                <div className={`rounded-md border ${border} bg-white/[0.035] p-4`} key={label}>
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">{label}</div>
                  <div className="mt-2 text-xl font-black text-white">{value}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#fff1a8,#c8a64b,#8f6d24)]" />
            </div>
            <div className="mt-3 flex justify-between text-xs font-bold uppercase tracking-wide text-zinc-500">
              <span>Intake</span>
              <span>Plan</span>
              <span>Progressie</span>
            </div>
          </div>
          <div>
            <p className="eyebrow">Waarom dit beter werkt</p>
            <h2 className="section-title mt-4">Rustige luxe, duidelijke keuzes.</h2>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
              Geen drukke webshop. TrophyGains stuurt bezoekers naar het juiste product: training, voeding, ebook of persoonlijke coaching.
            </p>
            <a className="btn-gold mt-8" href="/workout-plans">
              Bekijk workout plans <ArrowRight className="h-4 w-4" />
            </a>
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

      <MotionSection className="section-padding bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Featured Products</p>
              <h2 className="section-title">Populaire digitale producten.</h2>
            </div>
            <a className="text-link" href="/workout-plans">
              Bekijk alle producten <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-padding bg-white text-black">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-[#a48645]" />
            <div>
              <p className="eyebrow text-zinc-600">Reviews</p>
              <h2 className="section-title text-black">Social proof placeholder</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((review, index) => (
              <figure className="rounded-lg border border-black/10 bg-zinc-50 p-6" key={review}>
                <blockquote className="text-lg leading-8">{review}</blockquote>
                <figcaption className="mt-6 text-sm font-semibold text-zinc-600">
                  TrophyGains member #{index + 1}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </MotionSection>

      <CTASection />
    </>
  );
}
