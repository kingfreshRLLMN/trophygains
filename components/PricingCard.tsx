import Link from "next/link";

export function PricingCard({
  title,
  price,
  features,
}: {
  title: string;
  price: string;
  features: string[];
}) {
  return (
    <div className="premium-card p-6">
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-3 text-4xl font-black text-gold-soft">{price}</p>
      <ul className="mt-6 grid gap-3 text-sm text-zinc-300">
        {features.map((feature) => (
          <li key={feature}>✓ {feature}</li>
        ))}
      </ul>
      <Link className="btn-gold mt-7 w-full" href="/custom-coaching">
        Start intake
      </Link>
    </div>
  );
}
