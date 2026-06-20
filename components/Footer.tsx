import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="text-xl font-black">TrophyGains</div>
          <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400">
            Premium digitale fitnessproducten voor sporters die hun training, voeding en discipline serieus nemen.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-gold-soft">Aanbod</h3>
          <div className="mt-4 grid gap-3 text-sm text-zinc-400">
            <Link href="/workout-plans">Trainingsschema&apos;s</Link>
            <Link href="/nutrition-plans">Voedingsschema&apos;s</Link>
            <Link href="/doelcalculator">Doelcalculator</Link>
            <Link href="/ebooks">Ebooks</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gold-soft">TrophyGains</h3>
          <div className="mt-4 grid gap-3 text-sm text-zinc-400">
            <Link href="/custom-coaching">Persoonlijke coaching</Link>
            <Link href="/about">Over ons</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-zinc-500">
        © 2026 TrophyGains. Digitale producten en coaching.
      </div>
    </footer>
  );
}
