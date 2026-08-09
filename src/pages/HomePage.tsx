import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Rocket,
  ExternalLink,
} from "lucide-react";
import { PROBLEMS, type Difficulty } from "@/data/problems";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

function formatDifficulty(value: Difficulty) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function difficultyClass(value: Difficulty) {
  switch (value) {
    case "easy":
      return "bg-easy text-easy-foreground";
    case "medium":
      return "bg-medium text-medium-foreground";
    case "hard":
      return "bg-hard text-hard-foreground";
    case "extreme":
      return "bg-extreme text-extreme-foreground";
  }
}

const featured = [
  PROBLEMS.find((p) => p.id === "1")!,
  PROBLEMS.find((p) => p.id === "5")!,
  PROBLEMS.find((p) => p.id === "8")!,
  PROBLEMS.find((p) => p.id === "11")!,
];

const AGENDA = [
  { t: "10:00", l: "Check-in", d: "Teams arrive, seats, Wi-Fi" },
  { t: "10:30", l: "Problem + register", d: "Claim a problem on this site" },
  { t: "10:45", l: "Build", d: "Ship a working demo" },
  { t: "11:40", l: "Present", d: "2–3 minutes per team" },
  { t: "12:00", l: "Winners", d: "Results & close" },
];

const WINNER_URL = "https://lab-booker-pro.vercel.app/";

export function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Winner strip */}
      <div className="border-b border-white/10 bg-white/[0.03]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-3.5 lg:px-8">
          <p className="text-sm text-[#f5f5f7]">
            <span className="font-semibold text-primary">Winner. </span>
            Lab Booker Pro — AI/ML Lab Slot Booker
          </p>
          <a
            href={WINNER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Open demo <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>

      {/* Hero — Apple product-page scale */}
      <section className="hero-glow relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 pb-24 pt-20 text-center lg:px-8 lg:pb-32 lg:pt-28">
          <div className="animate-hero">
            <p className="text-sm font-medium tracking-wide text-primary">
              Dept. of AI & ML · Jeppiaar Engineering College
            </p>
            <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-[#f5f5f7] sm:text-6xl lg:text-7xl">
              AI Problem Solve-a-Thon
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#86868b] sm:text-xl">
              Two hours. One real department problem. Build it, deploy it,
              present it.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/problems"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-medium text-white hover:opacity-90"
              >
                Get your problem
              </Link>
              <Link
                to="/submit"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-medium text-[#f5f5f7] backdrop-blur hover:bg-white/10"
              >
                <Rocket className="h-4 w-4" /> Submit live link
              </Link>
            </div>

            <dl className="mx-auto mt-16 grid max-w-2xl gap-8 text-sm text-[#86868b] sm:grid-cols-3">
              <div className="flex flex-col items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#f5f5f7]/" />
                <dt className="font-medium text-[#f5f5f7]">Date</dt>
                <dd>07 August 2026</dd>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#f5f5f7]/" />
                <dt className="font-medium text-[#f5f5f7]">Time</dt>
                <dd>10:00 – 12:10</dd>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#f5f5f7]/" />
                <dt className="font-medium text-[#f5f5f7]">Venue</dt>
                <dd>Elite Seminar Hall</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="border-y border-white/10 bg-[#0c0c0e]">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8 lg:py-24">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-3xl font-semibold tracking-tight text-[#f5f5f7] sm:text-4xl">
                Run of show
              </h2>
              <Link
                to="/schedule"
                className="text-sm font-medium text-primary hover:underline"
              >
                Full schedule →
              </Link>
            </div>
          </Reveal>
          <ol className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-5">
            {AGENDA.map((s, i) => (
              <Reveal key={s.t} delay={i * 60} as="li">
                <div className="h-full bg-[#0c0c0e] px-5 py-6 sm:px-4">
                  <p className="font-mono text-xs font-medium text-primary">
                    {s.t}
                  </p>
                  <p className="mt-2 text-base font-semibold text-[#f5f5f7]">
                    {s.l}
                  </p>
                  <p className="mt-1 text-sm text-[#86868b]">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-[#f5f5f7] sm:text-4xl">
              What happens
            </h2>
            <p className="mt-3 max-w-xl text-lg text-[#86868b]">
              Four steps. You leave with a deployed link.
            </p>
          </Reveal>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                title: "Form a team",
                text: "Any size. Bigger teams get harder, higher-impact problems.",
              },
              {
                n: "02",
                title: "Claim a problem",
                text: "Enter size and contact. One team per problem.",
              },
              {
                n: "03",
                title: "Build & deploy",
                text: "Working demo on a public URL before 11:40.",
              },
              {
                n: "04",
                title: "Submit & present",
                text: "Paste the live link, then pitch for 2–3 minutes.",
              },
            ].map((item, i) => (
              <Reveal key={item.n} delay={i * 80} as="li">
                <span className="text-sm font-medium text-primary">{item.n}</span>
                <h3 className="mt-2 text-xl font-semibold text-[#f5f5f7]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#86868b]">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120}>
            <div className="mt-20 rounded-2xl bg-white/[0.04] px-8 py-8">
              <h3 className="text-lg font-semibold text-[#f5f5f7]">
                How we judge
              </h3>
              <ul className="mt-5 grid gap-6 text-[15px] text-[#86868b] sm:grid-cols-3">
                <li>
                  <span className="block font-medium text-[#f5f5f7]">
                    Clarity
                  </span>
                  Understood in under a minute.
                </li>
                <li>
                  <span className="block font-medium text-[#f5f5f7]">
                    Usefulness
                  </span>
                  The department actually needs it.
                </li>
                <li>
                  <span className="block font-medium text-[#f5f5f7]">
                    Demo quality
                  </span>
                  Live URL works. Pitch is tight.
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-12 text-center sm:text-left">
              <Link
                to="/problems"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-white hover:opacity-90"
              >
                Open problem generator <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problems list */}
      <section className="border-t border-white/10 bg-[#0c0c0e] px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-[#f5f5f7] sm:text-4xl">
                  Example problems
                </h2>
                <p className="mt-3 text-lg text-[#86868b]">
                  For faculty, labs, and students — not toy demos.
                </p>
              </div>
              <Link
                to="/problems"
                className="text-sm font-medium text-primary hover:underline"
              >
                All problems →
              </Link>
            </div>
          </Reveal>
          <ul className="divide-y divide-white/10">
            {featured.map((idea, i) => (
              <Reveal key={idea.id} delay={i * 70} as="li">
                <div className="flex flex-col gap-3 py-7 transition-colors sm:flex-row sm:items-start sm:gap-8">
                  <div className="flex shrink-0 items-center gap-2 sm:w-28 sm:flex-col sm:items-start sm:gap-1.5">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        difficultyClass(idea.difficulty)
                      )}
                    >
                      {formatDifficulty(idea.difficulty)}
                    </span>
                    <span className="text-xs text-[#86868b]">{idea.category}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-[#f5f5f7]">
                      {idea.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-[#86868b] line-clamp-2">
                      {idea.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
