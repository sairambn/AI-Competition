import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Check,
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

/** Organizer receives every submission by email (FormSubmit → inbox). */
const ORGANIZER_EMAIL = "bnsairam14@gmail.com";

function isValidUrl(url: string) {
  try {
    const u = new URL(url.trim());
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
};

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
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const selected = PROBLEMS.find((p) => p.id === problemId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!teamName.trim()) {
      setError("Team name is required.");
      return;
    }
    if (!contactEmail.trim() || !contactEmail.includes("@")) {
      setError("A valid contact email is required.");
      return;
    }
    if (!problemId || !selected) {
      setError("Please select the problem you solved.");
      return;
    }
    if (!vercelUrl.trim() || !isValidUrl(vercelUrl)) {
      setError("Please enter a valid public URL (https://…).",);
      return;
    }
    if (repoUrl.trim() && !isValidUrl(repoUrl)) {
      setError("GitHub / repo URL looks invalid.");
      return;
    }

    const payload: Entry = {
      teamName: teamName.trim(),
      contactEmail: contactEmail.trim(),
      problemId,
      problemTitle: selected.title,
      vercelUrl: vercelUrl.trim(),
      repoUrl: repoUrl.trim(),
      notes: notes.trim(),
      teamSize: teamSize.trim(),
      submittedAt: new Date().toISOString(),
    };

    setSending(true);
    try {
      // Send to organizer email via FormSubmit (free, no backend)
      const res = await fetch(`https://formsubmit.co/ajax/${ORGANIZER_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `[AI-Thon Solution] ${payload.teamName} — ${payload.problemTitle}`,
          _template: "table",
          Team: payload.teamName,
          "Team size": payload.teamSize || "—",
          Contact: payload.contactEmail,
          Problem: payload.problemTitle,
          "Vercel / live URL": payload.vercelUrl,
          "GitHub repo": payload.repoUrl || "—",
          Notes: payload.notes || "—",
          Submitted: new Date(payload.submittedAt).toLocaleString(),
        }),
      });

      if (!res.ok) {
        throw new Error("Could not send submission. Try again or use Copy + Gmail.");
      }

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
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Network error — use Copy summary and email organizers."
      );
    } finally {
      setSending(false);
    }
  }

  const summaryText = entry
    ? `AI Problem Solve-a-Thon — Solution

Team: ${entry.teamName}
Team size: ${entry.teamSize || "—"}
Contact: ${entry.contactEmail}
Problem: ${entry.problemTitle}
Vercel: ${entry.vercelUrl}
Repo: ${entry.repoUrl || "—"}
Notes: ${entry.notes || "—"}
Submitted: ${new Date(entry.submittedAt).toLocaleString()}`
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

  // ── Success: show ALL entered data ──────────────────────────────────────
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
            className="inline-flex items-center gap-1 break-all font-medium text-primary hover:underline"
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
        <div className="animate-fade-up rounded-2xl border border-primary/30 bg-card p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Submission sent
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your details were emailed to the organizer. Review everything
              below — this is exactly what was submitted.
            </p>
          </div>

          {/* Full entered data */}
          <div className="mt-8 overflow-hidden rounded-xl border border-border">
            <div className="border-b border-border bg-secondary/50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Entered data
            </div>
            <dl className="divide-y divide-border">
              {rows.map((r) => (
                <div
                  key={r.label}
                  className="grid gap-1 px-4 py-3 sm:grid-cols-[140px_1fr] sm:gap-4"
                >
                  <dt className="text-xs font-medium text-muted-foreground">
                    {r.label}
                  </dt>
                  <dd className="text-sm text-foreground">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => void copySummary()}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
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
            <button
              type="button"
              onClick={() => {
                setEntry(null);
                setVercelUrl("");
                setNotes("");
                setRepoUrl("");
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary"
            >
              Submit another
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Present your live demo in the presentation slot (2–3 min). Organizers
            can also find this in their email inbox.
          </p>
        </div>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 animate-fade-up text-center">
        <span className="mb-3 inline-flex rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground">
          Solution Submission
        </span>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Submit your Vercel link
        </h1>
        <p className="mt-2 text-muted-foreground">
          Enter your team details and public deployment URL. Data is sent to the
          organizer and shown back to you after submit.
        </p>
      </div>

      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium">
              <Users className="h-3.5 w-3.5 text-gold" /> Team Name *
            </label>
            <input
              required
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Code Warriors"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Team size</label>
            <input
              type="number"
              min={1}
              max={20}
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              placeholder="4"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-sm font-medium">
            <Mail className="h-3.5 w-3.5 text-gold" /> Contact email *
          </label>
          <input
            required
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="team@college.edu"
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
          />
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-sm font-medium">
            <Lightbulb className="h-3.5 w-3.5 text-gold" /> Problem solved *
          </label>
          <select
            required
            value={problemId}
            onChange={(e) => setProblemId(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
          >
            <option value="">Select problem…</option>
            {PROBLEMS.filter((p) => p.active).map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.difficulty})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-sm font-medium">
            <Rocket className="h-3.5 w-3.5 text-gold" /> Vercel / live URL *
          </label>
          <input
            required
            type="url"
            value={vercelUrl}
            onChange={(e) => setVercelUrl(e.target.value)}
            placeholder="https://your-project.vercel.app"
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
          />
          <p className="text-xs text-muted-foreground">
            Must be publicly accessible. Prefer a Vercel deployment.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">
            GitHub / code repo (optional)
          </label>
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/…"
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Notes for judges (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Login credentials, special instructions, tech stack…"
            className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
          />
        </div>

        {error && (
          <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
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
      </form>

      <div className="mt-10 rounded-xl border border-gold/30 bg-parchment p-5 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">What happens to your data</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Sent to the organizer by email (table format).</li>
          <li>Shown back to you on the next screen so you can verify.</li>
          <li>You can Copy all data or Open in Gmail as backup.</li>
          <li>Present the live Vercel link in the presentation slot.</li>
        </ul>
      </div>
    </div>
  );
}
