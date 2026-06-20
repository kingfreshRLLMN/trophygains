"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Calculator,
  Dumbbell,
  HeartPulse,
  Info,
  Ruler,
  Scale,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type Sex = "male" | "female";
type Build = "slim" | "average" | "muscular" | "higher-fat";
type Goal = "lose" | "maintain" | "gain";
type Pace = "slow" | "normal" | "fast";

type CalculatorResult = {
  bmi: number;
  bmiLabel: string;
  bmr: number;
  maintenance: number;
  maintenanceLow: number;
  maintenanceHigh: number;
  targetCalories: number;
  direction: string;
  directionText: string;
  adjustment: string;
  proteinLow: number;
  proteinHigh: number;
  waistRatio?: number;
  waistLabel?: string;
  planCalories: number;
  planGoal: "Cut" | "Maintain" | "Bulk";
  targetWeight: number;
  weeklyChange: number;
  estimatedWeeks?: number;
  warning?: string;
};

const activityLevels = [
  { value: 1.2, label: "Weinig actief", text: "Zittend werk, weinig beweging en 0-1 trainingen per week." },
  { value: 1.375, label: "Licht actief", text: "Regelmatig wandelen en 1-3 trainingen per week." },
  { value: 1.55, label: "Actief", text: "Veel dagelijkse beweging en 3-5 trainingen per week." },
  { value: 1.725, label: "Zeer actief", text: "Fysiek werk of 5-7 intensieve trainingen per week." },
];

const goalOptions = [
  {
    value: "lose" as const,
    label: "Vetverlies",
    text: "Afvallen of droogtrainen met behoud van spiermassa.",
    icon: TrendingDown,
  },
  {
    value: "maintain" as const,
    label: "Onderhoud",
    text: "Gewicht behouden en werken aan recompositie.",
    icon: Scale,
  },
  {
    value: "gain" as const,
    label: "Spieropbouw",
    text: "Rustig aankomen met een gecontroleerde calorieplus.",
    icon: TrendingUp,
  },
];

const paceOptions: Record<Exclude<Goal, "maintain">, Array<{ value: Pace; label: string; percentage: number }>> = {
  lose: [
    { value: "slow", label: "Rustig", percentage: 0.1 },
    { value: "normal", label: "Gebalanceerd", percentage: 0.15 },
    { value: "fast", label: "Stevig", percentage: 0.2 },
  ],
  gain: [
    { value: "slow", label: "Rustig", percentage: 0.04 },
    { value: "normal", label: "Gebalanceerd", percentage: 0.07 },
    { value: "fast", label: "Stevig", percentage: 0.1 },
  ],
};

const planOptions = {
  Cut: [1500, 1800, 2000, 2200, 2500, 2700],
  Maintain: [1800, 2000, 2200, 2500, 2800, 3000, 3200],
  Bulk: [2500, 2800, 3000, 3200, 3500],
};

function roundTo50(value: number) {
  return Math.round(value / 50) * 50;
}

function nearestPlan(goal: keyof typeof planOptions, calories: number) {
  return planOptions[goal].reduce((closest, option) =>
    Math.abs(option - calories) < Math.abs(closest - calories) ? option : closest,
  );
}

function getBmiLabel(bmi: number) {
  if (bmi < 18.5) return "Ondergewicht";
  if (bmi < 25) return "Gezond bereik";
  if (bmi < 30) return "Verhoogd bereik";
  return "Hoog bereik";
}

function getWaistLabel(ratio: number) {
  if (ratio < 0.4) return "Laag";
  if (ratio < 0.5) return "Gezond bereik";
  if (ratio < 0.6) return "Verhoogd";
  return "Sterk verhoogd";
}

