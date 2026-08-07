import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, RefreshCcw, Users, AlertCircle, CheckCircle2, Copy, Check,
  Lightbulb, Loader2, Mail, MessageCircle,
} from "lucide-react";
import {
  PROBLEMS, getProblemForTeam, type ProblemStatement, type Difficulty,
} from "@/data/problems";
import { cn } from "@/lib/utils";

/**
 * Organizer contacts — edit these two lines if needed.
 * WhatsApp: country code + number, digits only (e.g. 919876543210).
 * Leave WHATSAPP_NUMBER empty to open the share picker instead of a fixed chat.
 */
const ORGANIZER_EMAIL = "sairam@jeppiaarcollege.org";
const WHATSAPP_NUMBER = ""; // e.g. "919876543210"

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
  teamName: string;
  contactEmail: string;
}

const FILTERS: Array<"all" | Difficulty> = ["all", "easy", "medium", "hard", "extreme"];

function buildSummary(data: {
  teamName: string;
  teamSize: number;
  contactEmail: string;
  problemTitle: string;
  problemId: string;
  difficulty: string;
  category: string;
  description: string;
}) {
  return [
    "AI Problem Solve-a-Thon — Team Registration",
    "",
    `Team: ${data.teamName}`,
    `Size: ${data.teamSize}`,
    `Contact: ${data.contactEmail}`,
    `Problem: ${data.problemTitle} (ID ${data.problemId})`,
    `Difficulty: ${data.difficulty}`,
    `Category: ${data.category}`,
    "",
    data.description,
  ].join("\n");
}

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
      "Contact email": data.contactEmail,
      Problem: data.problemTitle,
      "Problem ID": data.problemId,
      Difficulty: data.difficulty,
      Category: data.category,
      Description: data.description,
      _replyto: data.contactEmail,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Email could not be sent."
    );
  }
  return res.json();
}

function openWhatsApp(text: string) {
  const encoded = encodeURIComponent(text);
  const url = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
    : `https://wa.me/?text=${encoded}`;
  window.open(url, "_blank", "noopener,noreferrer");
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
  const [emailOk, setEmailOk] = useState(false);

  const ideas =
    filter === "all"
      ? PROBLEMS.filter((p) => p.active)
      : PROBLEMS.filter((p) => p.active && p.difficulty === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setCopied(false);
    setRegistered(false);
    setRegisterError(null);
    setEmailOk(false);

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
      setError("A valid contact email is required.");
      return;
    }

    try {
      const problem = getProblemForTeam(size);
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

  const payloadFromResult = (r: Result) => ({
    teamName: r.teamName,
    teamSize: r.teamSize,
    contactEmail: r.contactEmail,
    problemTitle: r.problem.title,
    problemId: r.problem.id,
    difficulty: formatDifficulty(r.difficulty),
    category: r.problem.category,
    description: r.problem.description,
  });

  const copyProblem = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(buildSummary(payloadFromResult(result)));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegister = async () => {
    if (!result || registering || registered) return;
    setRegistering(true);
    setRegisterError(null);
    setEmailOk(false);

    const data = payloadFromResult(result);
    const summary = buildSummary(data);

    openWhatsApp(summary);

    try {
      await sendAssignmentEmail(data);
      setEmailOk(true);
    } catch {
      setEmailOk(false);
      setRegisterError(
        "WhatsApp opened. Email may need activation — use Copy and send manually if needed."
      );
    }

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      /* ignore */
    }

    setRegistered(true);
    setRegistering(false);
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
          Enter team details, get a problem, then register in one tap.
        </p>
      </div>

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
                <label htmlFor="teamName" className="text-sm font-medium">Team Name *</label>
                <input id="teamName" value={teamName} onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Code Warriors" required
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
              </div>
              <div className="space-y-2">
                <label htmlFor="teamSize" className="text-sm font-medium">Team Size *</label>
                <input id="teamSize" type="number" min={1} max={50} value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)} required
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="contactEmail" className="text-sm font-medium">Contact Email *</label>
              <input id="contactEmail" type="email" value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="team@college.edu" required
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
            </div>
            <button type="submit"
              className="btn-shine inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 sm:w-auto">
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
            <div className="hero-card-glow rounded-xl border border-border bg-parchment p-6 sm:p-8">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-olive">
                Assigned to {result.teamName}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", difficultyClass(result.difficulty))}>
                  {formatDifficulty(result.difficulty)}
                </span>
                <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium">
                  {result.teamSize} members
                </span>
                <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                  {result.problem.category}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">{result.problem.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground">{result.problem.description}</p>

              {registered ? (
                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Registration sent</p>
                      <ul className="mt-1 space-y-0.5 text-muted-foreground">
                        <li>• WhatsApp message opened — send it to the organizer</li>
                        <li>• Email: {emailOk ? "delivered to organizer" : "may need inbox activation — summary also copied"}</li>
                        <li>• Summary copied to clipboard</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/submit?team=${encodeURIComponent(result.teamName)}&problem=${result.problem.id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      Next: Submit solution <ArrowRight className="h-4 w-4" />
                    </Link>
                    <button type="button" onClick={copyProblem}
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary">
                      {copied ? <><Check className="h-4 w-4 text-primary" /> Copied</> : <><Copy className="h-4 w-4" /> Copy again</>}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button type="button" onClick={handleRegister} disabled={registering}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-60">
                      {registering ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                      ) : (
                        <><MessageCircle className="h-4 w-4" /> Register (WhatsApp + Email)</>
                      )}
                    </button>
                    <button type="button" onClick={copyProblem}
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary">
                      {copied ? <><Check className="h-4 w-4 text-primary" /> Copied</> : <><Copy className="h-4 w-4" /> Copy details</>}
                    </button>
                    <button type="button" onClick={() => { setResult(null); setCopied(false); setRegistered(false); setRegisterError(null); setEmailOk(false); }}
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary">
                      <RefreshCcw className="h-4 w-4" /> Generate Another
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    One tap opens WhatsApp with your details, emails the organizer, and copies a backup.
                  </p>
                </>
              )}

              {registerError && (
                <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{registerError}</span>
                </div>
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
              <button key={f} type="button" onClick={() => setFilter(f)}
                className={cn("rounded-full px-3 py-1 text-xs font-semibold transition",
                  filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80")}>
                {f === "all" ? "All" : formatDifficulty(f)}
              </button>
            ))}
          </div>
        </div>
        <div className="stagger grid gap-4 sm:grid-cols-2">
          {ideas.map((idea) => (
            <article key={idea.id} className="card-lift rounded-xl border border-border bg-card p-5 shadow-sm">
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
    </div>
  );
}
