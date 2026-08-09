import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
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
  { t: "10:00", l: "Check-in" },
  { t: "10:30", l: "Problem + register" },
  { t: "10:45", l: "Build" },
  { t: "11:40", l: "Present" },
  { t: "12:00", l: "Winners" },
];

const WINNER_URL = "https://lab-booker-pro.vercel.app/";

export function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Winner — plain text row, not a marketing banner */}
      <p className="mb-10 border-b border-border pb-4 text-sm text-muted-foreground">
        Winner:{" "}
        <a
          href={WINNER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline-offset-2 hover:text-primary hover:underline"
        >
          Lab Booker Pro
        </a>{" "}
        <span className="text-muted-foreground">· AI/ML Lab Slot Booker</span>
      </p>

      <header className="animate-fade-up">
        <p className="text-sm text-muted-foreground">
          Dept. of AI & ML · Jeppiaar Engineering College
        </p>
        <h1 className="mt-3 text-4xl text-foreground sm:text-5xl">
          AI Problem Solve-a-Thon
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Friday, 07 August 2026 · 10:00 AM – 12:10 PM · Elite Seminar Hall.
          Claim a problem the department can use, build a working demo, deploy
          it, submit the link, present for 2–3 minutes.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/problems"
            className="inline-flex items-center rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Get a problem <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            to="/submit"
            className="inline-flex items-center rounded-sm border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Submit live link
          </Link>
        </div>
      </header>

      <section className="mt-16">
        <div className="mb-4 flex items-baseline justify-between gap-2">
          <h2 className="text-xl text-foreground">Schedule</h2>
          <Link to="/schedule" className="text-sm text-primary hover:underline">
            Details
          </Link>
        </div>
        <table className="w-full text-left text-sm">
          <tbody className="divide-y divide-border border-y border-border">
            {AGENDA.map((row) => (
              <tr key={row.t}>
                <td className="w-20 py-2.5 font-mono text-xs text-accent">
                  {row.t}
                </td>
                <td className="py-2.5 text-foreground">{row.l}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-16">
        <h2 className="text-xl text-foreground">How it works</h2>
        <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">1. Team up</span> —
            size sets difficulty (easy → extreme).
          </li>
          <li>
            <span className="font-medium text-foreground">2. Claim</span> — on{" "}
            <Link to="/problems" className="text-primary hover:underline">
              Problems
            </Link>
            , get a free problem and register.
          </li>
          <li>
            <span className="font-medium text-foreground">3. Build</span> — public
            demo URL by 11:40 (Vercel is fine).
          </li>
          <li>
            <span className="font-medium text-foreground">4. Submit & present</span>{" "}
            — paste the link on{" "}
            <Link to="/submit" className="text-primary hover:underline">
              Submit
            </Link>
            , then 2–3 min on stage.
          </li>
        </ol>
        <p className="mt-5 text-sm text-muted-foreground">
          Judging: clarity · usefulness for the department · demo quality.
        </p>
      </section>

      <section className="mt-16">
        <div className="mb-4 flex items-baseline justify-between gap-2">
          <h2 className="text-xl text-foreground">Sample problems</h2>
          <Link to="/problems" className="text-sm text-primary hover:underline">
            All
          </Link>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {featured.map((idea) => (
            <li key={idea.id} className="py-4">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-sm px-1.5 py-0.5 text-[11px] font-medium",
                    difficultyClass(idea.difficulty)
                  )}
                >
                  {formatDifficulty(idea.difficulty)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {idea.category}
                </span>
              </div>
              <p className="mt-1.5 font-medium text-foreground">{idea.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {idea.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-16 text-sm text-muted-foreground">
        Questions for organizers →{" "}
        <Link to="/organizer" className="text-primary hover:underline">
          Organizer page
        </Link>
        . Winning demo:{" "}
        <a
          href={WINNER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline"
        >
          lab-booker-pro.vercel.app
          <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      </p>
    </div>
  );
}
