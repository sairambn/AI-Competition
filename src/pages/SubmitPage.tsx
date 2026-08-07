import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Globe,
  Lightbulb,
  Loader2,
  Mail,
  Rocket,
  Users,
} from "lucide-react";
import { PROBLEMS } from "@/data/problems";
import { cn } from "@/lib/utils";

/** Organizer receives every submission by email (FormSubmit → inbox). */
const ORGANIZER_EMAIL = "sairam@jeppiaarcollege.org";

function normalizeUrl(raw: string) {
  const t = raw.trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

function isValidUrl(url: string) {
  try {
    const u = new URL(normalizeUrl(url));
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

type Entry = {
  teamName: string;
  contactEmail: string;
  problemId: string;
  problemTitle: string;
  vercelUrl: string;
  repoUrl: string;
  notes: string;
  teamSize: string;
  submittedAt: string;
  emailed: boolean;
};

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition ring-ring placeholder:text-muted-foreground/60 focus:ring-2";

export function SubmitPage() {
  const [searchParams] = useSearchParams();
  const [teamName, setTeamName] = useState(searchParams.get("team") ?? "");
  const [problemId, setProblemId] = useState(searchParams.get("problem") ?? "");
  const [contactEmail, setContactEmail] = useState("");
  const [vercelUrl, setVercelUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [entry, setEntry] = useState<Entry | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const selected = PROBLEMS.find((p) => p.id === problemId);
  const livePreview = useMemo(() => {
    const n = normalizeUrl(vercelUrl);
    return isValidUrl(n) ? n : null;
  }, [vercelUrl]);

  const filledCount = [
    teamName.trim(),
    contactEmail.trim(),
    problemId,
    vercelUrl.trim(),
  ].filter(Boolean).length;

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!teamName.trim()) errs.teamName = "Team name is required";
    if (!contactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
      errs.contactEmail = "Enter a valid email";
    }
    if (!problemId || !selected) errs.problemId = "Select your problem";
    const live = normalizeUrl(vercelUrl);
    if (!live || !isValidUrl(live)) errs.vercelUrl = "Enter a public https URL";
    if (repoUrl.trim() && !isValidUrl(repoUrl)) errs.repoUrl = "Invalid repo URL";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!validate() || !selected) return;

    const payload: Entry = {
      teamName: teamName.trim(),
      contactEmail: contactEmail.trim(),
      problemId,
      problemTitle: selected.title,
      vercelUrl: normalizeUrl(vercelUrl),
      repoUrl: repoUrl.trim() ? normalizeUrl(repoUrl) : "",
      notes: notes.trim(),
      teamSize: teamSize.trim(),
      submittedAt: new Date().toISOString(),
      emailed: false,
    };

    setSending(true);
    let emailed = false;
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${ORGANIZER_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `[AI-Thon Solution] ${payload.teamName} — ${payload.problemTitle}`,
          _template: "table",
          _captcha: "false",
          Team: payload.teamName,
          "Team size": payload.teamSize || "—",
          Contact: payload.contactEmail,
          Problem: payload.problemTitle,
          "Vercel / live URL": payload.vercelUrl,
          "GitHub repo": payload.repoUrl || "—",
          Notes: payload.notes || "—",
          Submitted: new Date(payload.submittedAt).toLocaleString(),
          _replyto: payload.contactEmail,
        }),
      });
      emailed = res.ok;
      if (!res.ok) {
        setError(
          "Email service did not confirm. Your data is still saved below — use Open in Gmail."
        );
      }
    } catch {
      setError(
        "Could not reach email service. Your data is saved below — use Open in Gmail."
      );
    }

    payload.emailed = emailed;
    try {
      const existing = JSON.parse(
        localStorage.getItem("ai-thon-submissions") || "[]"
      ) as Entry[];
      existing.push(payload);
      localStorage.setItem("ai-thon-submissions", JSON.stringify(existing));
    } catch {
      /* ignore */
    }

    setEntry(payload);
    setSending(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const summaryText = entry
    ? `AI Problem Solve-a-Thon — Solution\n\nTeam: ${entry.teamName}\nTeam size: ${entry.teamSize || "—"}\nContact: ${entry.contactEmail}\nProblem: ${entry.problemTitle}\nVercel: ${entry.vercelUrl}\nRepo: ${entry.repoUrl || "—"}\nNotes: ${entry.notes || "—"}\nSubmitted: ${new Date(entry.submittedAt).toLocaleString()}`
    : "";

  const gmailUrl = entry
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        ORGANIZER_EMAIL
      )}&su=${encodeURIComponent(
        `[AI-Thon Solution] ${entry.teamName} — ${entry.problemTitle}`
      )}&body=${encodeURIComponent(summaryText)}`
    : "#";

  const copySummary = async () => {
    if (!summaryText) return;
    await navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (entry) {
    const rows: { label: string; value: React.ReactNode }[] = [
      { label: "Team name", value: entry.teamName },
      { label: "Team size", value: entry.teamSize || "—" },
      { label: "Contact email", value: entry.contactEmail },
      { label: "Problem", value: entry.problemTitle },
      {
        label: "Vercel / live URL",
        value: (
          <a
            href={entry.vercelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 break-all font-medium text-primary hover:underline"
          >
            <Globe className="h-3.5 w-3.5 shrink-0" />
            {entry.vercelUrl}
          </a>
        ),
      },
      {
        label: "GitHub repo",
        value: entry.repoUrl ? (
          <a
            href={entry.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-primary hover:underline"
          >
            {entry.repoUrl}
          </a>
        ) : (
          "—"
        ),
      },
      { label: "Notes", value: entry.notes || "—" },
      {
        label: "Submitted at",
        value: new Date(entry.submittedAt).toLocaleString(),
      },
    ];

    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-result hero-card-glow rounded-2xl border border-primary/40 bg-card p-6 sm:p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              {entry.emailed ? "Submission sent" : "Submission saved"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {entry.emailed
                ? "Organizer was emailed. Confirm every field below."
                : "Saved on this device. Use Open in Gmail so the organizer gets your details."}
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Entered data
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                  entry.emailed
                    ? "bg-easy text-easy-foreground"
                    : "bg-hard text-hard-foreground"
                )}
              >
                {entry.emailed ? "Emailed" : "Local only"}
              </span>
            </div>
            <dl className="divide-y divide-border">
              {rows.map((r) => (
                <div
                  key={r.label}
                  className="grid gap-1 px-4 py-3 sm:grid-cols-[140px_1fr] sm:gap-4"
                >
                  <dt className="text-xs font-medium text-muted-foreground">{r.label}</dt>
                  <dd className="text-sm text-foreground">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => void copySummary()}
              className="btn-shine inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy all data"}
            </button>
            <a
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-secondary"
            >
              <Mail className="h-4 w-4" /> Open in Gmail
            </a>
            <a
              href={entry.vercelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-secondary"
            >
              Open live demo <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { n: "1", t: "Keep demo open" },
              { n: "2", t: "Present 2–3 min" },
              { n: "3", t: "Answer judges" },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-lg border border-border bg-secondary/30 px-3 py-2 text-center text-xs text-muted-foreground"
              >
                <span className="font-bold text-primary">{s.n}</span> · {s.t}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-4 text-sm">
            <button
              type="button"
              onClick={() => {
                setEntry(null);
                setError(null);
                setFieldErrors({});
                setVercelUrl("");
                setNotes("");
                setRepoUrl("");
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              Submit another team
            </button>
            <Link to="/submissions" className="text-primary hover:underline">
              Entries info →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 animate-fade-up text-center">
        <span className="mb-3 inline-flex rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground">
          Solution Submission
        </span>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Submit your Vercel link
        </h1>
        <p className="mt-2 text-muted-foreground">
          Public deployment URL + team details. Sent to organizer · shown back to you · optional Gmail backup.
        </p>
      </div>

      <div className="mb-6 flex items-center justify-center gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 w-10 rounded-full transition-colors",
              filledCount >= i ? "bg-primary" : "bg-border"
            )}
          />
        ))}
        <span className="ml-2 text-xs text-muted-foreground">{filledCount}/4 required</span>
      </div>

      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="animate-fade-up space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm delay-100"
        noValidate
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="teamName" className="flex items-center gap-1.5 text-sm font-medium">
              <Users className="h-3.5 w-3.5 text-gold" /> Team Name *
            </label>
            <input
              id="teamName"
              autoComplete="organization"
              value={teamName}
              onChange={(e) => {
                setTeamName(e.target.value);
                setFieldErrors((f) => ({ ...f, teamName: "" }));
              }}
              placeholder="Code Warriors"
              className={cn(inputClass, fieldErrors.teamName && "border-destructive ring-destructive/30")}
            />
            {fieldErrors.teamName && (
              <p className="text-xs text-destructive">{fieldErrors.teamName}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="teamSize" className="text-sm font-medium">Team size</label>
            <input
              id="teamSize"
              type="number"
              min={1}
              max={20}
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              placeholder="4"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contactEmail" className="flex items-center gap-1.5 text-sm font-medium">
            <Mail className="h-3.5 w-3.5 text-gold" /> Contact email *
          </label>
          <input
            id="contactEmail"
            type="email"
            autoComplete="email"
            value={contactEmail}
            onChange={(e) => {
              setContactEmail(e.target.value);
              setFieldErrors((f) => ({ ...f, contactEmail: "" }));
            }}
            placeholder="team@college.edu"
            className={cn(inputClass, fieldErrors.contactEmail && "border-destructive")}
          />
          {fieldErrors.contactEmail && (
            <p className="text-xs text-destructive">{fieldErrors.contactEmail}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="problemId" className="flex items-center gap-1.5 text-sm font-medium">
            <Lightbulb className="h-3.5 w-3.5 text-gold" /> Problem solved *
          </label>
          <select
            id="problemId"
            value={problemId}
            onChange={(e) => {
              setProblemId(e.target.value);
              setFieldErrors((f) => ({ ...f, problemId: "" }));
            }}
            className={cn(inputClass, fieldErrors.problemId && "border-destructive")}
          >
            <option value="">Select problem…</option>
            {PROBLEMS.filter((p) => p.active).map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.difficulty})
              </option>
            ))}
          </select>
          {fieldErrors.problemId && (
            <p className="text-xs text-destructive">{fieldErrors.problemId}</p>
          )}
          {selected && (
            <p className="mt-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">{selected.title}</span>
              {" — "}
              {selected.description.slice(0, 160)}
              {selected.description.length > 160 ? "…" : ""}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="vercelUrl" className="flex items-center gap-1.5 text-sm font-medium">
            <Rocket className="h-3.5 w-3.5 text-gold" /> Vercel / live URL *
          </label>
          <input
            id="vercelUrl"
            type="url"
            inputMode="url"
            value={vercelUrl}
            onChange={(e) => {
              setVercelUrl(e.target.value);
              setFieldErrors((f) => ({ ...f, vercelUrl: "" }));
            }}
            onBlur={() => {
              if (vercelUrl.trim() && !vercelUrl.includes("://")) {
                setVercelUrl(normalizeUrl(vercelUrl));
              }
            }}
            placeholder="https://your-project.vercel.app"
            className={cn(inputClass, fieldErrors.vercelUrl && "border-destructive")}
          />
          {fieldErrors.vercelUrl ? (
            <p className="text-xs text-destructive">{fieldErrors.vercelUrl}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Public link only. <code className="text-[10px]">https://</code> added automatically if missing.
            </p>
          )}
          {livePreview && (
            <a
              href={livePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              <Globe className="h-3 w-3" /> Preview live site
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="repoUrl" className="text-sm font-medium">GitHub / code repo (optional)</label>
          <input
            id="repoUrl"
            type="url"
            value={repoUrl}
            onChange={(e) => {
              setRepoUrl(e.target.value);
              setFieldErrors((f) => ({ ...f, repoUrl: "" }));
            }}
            placeholder="https://github.com/…"
            className={cn(inputClass, fieldErrors.repoUrl && "border-destructive")}
          />
          {fieldErrors.repoUrl && (
            <p className="text-xs text-destructive">{fieldErrors.repoUrl}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="notes" className="text-sm font-medium">Notes for judges (optional)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Demo login, tech stack, anything judges should know…"
            className={cn(inputClass, "resize-y")}
          />
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={sending}
            className="btn-shine inline-flex min-w-[160px] items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4" /> Submit solution
              </>
            )}
          </button>
          <Link to="/problems" className="text-sm text-muted-foreground hover:text-foreground">
            Need a problem first?
          </Link>
        </div>
      </form>

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        {[
          { t: "Email to organizer", d: "Table format in inbox" },
          { t: "Shown on screen", d: "Verify every field" },
          { t: "Gmail backup", d: "One-click compose" },
        ].map((x) => (
          <div key={x.t} className="rounded-xl border border-border bg-parchment px-4 py-3 text-center">
            <p className="text-xs font-semibold text-foreground">{x.t}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{x.d}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Optional: also push code under{" "}
        <code className="text-[10px]">solutions/Your-Team/</code> via Pull Request — see README.
      </p>
    </div>
  );
}
