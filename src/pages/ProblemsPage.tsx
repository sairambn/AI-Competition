import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  RefreshCcw,
  Users,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  Lightbulb,
  Loader2,
  Mail,
  Lock,
  ClipboardList,
} from "lucide-react";
import {
  PROBLEMS,
  getProblemForTeam,
  type ProblemStatement,
  type Difficulty,
} from "@/data/problems";
import { cn } from "@/lib/utils";

const ORGANIZER_EMAIL = "sairam@jeppiaarcollege.org";
const TAKEN_KEY = "ai-thon-taken-problems";

type TakenMap = Record<string, { teamName: string; at: string }>;

function loadTaken(): TakenMap {
  try {
    return JSON.parse(localStorage.getItem(TAKEN_KEY) || "{}") as TakenMap;
  } catch {
    return {};
  }
}

function saveTaken(map: TakenMap) {
  localStorage.setItem(TAKEN_KEY, JSON.stringify(map));
}

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

interface Result {
  problem: ProblemStatement;
  teamSize: number;
  difficulty: Difficulty;
  isLargeTeam: boolean;
  teamName: string;
  contactEmail: string;
}

const FILTERS: Array<"all" | Difficulty> = [
  "all",
  "easy",
  "medium",
  "hard",
  "extreme",
];

async function sendAssignmentEmail(data: {
  teamName: string;
  teamSize: number;
  contactEmail: string;
  problemTitle: string;
  problemId: string;
  difficulty: string;
  category: string;
  description: string;
}) {
  const res = await fetch(`https://formsubmit.co/ajax/${ORGANIZER_EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `[Assignment] ${data.teamName} — ${data.problemTitle}`,
      _template: "table",
      _captcha: "false",
      "Team name": data.teamName,
      "Team size": data.teamSize,
      "Contact email": data.contactEmail || "(not provided)",
      Problem: data.problemTitle,
      "Problem ID": data.problemId,
      Difficulty: data.difficulty,
      Category: data.category,
      Description: data.description,
      replyto: data.contactEmail || ORGANIZER_EMAIL,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Could not send email. Try again."
    );
  }
  return res.json();
}

export function ProblemsPage() {
  const [teamSize, setTeamSize] = useState("5");
  const [teamName, setTeamName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<"all" | Difficulty>("all");
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [taken, setTaken] = useState<TakenMap>({});
  const [claimHint, setClaimHint] = useState<string | null>(null);

  useEffect(() => {
    setTaken(loadTaken());
  }, []);

  const takenIds = useMemo(() => new Set(Object.keys(taken)), [taken]);

  /** Sorted list: which team took which problem */
  const assignmentBoard = useMemo(() => {
    return Object.entries(taken)
      .map(([problemId, info]) => {
        const problem = PROBLEMS.find((p) => p.id === problemId);
        return {
          problemId,
          teamName: info.teamName,
          at: info.at,
          title: problem?.title ?? `Problem #${problemId}`,
          difficulty: problem?.difficulty,
          category: problem?.category ?? "",
        };
      })
      .sort((a, b) => a.teamName.localeCompare(b.teamName));
  }, [taken]);

  const ideas =
    filter === "all"
      ? PROBLEMS.filter((p) => p.active)
      : PROBLEMS.filter((p) => p.active && p.difficulty === filter);

  const freeCount = PROBLEMS.filter((p) => p.active && !takenIds.has(p.id)).length;

  function markTaken(problemId: string, team: string) {
    const next: TakenMap = {
      ...loadTaken(),
      [problemId]: { teamName: team, at: new Date().toISOString() },
    };
    saveTaken(next);
    setTaken(next);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setCopied(false);
    setRegistered(false);
    setRegisterError(null);
    setClaimHint(null);

    const name = teamName.trim();
    if (!name) {
      setError("Please enter your team name.");
      return;
    }
    const size = Number(teamSize);
    if (!Number.isInteger(size) || size < 1 || size > 50) {
      setError("Please enter a team size between 1 and 50.");
      return;
    }
    if (!contactEmail.trim() || !contactEmail.includes("@")) {
      setError("A valid contact email is required so we can reach your team.");
      return;
    }

    try {
      const problem = getProblemForTeam(size, takenIds);
      setResult({
        problem,
        teamSize: size,
        difficulty: problem.difficulty,
        isLargeTeam: size >= 9,
        teamName: name,
        contactEmail: contactEmail.trim(),
      });
      setTimeout(() => {
        document.getElementById("assigned-result")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const claimProblem = (problem: ProblemStatement) => {
    setClaimHint(null);
    setError(null);

    if (takenIds.has(problem.id)) {
      setClaimHint(
        `“${problem.title}” is already taken by ${taken[problem.id]?.teamName ?? "another team"}.`
      );
      return;
    }

    const name = teamName.trim();
    const size = Number(teamSize);
    if (!name) {
      setClaimHint("Enter your team name above, then click a problem to claim it.");
      document.getElementById("teamName")?.focus();
      return;
    }
    if (!Number.isInteger(size) || size < 1) {
      setClaimHint("Enter a valid team size, then click a problem.");
      return;
    }
    if (!contactEmail.trim() || !contactEmail.includes("@")) {
      setClaimHint("Enter a contact email, then click a problem to claim it.");
      document.getElementById("contactEmail")?.focus();
      return;
    }

    setResult({
      problem,
      teamSize: size,
      difficulty: problem.difficulty,
      isLargeTeam: size >= 9,
      teamName: name,
      contactEmail: contactEmail.trim(),
    });
    setRegistered(false);
    setRegisterError(null);
    setCopied(false);
    setTimeout(() => {
      document.getElementById("assigned-result")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const copyProblem = async () => {
    if (!result) return;
    const text = [
      `Team: ${result.teamName}`,
      `Problem: ${result.problem.title}`,
      "",
      result.problem.description,
      "",
      `Difficulty: ${formatDifficulty(result.difficulty)}`,
      `Category: ${result.problem.category}`,
      `Team size: ${result.teamSize}`,
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegister = async () => {
    if (!result || registering || registered) return;
    setRegistering(true);
    setRegisterError(null);
    try {
      await sendAssignmentEmail({
        teamName: result.teamName,
        teamSize: result.teamSize,
        contactEmail: result.contactEmail,
        problemTitle: result.problem.title,
        problemId: result.problem.id,
        difficulty: formatDifficulty(result.difficulty),
        category: result.problem.category,
        description: result.problem.description,
      });
      markTaken(result.problem.id, result.teamName);
      setRegistered(true);
    } catch (err) {
      markTaken(result.problem.id, result.teamName);
      setRegistered(true);
      setRegisterError(
        err instanceof Error
          ? `${err.message} Problem is marked Taken on this device — tell the organizer.`
          : "Email failed; problem marked Taken locally."
      );
    } finally {
      setRegistering(false);
    }
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
          Fill team details, then get a free problem — or <strong>click a card</strong> to
          claim it. See which team took which problem below.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {freeCount} free · {takenIds.size} taken
        </p>
      </div>

      {/* Team → Problem board */}
      <section className="mb-10">
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <ClipboardList className="h-5 w-5 text-gold" />
              Team assignments
            </h2>
            <span className="text-xs text-muted-foreground">
              Who took which problem
            </span>
          </div>
          {assignmentBoard.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">
              No teams registered yet. After a team clicks{" "}
              <strong>Register &amp; mark Taken</strong>, they appear here.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-5 py-3 font-semibold">#</th>
                    <th className="px-5 py-3 font-semibold">Team</th>
                    <th className="px-5 py-3 font-semibold">Problem statement</th>
                    <th className="px-5 py-3 font-semibold">Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentBoard.map((row, i) => (
                    <tr
                      key={row.problemId}
                      className="border-b border-border/70 last:border-0"
                    >
                      <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                        {i + 1}
                      </td>
                      <td className="px-5 py-3">
                        <span className="font-semibold text-foreground">
                          {row.teamName}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-foreground">{row.title}</span>
                        {row.category && (
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {row.category}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        {row.difficulty ? (
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                              difficultyClass(row.difficulty)
                            )}
                          >
                            {formatDifficulty(row.difficulty)}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <section className="mb-14">
        <div className="animate-fade-up rounded-xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Users className="h-5 w-5 text-gold" /> Get Your Assigned Problem
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="teamName" className="text-sm font-medium">
                  Team Name *
                </label>
                <input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Code Warriors"
                  required
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="teamSize" className="text-sm font-medium">
                  Team Size *
                </label>
                <input
                  id="teamSize"
                  type="number"
                  min={1}
                  max={50}
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  required
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="contactEmail" className="text-sm font-medium">
                Contact Email *
              </label>
              <input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="team@college.edu"
                required
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
              />
            </div>
            <button
              type="submit"
              className="btn-shine inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 sm:w-auto"
            >
              Get free problem <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>

        {(error || claimHint) && (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error || claimHint}</span>
          </div>
        )}

        {result && (
          <div
            id="assigned-result"
            className="animate-result mt-8 space-y-6 scroll-mt-24"
          >
            <div className="hero-card-glow rounded-xl border border-gold/40 bg-parchment p-6 sm:p-8">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-olive">
                Assigned to {result.teamName}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    difficultyClass(result.difficulty)
                  )}
                >
                  {formatDifficulty(result.difficulty)}
                </span>
                <span className="rounded-full border border-gold/50 px-2.5 py-0.5 text-xs font-medium">
                  {result.teamSize} Members
                </span>
                <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                  {result.problem.category}
                </span>
                {(registered || takenIds.has(result.problem.id)) && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-destructive/20 px-2.5 py-0.5 text-xs font-bold text-destructive">
                    <Lock className="h-3 w-3" /> Taken by {result.teamName}
                  </span>
                )}
              </div>
              <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
                {result.problem.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-foreground">
                {result.problem.description}
              </p>

              {registered ? (
                <div className="mt-6 flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <strong>{result.teamName}</strong> is registered for{" "}
                    <strong>{result.problem.title}</strong>. Shown on the Team
                    assignments board.
                  </span>
                </div>
              ) : (
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => void handleRegister()}
                    disabled={registering}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-60"
                  >
                    {registering ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Claiming…
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4" /> Register &amp; mark Taken
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => void copyProblem()}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-primary" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" /> Copy Problem
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setResult(null);
                      setCopied(false);
                      setRegistered(false);
                      setRegisterError(null);
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary"
                  >
                    <RefreshCcw className="h-4 w-4" /> Pick another
                  </button>
                  <Link
                    to={`/submit?team=${encodeURIComponent(result.teamName)}&problem=${result.problem.id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary"
                  >
                    Go to Submit <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}

              {registerError && (
                <div className="mt-3 flex items-start gap-2 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{registerError}</span>
                </div>
              )}

              {!registered && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Register locks this problem under your team name on the assignments
                  board and emails the organizer.
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Lightbulb className="h-5 w-5 text-gold" /> All Problem Ideas
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
        <p className="mb-4 text-sm text-muted-foreground">
          Click a <strong>free</strong> card to select it. Taken cards show the{" "}
          <strong>team name</strong> that claimed them.
        </p>
        <div className="stagger grid gap-4 sm:grid-cols-2">
          {ideas.map((idea) => {
            const isTaken = takenIds.has(idea.id);
            const claim = taken[idea.id];
            return (
              <article
                key={idea.id}
                role="button"
                tabIndex={isTaken ? -1 : 0}
                onClick={() => claimProblem(idea)}
                onKeyDown={(e) => {
                  if (!isTaken && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    claimProblem(idea);
                  }
                }}
                className={cn(
                  "rounded-xl border p-5 shadow-sm transition",
                  isTaken
                    ? "cursor-not-allowed border-border/60 bg-muted/40 opacity-80"
                    : "card-lift cursor-pointer border-border bg-card hover:border-primary/50"
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      difficultyClass(idea.difficulty)
                    )}
                  >
                    {formatDifficulty(idea.difficulty)}
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                    {idea.min_team_size}–{idea.max_team_size} members
                  </span>
                  {isTaken ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-destructive/20 px-2.5 py-0.5 text-xs font-bold text-destructive">
                      <Lock className="h-3 w-3" /> Taken
                    </span>
                  ) : (
                    <span className="rounded-full bg-easy/20 px-2.5 py-0.5 text-xs font-bold text-easy">
                      Free — click to claim
                    </span>
                  )}
                </div>
                <h3
                  className={cn(
                    "mt-3 text-lg font-semibold",
                    isTaken ? "text-muted-foreground" : "text-foreground"
                  )}
                >
                  {idea.title}
                </h3>
                {isTaken && claim?.teamName && (
                  <p className="mt-2 rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm">
                    <span className="text-xs font-semibold uppercase tracking-wide text-destructive">
                      Claimed by
                    </span>
                    <span className="mt-0.5 block font-bold text-foreground">
                      {claim.teamName}
                    </span>
                  </p>
                )}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {idea.description}
                </p>
                <p className="mt-3 text-xs font-medium text-olive">{idea.category}</p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
