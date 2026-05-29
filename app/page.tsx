import { ArrowRight, BadgeCheck, Dumbbell, Sparkles, Trophy } from "lucide-react";
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

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <HeroSection />

      <MotionSection className="section-padding border-y border-white/10 bg-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div className="premium-card p-6" key={benefit.title}>
              <benefit.icon className="mb-5 h-7 w-7 text-gold" />
              <h2 className="text-xl font-semibold">{benefit.title}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{benefit.text}</p>
            </div>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Featured Products</p>
              <h2 className="section-title">Digitale plannen die hard werken.</h2>
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