export function GoalCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("180");
  const [weight, setWeight] = useState("80");
  const [targetWeight, setTargetWeight] = useState("75");
  const [waist, setWaist] = useState("");
  const [activity, setActivity] = useState("1.55");
  const [build, setBuild] = useState<Build>("average");
  const [goal, setGoal] = useState<Goal>("lose");
  const [pace, setPace] = useState<Pace>("normal");
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [error, setError] = useState("");

  const activityText = useMemo(
    () => activityLevels.find((level) => level.value === Number(activity))?.text,
    [activity],
  );

  function chooseGoal(nextGoal: Goal) {
    setGoal(nextGoal);
    setResult(null);
    setError("");

    const currentWeight = Number(weight);
    if (!Number.isFinite(currentWeight)) return;
    if (nextGoal === "lose") setTargetWeight(String(Math.max(35, Math.round(currentWeight * 0.9))));
    if (nextGoal === "maintain") setTargetWeight(String(currentWeight));
    if (nextGoal === "gain") setTargetWeight(String(Math.min(300, Math.round(currentWeight * 1.05))));
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const ageValue = Number(age);
    const heightValue = Number(height);
    const weightValue = Number(weight);
    const targetWeightValue = Number(targetWeight);
    const waistValue = waist ? Number(waist) : undefined;
    const activityValue = Number(activity);

    if (
      ageValue < 18 ||
      ageValue > 80 ||
      heightValue < 130 ||
      heightValue > 230 ||
      weightValue < 35 ||
      weightValue > 300 ||
      targetWeightValue < 35 ||
      targetWeightValue > 300 ||
      (waistValue !== undefined && (waistValue < 40 || waistValue > 200))
    ) {
      setError("Controleer je invoer. Deze tool is bedoeld voor volwassenen van 18 tot 80 jaar.");
      setResult(null);
      return;
    }

    if (goal === "lose" && targetWeightValue >= weightValue) {
      setError("Kies voor vetverlies een doelgewicht dat lager is dan je huidige gewicht.");
      setResult(null);
      return;
    }

    if (goal === "gain" && targetWeightValue <= weightValue) {
      setError("Kies voor spieropbouw een doelgewicht dat hoger is dan je huidige gewicht.");
      setResult(null);
      return;
    }

    const heightM = heightValue / 100;
    const bmi = weightValue / heightM ** 2;
    const waistRatio = waistValue ? waistValue / heightValue : undefined;
    const sexOffset = sex === "male" ? 5 : -161;
    const bmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue + sexOffset;
    const maintenance = bmr * activityValue;

    let direction = "Onderhoud en recompositie";
    let directionText =
      "Je gekozen doel is je huidige gewicht behouden. Start rond onderhoud en beoordeel je taille, kracht en lichaamssamenstelling.";
    let adjustment = "Rond je onderhoud";
    let multiplier = 1;
    let planGoal: CalculatorResult["planGoal"] = "Maintain";
    let warning: string | undefined;

    if (goal === "lose") {
      const deficit = paceOptions.lose.find((option) => option.value === pace)?.percentage ?? 0.15;
      multiplier = 1 - deficit;
      planGoal = "Cut";
      direction = build === "muscular" || (waistRatio !== undefined && waistRatio < 0.5) ? "Droogtrainen" : "Gericht vetverlies";
      directionText =
        "Je hebt gekozen voor gewichtsverlies. Het calorieadvies gebruikt een doelafhankelijk tekort en houdt rekening met je activiteit, gewicht en gekozen tempo.";
      adjustment = `${Math.round(deficit * 100)}% onder onderhoud`;

      if (bmi < 18.5) {
        warning =
          "Je BMI valt onder het gezonde screeningsbereik. Een calorietekort is mogelijk niet passend; bespreek dit eerst met een arts of diëtist.";
      }
    } else if (goal === "gain") {
      const surplus = paceOptions.gain.find((option) => option.value === pace)?.percentage ?? 0.07;
      multiplier = 1 + surplus;
      planGoal = "Bulk";
      direction = "Gerichte spieropbouw";
      directionText =
        "Je hebt gekozen voor aankomen en spieropbouw. Het calorieadvies gebruikt een gecontroleerde plus boven je geschatte onderhoud.";
      adjustment = `${Math.round(surplus * 100)}% boven onderhoud`;

      if (bmi >= 30 || (waistRatio !== undefined && waistRatio >= 0.6)) {
        warning =
          "Je metingen wijzen op een hoger gezondheidsrisico. Spieropbouw is mogelijk, maar starten rond onderhoud en professioneel advies kan verstandiger zijn dan een calorieoverschot.";
      }
    } else {
      if (Math.abs(targetWeightValue - weightValue) > 2) {
        warning =
          "Je koos Onderhoud, maar je doelgewicht wijkt meer dan 2 kg af. Voor duidelijk afvallen of aankomen past een ander doel beter.";
      }
    }

    const minimumCalories = sex === "male" ? 1500 : 1200;
    const targetCalories = Math.max(minimumCalories, roundTo50(maintenance * multiplier));
    const dailyDifference = Math.abs(targetCalories - maintenance);
    const weeklyChange = goal === "maintain" ? 0 : (dailyDifference * 7) / 7700;
    const weightDifference = Math.abs(targetWeightValue - weightValue);
    const estimatedWeeks = weeklyChange > 0 ? Math.ceil(weightDifference / weeklyChange) : undefined;
    const planCalories = nearestPlan(planGoal, targetCalories);
    const proteinMultiplier = goal === "lose" ? [1.8, 2.2] : [1.6, 2];

    setError("");
    setResult({
      bmi,
      bmiLabel: getBmiLabel(bmi),
      bmr: roundTo50(bmr),
      maintenance: roundTo50(maintenance),
      maintenanceLow: roundTo50(maintenance * 0.9),
      maintenanceHigh: roundTo50(maintenance * 1.1),
      targetCalories,
      direction,
      directionText,
      adjustment,
      proteinLow: Math.round(weightValue * proteinMultiplier[0]),
      proteinHigh: Math.round(weightValue * proteinMultiplier[1]),
      waistRatio,
      waistLabel: waistRatio !== undefined ? getWaistLabel(waistRatio) : undefined,
      planCalories,
      planGoal,
      targetWeight: targetWeightValue,
      weeklyChange,
      estimatedWeeks,
      warning,
    });
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
      <form className="premium-card grid gap-6 p-5 sm:p-7" onSubmit={calculate}>
        <div className="border-b border-white/10 pb-5">
          <p className="eyebrow">Jouw doel en gegevens</p>
          <h2 className="mt-2 text-2xl font-black">Bereken een gericht startpunt</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Kies eerst wat je wilt bereiken. Je gegevens blijven op je apparaat en worden niet opgeslagen.
          </p>
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-bold text-zinc-200">Wat wil je bereiken?</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {goalOptions.map((option) => (
              <button
                aria-pressed={goal === option.value}
                className={`grid min-h-32 gap-3 rounded-md border p-4 text-left transition ${
                  goal === option.value
                    ? "border-gold-soft/80 bg-gold/15 shadow-[0_0_28px_rgba(200,166,75,0.14)]"
                    : "border-white/10 bg-black/30 hover:border-gold/50"
                }`}
                key={option.value}
                onClick={() => chooseGoal(option.value)}
                type="button"
              >
                <option.icon className="h-5 w-5 text-gold-soft" />
                <span className="font-black">{option.label}</span>
                <span className="text-xs leading-5 text-zinc-400">{option.text}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-bold text-zinc-200">Biologisch geslacht voor de energieformule</legend>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["male", "Man"],
              ["female", "Vrouw"],
            ].map(([value, label]) => (
              <button
                aria-pressed={sex === value}
                className={sex === value ? "btn-gold" : "btn-secondary"}
                key={value}
                onClick={() => setSex(value as Sex)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField label="Leeftijd" max={80} min={18} onChange={setAge} value={age} />
          <NumberField label="Lengte in cm" max={230} min={130} onChange={setHeight} value={height} />
          <NumberField label="Huidig gewicht in kg" max={300} min={35} onChange={setWeight} step="0.1" value={weight} />
          <NumberField
            label={goal === "maintain" ? "Gewicht dat je wilt behouden" : "Gewenst gewicht in kg"}
            max={300}
            min={35}
            onChange={setTargetWeight}
            step="0.1"
            value={targetWeight}
          />
          <label className="grid gap-2 text-sm font-bold text-zinc-200 sm:col-span-2">
            Taille in cm <span className="font-normal text-zinc-500">(optioneel, geeft extra context)</span>
            <input className="field" inputMode="decimal" max="200" min="40" onChange={(event) => setWaist(event.target.value)} placeholder="Bijvoorbeeld 84" step="0.1" type="number" value={waist} />
          </label>
        </div>

        {goal !== "maintain" ? (
          <fieldset>
            <legend className="mb-3 text-sm font-bold text-zinc-200">
              Gewenst tempo
            </legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {paceOptions[goal].map((option) => (
                <button
                  aria-pressed={pace === option.value}
                  className={pace === option.value ? "btn-gold" : "btn-secondary"}
                  key={option.value}
                  onClick={() => setPace(option.value)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        <label className="grid gap-2 text-sm font-bold text-zinc-200">
          Dagelijkse activiteit
          <select className="field" onChange={(event) => setActivity(event.target.value)} value={activity}>
            {activityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          <span className="font-normal leading-6 text-zinc-500">{activityText}</span>
        </label>

        <label className="grid gap-2 text-sm font-bold text-zinc-200">
          Welke lichaamsbouw past het beste?
          <select className="field" onChange={(event) => setBuild(event.target.value as Build)} value={build}>
            <option value="slim">Slank gebouwd</option>
            <option value="average">Gemiddelde lichaamsbouw</option>
            <option value="muscular">Duidelijk gespierd of atletisch gebouwd</option>
            <option value="higher-fat">Relatief hoog vetpercentage</option>
          </select>
        </label>

        {error ? <p className="rounded-md border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</p> : null}

        <button className="btn-gold w-full" type="submit">
          Bereken mijn doelplan <Calculator className="h-4 w-4" />
        </button>

        <p className="text-xs leading-5 text-zinc-500">
          Niet gebruiken bij zwangerschap, een eetstoornis, ernstige ziekte of wanneer je jonger bent dan 18 jaar. Neem dan
          contact op met een arts of diëtist.
        </p>
      </form>

      <div className="grid gap-5">
        {result ? (
          <>
            <section className="premium-card gold-border shine-card overflow-hidden p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-start">
                <div>
                  <p className="eyebrow">Jouw gekozen richting</p>
                  <h2 className="mt-3 text-3xl font-black sm:text-4xl">{result.direction}</h2>
                </div>
                <span className="gold-surface inline-flex self-start rounded-md px-4 py-2 text-sm font-black text-black">
                  {result.targetCalories} kcal
                </span>
              </div>
              <p className="mt-6 text-base leading-8 text-zinc-300">{result.directionText}</p>
              <div className="mt-6 rounded-md border border-gold/25 bg-gold/5 p-4">
                <div className="text-sm font-black text-gold-soft">{result.adjustment}</div>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Start rond {result.targetCalories} kcal per dag en beoordeel na 2-3 weken je weekgemiddelde, taille,
                  trainingsprestaties en herstel.
                </p>
              </div>
              {result.warning ? (
                <div className="mt-4 flex gap-3 rounded-md border border-amber-300/30 bg-amber-300/10 p-4">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-soft" />
                  <p className="text-sm leading-6 text-zinc-300">{result.warning}</p>
                </div>
              ) : null}
            </section>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard icon={Activity} label="Geschat onderhoud" value={`${result.maintenance} kcal`} text={`Waarschijnlijke bandbreedte: ${result.maintenanceLow}-${result.maintenanceHigh} kcal.`} />
              <ResultCard icon={Target} label="Doelgewicht" value={`${result.targetWeight} kg`} text={result.estimatedWeeks ? `Geschatte looptijd: ongeveer ${result.estimatedWeeks} weken.` : "Gericht op behoud van je huidige gewicht."} />
              <ResultCard icon={TrendingUp} label="Geschat tempo" value={result.weeklyChange > 0 ? `${result.weeklyChange.toFixed(2)} kg per week` : "Stabiel"} text="Een theoretische schatting; echte voortgang verloopt nooit volledig lineair." />
              <ResultCard icon={HeartPulse} label="Rustverbranding" value={`${result.bmr} kcal`} text="Geschatte energiebehoefte in volledige rust." />
              <ResultCard icon={Scale} label="BMI-screening" value={result.bmi.toFixed(1)} text={`${result.bmiLabel}. BMI is geen meting van vetpercentage.`} />
              <ResultCard icon={Dumbbell} label="Eiwitrichtlijn" value={`${result.proteinLow}-${result.proteinHigh} g`} text="Dagelijkse richtlijn voor een gezonde, sportende volwassene." />
              {result.waistRatio !== undefined ? (
                <ResultCard icon={Ruler} label="Taille-lengteverhouding" value={result.waistRatio.toFixed(2)} text={`${result.waistLabel}. Probeer je taille onder de helft van je lengte te houden.`} />
              ) : null}
              <ResultCard icon={Target} label="Dichtstbijzijnde schema" value={`${result.planCalories} kcal`} text="De dichtstbijzijnde beschikbare optie; pas porties aan wanneer nodig." />
            </div>

            <div className="premium-card grid gap-5 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="eyebrow">Volgende stap</p>
                <h3 className="mt-2 text-xl font-black">Bekijk een passend voedingsschema</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Kies {result.planGoal === "Cut" ? "Vetverlies" : result.planGoal === "Bulk" ? "Spieropbouw" : "Onderhoud"} en
                  vervolgens ongeveer {result.planCalories} kcal.
                </p>
              </div>
              <Link className="btn-gold whitespace-nowrap" href="/nutrition-plans">
                Bekijk schema&apos;s <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        ) : (
          <section className="premium-card flex min-h-[34rem] flex-col items-center justify-center p-8 text-center">
            <span className="gold-surface flex h-16 w-16 items-center justify-center rounded-md text-black">
              <Calculator className="h-7 w-7" />
            </span>
            <h2 className="mt-6 text-3xl font-black">Jouw doelplan verschijnt hier</h2>
            <p className="mt-4 max-w-lg text-base leading-8 text-zinc-400">
              Kies je doel, gewenst gewicht en tempo. De calculator gebruikt die keuze om een apart calorieadvies en een
              geschatte looptijd te maken.
            </p>
            <div className="mt-7 flex items-start gap-3 rounded-md border border-gold/20 bg-gold/5 p-4 text-left">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-soft" />
              <p className="text-sm leading-6 text-zinc-400">
                BMI en taille bepalen niet langer automatisch je doel. Ze geven alleen extra context en mogelijke
                waarschuwingen.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
  step?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-zinc-200">
      {label}
      <input
        className="field"
        inputMode={step ? "decimal" : "numeric"}
        max={max}
        min={min}
        onChange={(event) => onChange(event.target.value)}
        required
        step={step}
        type="number"
        value={value}
      />
    </label>
  );
}

function ResultCard({
  icon: Icon,
  label,
  value,
  text,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  text: string;
}) {
  return (
    <div className="premium-card p-5">
      <Icon className="h-5 w-5 text-gold-soft" />
      <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
    </div>
  );
}
