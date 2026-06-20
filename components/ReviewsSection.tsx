"use client";

import { motion } from "framer-motion";
import { MapPin, Quote, Sparkles, Star } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";

const reviews = [
  {
    name: "Daan V.",
    city: "Rotterdam",
    quote: "Eindelijk een plan dat niet voelt als losse tips. Mijn trainingen, voeding en progressie zijn nu gewoon duidelijk.",
    goal: "Spieropbouw",
  },
  {
    name: "Sanne K.",
    city: "Utrecht",
    quote: "De structuur maakte het verschil. Ik wist elke week wat ik moest doen en kon mijn cut veel beter volhouden.",
    goal: "Cut",
  },
  {
    name: "Milan R.",
    city: "Amsterdam",
    quote: "Premium uitstraling, maar vooral praktisch. Geen onnodige ruis, gewoon schema's die goed te volgen zijn.",
    goal: "Hypertrofie",
  },
  {
    name: "Noa B.",
    city: "Eindhoven",
    quote: "De coaching voelde persoonlijk. Mijn vragen werden meegenomen en het plan paste echt bij mijn dagen.",
    goal: "Coaching",
  },
  {
    name: "Jesse M.",
    city: "Breda",
    quote: "Voor het eerst had ik overzicht in mijn voeding. De calorie-opties maken het makkelijk om consistent te blijven.",
    goal: "Voeding",
  },
  {
    name: "Lina S.",
    city: "Den Haag",
    quote: "Alles voelt strak en professioneel. Ik had meteen het idee dat ik met een serieus systeem begon.",
    goal: "Leefstijl",
  },
];

const marqueeReviews = [...reviews, ...reviews];

function Stars() {
  return (
    <div className="flex gap-1 text-gold-soft">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star className="h-4 w-4 fill-current" key={index} />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <MotionSection className="section-padding overflow-hidden border-y border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-gold-soft">
              <Sparkles className="h-4 w-4" />
              Ervaringen
            </div>
            <h2 className="section-title">Gebouwd voor sporters die serieus willen doorpakken.</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-zinc-300 md:justify-self-end">
            Ervaringen van sporters die meer structuur wilden in training, voeding en coaching. Strak, duidelijk en zonder
            onnodige ruis.
          </p>
        </div>

        <div className="relative">
          <motion.div
            className="flex w-max gap-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          >
            {marqueeReviews.map((review, index) => (
              <figure
                className="premium-card shine-card flex min-h-72 w-[20rem] flex-col justify-between p-6 sm:w-[24rem]"
                key={`${review.name}-${index}`}
              >
                <div>
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <Stars />
                    <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-gold-soft">
                      {review.goal}
                    </span>
                  </div>
                  <Quote className="mb-4 h-7 w-7 text-gold/70" />
                  <blockquote className="text-lg font-semibold leading-8 text-white">{review.quote}</blockquote>
                </div>
                <figcaption className="mt-7 border-t border-white/10 pt-5">
                  <div className="text-base font-black">{review.name}</div>
                  <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-zinc-400">
                    <MapPin className="h-4 w-4 text-gold-soft" />
                    {review.city}, Nederland
                  </div>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </div>
    </MotionSection>
  );
}
