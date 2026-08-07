import { ExternalLink, Users, ListChecks, GitPullRequest, Mail, MessageCircle, CheckCircle2 } from "lucide-react";

const REPO = "https://github.com/sairambn/AI-Competition";
const ORGANIZER_EMAIL = "sairam@jeppiaarcollege.org";

export function OrganizerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 animate-fade-up text-center">
        <span className="mb-3 inline-flex rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground">
          Organizer
        </span>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Event control
        </h1>
        <p className="mt-2 text-muted-foreground">
          Where teams land, and how you track them.
        </p>
      </div>

      <div className="mb-8 rounded-xl border border-border bg-card p-5 text-sm">
        <h2 className="font-semibold text-foreground">Registration (live)</h2>
        <p className="mt-2 text-muted-foreground">
          When a team taps <strong className="text-foreground">Register</strong>, three things happen:
        </p>
        <ol className="mt-3 space-y-2 text-muted-foreground">
          <li className="flex gap-2">
            <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>WhatsApp opens with team + problem pre-filled — they send it to you</span>
          </li>
          <li className="flex gap-2">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>
              Email goes to <code className="text-xs text-foreground">{ORGANIZER_EMAIL}</code>
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>Summary is copied to their clipboard as backup</span>
          </li>
        </ol>
        <p className="mt-3 text-xs text-muted-foreground">
          First-time email: activate FormSubmit via the link sent to your inbox (one time only).
        </p>
      </div>

      <div className="space-y-4">
        <a
          href={`mailto:${ORGANIZER_EMAIL}`}
          className="card-lift flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Mail className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">Assignment emails</h2>
            <p className="text-sm text-muted-foreground">{ORGANIZER_EMAIL}</p>
          </div>
        </a>

        <a
          href={`${REPO}/pulls?q=is%3Apr+[Solution]`}
          target="_blank"
          rel="noopener noreferrer"
          className="card-lift flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <GitPullRequest className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">Solution PRs</h2>
            <p className="text-sm text-muted-foreground">Code under solutions/ via Pull Request</p>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </a>

        <a
          href={`${REPO}/tree/main/solutions`}
          target="_blank"
          rel="noopener noreferrer"
          className="card-lift flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <Users className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">solutions/ folder</h2>
            <p className="text-sm text-muted-foreground">Merged team folders</p>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </a>

        <a
          href={`${REPO}/issues?q=is%3Aissue+[Assignment]`}
          target="_blank"
          rel="noopener noreferrer"
          className="card-lift flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <ListChecks className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">Legacy assignment issues</h2>
            <p className="text-sm text-muted-foreground">Optional GitHub Issues filter</p>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </a>
      </div>

      <div className="mt-10 rounded-xl border border-border bg-parchment p-6 text-sm">
        <h3 className="font-semibold text-foreground">Suggested run-of-show</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-foreground">
          <li>10:30 — Teams generate + Register (watch WhatsApp / email)</li>
          <li>10:45–11:40 — Build</li>
          <li>Teams push a folder under <code className="text-xs">solutions/</code> and open a PR</li>
          <li>11:40 — Presentations (2–3 min)</li>
          <li>Score: clarity · usefulness · demo</li>
        </ol>
      </div>
    </div>
  );
}
