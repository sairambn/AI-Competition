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

export function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Winner banner */}
      <div className="border-b border-primary/25 bg-primary/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <p className="text-sm text-foreground">
            <span className="font-semibold text-primary">Winner · </span>
            Lab Booker Pro — AI/ML Lab Slot Booker
          </p>
          <a
            href="https://lab-booker-pro.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Open winning demo <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-sm font-medium tracking-wide text-primary">
              Dept. of AI & ML · Jeppiaar Engineering College
            </p>
            <h1 className="mt-3 text-4xl leading-[1.1] text-foreground sm:text-5xl lg:text-6xl">
              AI Problem Solve-a-Thon
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A 2-hour department event. Claim a real problem the AI & ML
              department can use — attendance, labs, IATs, notices, mentoring —
              build it, deploy on Vercel, submit the link, present.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/problems"
                className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Get your problem <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/submit"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
              >
                <Rocket className="h-4 w-4 text-gold" /> Submit live link
              </Link>
            </div>

            <dl className="mt-10 grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
              <div className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <div>
                  <dt className="font-medium text-foreground">Date</dt>
                  <dd>Friday, 07 August 2026</dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <div>
                  <dt className="font-medium text-foreground">Time</dt>
                  <dd>10:00 AM – 12:10 PM</dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <div>
                  <dt className="font-medium text-foreground">Venue</dt>
                  <dd>Elite Seminar Hall</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
            <h2 className="text-2xl text-foreground">Run of show</h2>
            <Link
              to="/schedule"
              className="text-sm font-medium text-primary hover:underline"
            >
              Full schedule →
            </Link>
          </div>
          <ol className="grid gap-0 divide-y divide-border border border-border sm:grid-cols-5 sm:divide-x sm:divide-y-0">
            {AGENDA.map((s) => (
              <li key={s.t} className="px-4 py-4 sm:px-3">
                <p className="font-mono text-xs font-semibold text-accent">{s.t}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{s.l}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl text-foreground sm:text-3xl">What happens</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Four steps. No theory track — you leave with a deployed link.
          </p>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                title: "Form a team",
                text: "Any size. Bigger teams get harder, higher-impact problems.",
              },
              {
                n: "02",
                title: "Claim a problem",
                text: "Enter size and contact on the Problems page. One team per problem.",
              },
              {
                n: "03",
                title: "Build & deploy",
                text: "Working demo on a public URL (Vercel preferred) before 11:40.",
              },
              {
                n: "04",
                title: "Submit & present",
                text: "Paste the live link here, then pitch for 2–3 minutes.",
              },
            ].map((item) => (
              <li key={item.n} className="border-l-2 border-primary/40 pl-4">
                <span className="font-mono text-xs font-semibold text-primary">
                  {item.n}
                </span>
                <h3 className="mt-1 text-lg text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 border border-border bg-parchment px-5 py-5">
            <h3 className="text-base font-semibold text-foreground">How we judge</h3>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
              <li>
                <span className="font-medium text-foreground">Clarity</span> — can a
                judge understand the product in under a minute?
              </li>
              <li>
                <span className="font-medium text-foreground">Usefulness</span> — does
                the department actually need this?
              </li>
              <li>
                <span className="font-medium text-foreground">Demo quality</span> — live
                URL works; presentation is tight.
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <Link
              to="/problems"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Open problem generator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl text-foreground sm:text-3xl">
                Example problems
              </h2>
              <p className="mt-2 text-muted-foreground">
                Built for faculty, labs, exam cell, and students — not toy demos.
              </p>
            </div>
            <Link
              to="/problems"
              className="text-sm font-semibold text-primary hover:underline"
            >
              All problems →
            </Link>
          </div>
          <ul className="divide-y divide-border border border-border">
            {featured.map((idea) => (
              <li
                key={idea.id}
                className="flex flex-col gap-2 px-5 py-4 transition-colors hover:bg-secondary/40 sm:flex-row sm:items-start sm:gap-6"
              >
                <div className="flex shrink-0 items-center gap-2 sm:w-28 sm:flex-col sm:items-start sm:gap-1">
                  <span
                    className={cn(
                      "rounded px-2 py-0.5 text-xs font-semibold",
                      difficultyClass(idea.difficulty)
                    )}
                  >
                    {formatDifficulty(idea.difficulty)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {idea.category}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">
                    {idea.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {idea.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
