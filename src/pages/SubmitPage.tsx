import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Check,
  Copy,
  ExternalLink,
  Globe,
  Lightbulb,
  Mail,
  Rocket,
  Users,
} from "lucide-react";
import { PROBLEMS } from "@/data/problems";

function isValidVercelUrl(url: string) {
  try {
    const u = new URL(url.trim());
    if (u.protocol !== "https:" && u.protocol !== "http:") return false;
    // Accept vercel.app and custom domains
    return true;
  } catch {
    return false;
  }
}

export function SubmitPage() {
  const [searchParams] = useSearchParams();
  const [teamName, setTeamName] = useState(searchParams.get("team") ?? "");
  const [problemId, setProblemId] = useState(searchParams.get("problem") ?? "");
  const [contactEmail, setContactEmail] = useState("");
  const [vercelUrl, setVercelUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const selected = PROBLEMS.find((p) => p.id === problemId);

  function handleSubmit(e: React.FormEvent) {
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
    if (!problemId) {
      setError("Please select the problem you solved.");
      return;
    }
    if (!vercelUrl.trim() || !isValidVercelUrl(vercelUrl)) {
      setError("Please enter a valid Vercel / deployment URL (https://…).");
      return;
    }

    // Persist locally so the team can re-open and copy later
    const entry = {
      teamName: teamName.trim(),
      contactEmail: contactEmail.trim(),
      problemId,
      problemTitle: selected?.title ?? "",
      vercelUrl: vercelUrl.trim(),
      repoUrl: repoUrl.trim() || null,
      notes: notes.trim() || null,
      teamSize: teamSize.trim() || null,
      submittedAt: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(
        localStorage.getItem("ai-thon-submissions") || "[]"
      ) as unknown[];
      existing.push(entry);
      localStorage.setItem("ai-thon-submissions", JSON.stringify(existing));
    } catch {
      // ignore storage errors
    }

    setSubmitted(true);
  }

  const summary = `AI Problem Solve-a-Thon — Solution Submission

Team: ${teamName.trim()}
Problem: ${selected?.title ?? "—"}
Team size: ${teamSize || "—"}
Contact: ${contactEmail.trim()}
Vercel link: ${vercelUrl.trim()}
${repoUrl.trim() ? `Repo: ${repoUrl.trim()}\n` : ""}${notes.trim() ? `Notes: ${notes.trim()}\n` : ""}Submitted: ${new Date().toLocaleString()}`;

  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-fade-up rounded-2xl border border-primary/30 bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Check className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Submission recorded
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your Vercel link has been saved on this device. Share the summary
            with organizers / judges and present the live demo.
          </p>

          <div className="mt-6 rounded-xl border border-border bg-secondary/40 p-4 text-left text-sm">
            <p className="font-semibold text-foreground">{teamName}</p>
            <p className="mt-1 text-muted-foreground">{selected?.title}</p>
            <a
              href={vercelUrl.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 break-all font-medium text-primary hover:underline"
            >
              <Globe className="h-4 w-4 shrink-0" />
              {vercelUrl.trim()}
            </a>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => void copySummary()}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied" : "Copy summary for judges"}
            </button>
            <a
              href={vercelUrl.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-secondary"
            >
              Open live demo <ExternalLink className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setVercelUrl("");
                setNotes("");
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary"
            >
              Submit another
            </button>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Tip: Keep the Vercel link open during the presentation slot (2–3
            min).
          </p>
        </div>
      </div>
    );
  }

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
          Deploy your solution on Vercel (or any public URL) and submit the live
          link here. Judges will open it during review and presentations.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
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
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto"
        >
          <Rocket className="h-4 w-4" />
          Submit solution
        </button>
      </form>

      <div className="mt-10 rounded-xl border border-gold/30 bg-parchment p-5 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">How it works</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Deploy your app (Vercel recommended — free for students).</li>
          <li>Paste the live URL above and submit.</li>
          <li>Copy the summary and share it with organizers if asked.</li>
          <li>Present the live demo in the presentation slot (2–3 min).</li>
        </ul>
      </div>
    </div>
  );
}
