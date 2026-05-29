import { MotionSection } from "@/components/MotionSection";

export function PageHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <MotionSection className="border-b border-white/10 bg-zinc-950 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="section-title mt-4">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">{text}</p>
      </div>
    </MotionSection>
  );
}
