import { useState } from "react";
import {
  ArrowRight, RefreshCcw, Users, AlertCircle, CheckCircle2, Copy, Check, Lightbulb,
} from "lucide-react";
import {
  PROBLEMS, getProblemForTeam, type ProblemStatement, type Difficulty,
} from "@/data/problems";
import { cn } from "@/lib/utils";

function formatDifficulty(value: Difficulty) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function difficultyClass(value: Difficulty) {
  switch (value) {
    case "easy": return "bg-easy text-easy-foreground";
    case "medium": return "bg-medium text-medium-foreground";
    case "hard": return "bg-hard text-hard-foreground";
    case "extreme": return "bg-extreme text-extreme-foreground";
  }
}

interface Result {
  problem: ProblemStatement;
  teamSize: number;
  difficulty: Difficulty;
  isLargeTeam: boolean;
  teamName?: string;
}

const FILTERS: Array<"all" | Difficulty> = ["all", "easy", "medium", "hard", "extreme"];

export function ProblemsPage() {
  const [teamSize, setTeamSize] = useState("5");
  const [teamName, setTeamName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<"all" | Difficulty>("all");

  const ideas =
    filter === "all"
      ? PROBLEMS.filter((p) => p.active)
      : PROBLEMS.filter((p) => p.active && p.difficulty === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setCopied(false);
    const size = Number(teamSize);
    if (!Number.isInteger(size) || size < 1 || size > 50) {
      setError("Please enter a team size between 1 and 50.");
      return;
    }
    if (size >= 9 && !contactEmail.trim()) {
      setError("Contact email is required for teams of 9 or more members.");
      return;
    }
    try {
      const problem = getProblemForTeam(size);
      setResult({
        problem,
        teamSize: size,
        difficulty: problem.difficulty,
        isLargeTeam: size >= 9,
        teamName: teamName.trim() || undefined,
      });
      setTimeout(() => {
        document.getElementById("assigned-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const copyProblem = async () => {
    if (!result) return;
    const text = `${result.problem.title}\n\n${result.problem.description}\n\nDifficulty: ${formatDifficulty(result.difficulty)}\nCategory: ${result.problem.category}\nTeam size: ${result.teamSize}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 animate-fade-up text-center">
        <span className="mb-3 inline-flex rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground">
          Problem Ideas
        </span>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Problem Statement Generator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse all ideas below, then enter your team size to get an assigned problem.
        </p>
      </div>

      <section className="mb-14">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Lightbulb className="h-5 w-5 text-gold" />
            All Problem Ideas
          </h2>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold transition",
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {f === "all" ? "All" : formatDifficulty(f)}
              </button>
            ))}
          </div>
        </div>
        <div className="stagger grid gap-4 sm:grid-cols-2">
          {ideas.map((idea) => (
            <article
              key={idea.id}
              className="card-lift rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", difficultyClass(idea.difficulty))}>
                  {formatDifficulty(idea.difficulty)}
                </span>
                <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                  {idea.min_team_size}–{idea.max_team_size} members
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-foreground">{idea.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{idea.description}</p>
              <p className="mt-3 text-xs font-medium text-olive">{idea.category}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-foreground">Get Your Assigned Problem</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter team size — a matching idea is assigned from that difficulty band.
          </p>
        </div>
        <div className="animate-fade-up delay-200 rounded-xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Users className="h-5 w-5 text-gold" /> Team Details
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="teamSize" className="text-sm font-medium text-foreground">Team Size</label>
                <input
                  id="teamSize"
                  type="number"
                  min={1}
                  max={50}
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  required
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring transition focus:ring-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="teamName" className="text-sm font-medium text-foreground">Team Name</label>
                <input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g., Code Warriors"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring transition focus:ring-2"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="contactEmail" className="text-sm font-medium text-foreground">Contact Email</label>
              <input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="team@example.com (required for 9+ teams)"
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring transition focus:ring-2"
              />
            </div>
            <button
              type="submit"
              className="btn-shine inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 sm:w-auto"
            >
              Get Problem Statement <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div id="assigned-result" className="animate-result mt-8 space-y-6 scroll-mt-24">
            <div className="hero-card-glow rounded-xl border border-gold/40 bg-parchment p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", difficultyClass(result.difficulty))}>
                  {formatDifficulty(result.difficulty)}
                </span>
                <span className="rounded-full border border-gold/50 px-2.5 py-0.5 text-xs font-medium">
                  {result.teamSize} Members
                </span>
                {result.teamName && (
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                    {result.teamName}
                  </span>
                )}
              </div>
              <h2 className="mt-4 text-2xl font-bold text-foreground">{result.problem.title}</h2>
              <p className="mt-3 leading-relaxed text-foreground">{result.problem.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium">{result.problem.category}</span>
                <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium">
                  {result.problem.min_team_size}–{result.problem.max_team_size} members
                </span>
              </div>
              {result.isLargeTeam && (
                <div className="mt-4 flex items-start gap-2 rounded-lg bg-primary/10 px-4 py-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Your team of {result.teamSize} has been noted and assigned this problem.</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <button type="button" onClick={copyProblem} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition hover:bg-secondary">
                {copied ? <><Check className="h-4 w-4 text-primary" /> Copied</> : <><Copy className="h-4 w-4" /> Copy Problem</>}
              </button>
              <button type="button" onClick={() => { setResult(null); setCopied(false); }} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition hover:bg-secondary">
                <RefreshCcw className="h-4 w-4" /> Generate Another
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
