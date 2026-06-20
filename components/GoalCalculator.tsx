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
} from "lucide-react";

type Sex = "male" | "female";
type Build = "slim" | "average" | "muscular" | "higher-fat";

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
};

const activityLevels = [
  { value: 1.2, label: "Weinig actief", text: "Zittend werk, weinig beweging en 0-1 trainingen per week." },
  { value: 1.375, label: "Licht actief", text: "Regelmatig wandelen en 1-3 trainingen per week." },
  { value: 1.55, label: "Actief", text: "Veel dagelijkse beweging en 3-5 trainingen per week." },
  { value: 1.725, label: "Zeer actief", text: "Fysiek werk of 5-7 intensieve trainingen per week." },
];

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
  const [waist, setWaist] = useState("");
  const [activity, setActivity] = useState("1.55");
  const [build, setBuild] = useState<Build>("average");
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [error, setError] = useState("");

  const activityText = useMemo(
    () => activityLevels.find((level) => level.value === Number(activity))?.text,
    [activity],
  );

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const ageValue = Number(age);
    const heightValue = Number(height);
    const weightValue = Number(weight);
    const waistValue = waist ? Number(waist) : undefined;
    const activityValue = Number(activity);

    if (
      ageValue < 18 ||
      ageValue > 80 ||
      heightValue < 130 ||
      heightValue > 230 ||
      weightValue < 35 ||
      weightValue > 300 ||
      (waistValue !== undefined && (waistValue < 40 || waistValue > 200))
    ) {
      setError("Controleer je invoer. Deze tool is bedoeld voor volwassenen van 18 tot 80 jaar.");
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
      "Je metingen wijzen niet duidelijk naar aankomen of afvallen. Blijf rond onderhoud, train progressief en beoordeel je voortgang.";
    let adjustment = "Rond je onderhoud";
    let multiplier = 1;
    let planGoal: CalculatorResult["planGoal"] = "Maintain";

    if (bmi < 18.5) {
      direction = "Rustig aankomen en spieropbouw";
      directionText =
        "Je BMI valt onder het gezonde screeningsbereik. Kies geen calorietekort en bespreek onbedoeld gewichtsverlies met je huisarts of diëtist.";
      adjustment = "Ongeveer 8% boven onderhoud";
      multiplier = 1.08;
      planGoal = "Bulk";
    } else if (bmi >= 30) {
      direction = "Vetverlies met professionele begeleiding";
      directionText =
        "Een rustig calorietekort kan passend zijn. Omdat BMI hoog uitvalt, is begeleiding van een huisarts of diëtist verstandig, zeker bij klachten of medicatie.";
      adjustment = "Ongeveer 15% onder onderhoud";
      multiplier = 0.85;
      planGoal = "Cut";
    } else if (
      (waistRatio !== undefined && waistRatio >= 0.5) ||
      (bmi >= 25 && !(build === "muscular" && waistRatio !== undefined && waistRatio < 0.5)) ||
      build === "higher-fat"
    ) {
      direction = bmi < 25 ? "Droogtrainen" : "Gericht vetverlies";
      directionText =
        "Een bescheiden calorietekort past waarschijnlijk het beste. Combineer dit met krachttraining en voldoende eiwit om spiermassa te behouden.";
      adjustment = bmi < 25 ? "Ongeveer 10% onder onderhoud" : "Ongeveer 15% onder onderhoud";
      multiplier = bmi < 25 ? 0.9 : 0.85;
      planGoal = "Cut";
    } else if (build === "slim" && bmi < 22.5) {
      direction = "Rustige spieropbouw";
      directionText =
        "Je profiel past bij een kleine calorieplus. Houd de gewichtstoename rustig en stuur bij op basis van kracht, taille en weekgemiddelde.";
      adjustment = "Ongeveer 8% boven onderhoud";
      multiplier = 1.08;
      planGoal = "Bulk";
    } else if (build === "muscular" && bmi >= 25) {
      direction = "Onderhoud of rustige spieropbouw";
      directionText =
        "BMI kan bij veel spiermassa te hoog uitvallen. Je taille en trainingsprogressie zijn dan nuttiger; start rond onderhoud en voeg alleen een kleine plus toe als groei stagneert.";
      adjustment = "Onderhoud tot ongeveer 5% erboven";
      multiplier = 1.03;
      planGoal = "Maintain";
    }

    const rawTarget = maintenance * multiplier;
    const targetCalories = Math.max(1200, roundTo50(rawTarget));
    const planCalories = nearestPlan(planGoal, targetCalories);

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
      proteinLow: Math.round(weightValue * 1.6),
      proteinHigh: Math.round(weightValue * 2),
      waistRatio,
      waistLabel: waistRatio !== undefined ? getWaistLabel(waistRatio) : undefined,
      planCalories,
      planGoal,
    });
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
      <form className="premium-card grid gap-6 p-5 sm:p-7" onSubmit={calculate}>
        <div className="border-b border-white/10 pb-5">
          <p className="eyebrow">Jouw gegevens</p>
          <h2 className="mt-2 text-2xl font-black">Bereken je startpunt</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Vul je huidige situatie eerlijk in. Je gegevens blijven op je apparaat en worden niet opgeslagen.
          </p>
        </div>

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
          <label className="grid gap-2 text-sm font-bold text-zinc-200">
            Leeftijd
            <input className="field" inputMode="numeric" max="80" min="18" onChange={(event) => setAge(event.target.value)} required type="number" value={age} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-zinc-200">
            Lengte in cm
            <input className="field" inputMode="numeric" max="230" min="130" onChange={(event) => setHeight(event.target.value)} required type="number" value={height} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-zinc-200">
            Gewicht in kg
            <input className="field" inputMode="decimal" max="300" min="35" onChange={(event) => setWeight(event.target.value)} required step="0.1" type="number" value={weight} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-zinc-200">
            Taille in cm <span className="font-normal text-zinc-500">(optioneel)</span>
            <input className="field" inputMode="decimal" max="200" min="40" onChange={(event) => setWaist(event.target.value)} placeholder="Bijvoorbeeld 84" step="0.1" type="number" value={waist} />
          </label>
        </div>

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
          Welke omschrijving past het beste?
          <select className="field" onChange={(event) => setBuild(event.target.value as Build)} value={build}>
            <option value="slim">Slank, ik wil vooral spiermassa opbouwen</option>
            <option value="average">Gemiddeld, ik wil mijn lichaam verbeteren</option>
            <option value="muscular">Duidelijk gespierd of atletisch gebouwd</option>
            <option value="higher-fat">Ik wil duidelijk lichaamsvet verliezen</option>
          </select>
        </label>

        {error ? <p className="rounded-md border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</p> : null}

        <button className="btn-gold w-full" type="submit">
          Bereken mijn richting <Calculator className="h-4 w-4" />
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
                  <p className="eyebrow">Jouw adviesrichting</p>
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
            </section>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard icon={Activity} label="Geschat onderhoud" value={`${result.maintenance} kcal`} text={`Waarschijnlijke bandbreedte: ${result.maintenanceLow}-${result.maintenanceHigh} kcal.`} />
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
            <h2 className="mt-6 text-3xl font-black">Jouw resultaat verschijnt hier</h2>
            <p className="mt-4 max-w-lg text-base leading-8 text-zinc-400">
              De tool combineert je geschatte energieverbruik met BMI, optionele taillemeting en lichaamsbouw om een
              praktische start richting te geven.
            </p>
            <div className="mt-7 flex items-start gap-3 rounded-md border border-gold/20 bg-gold/5 p-4 text-left">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-soft" />
              <p className="text-sm leading-6 text-zinc-400">
                Geen calculator kan exact bepalen wat je lichaam nodig heeft. Gebruik de uitkomst als startpunt en stuur bij
                op basis van echte voortgang.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
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
