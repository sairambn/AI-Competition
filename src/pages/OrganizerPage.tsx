import { ExternalLink, Users, ListChecks, GitPullRequest, AlertCircle } from "lucide-react";

const REPO = "https://github.com/sairambn/AI-Competition";

export function OrganizerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 animate-fade-up text-center">
        <span className="mb-3 inline-flex rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground">
          Organizer only
        </span>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Team Assignments
        </h1>
        <p className="mt-2 text-muted-foreground">
          See every team and the problem they were assigned.
        </p>
      </div>

      {/* Primary action */}
      <a
        href={`${REPO}/issues?q=is%3Aissue+[Assignment]`}
        target="_blank"
        rel="noopener noreferrer"
        className="card-lift mb-6 flex items-center gap-4 rounded-xl border border-gold/40 bg-parchment p-6 shadow-sm transition hover:border-gold"
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ListChecks className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-foreground">View all registered teams</h2>
          <p className="text-sm text-muted-foreground">
            Opens GitHub Issues filtered by <code className="text-xs">[Assignment]</code>
          </p>
        </div>
        <ExternalLink className="h-5 w-5 text-muted-foreground" />
      </a>

      <div className="space-y-4">
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
            <h2 className="font-semibold text-foreground">Solution Pull Requests</h2>
            <p className="text-sm text-muted-foreground">Code submitted by teams</p>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </a>

        <a
          href={`${REPO}/tree/main/solutions`}
          target="_blank"
          rel="noopener noreferrer"
          className="card-lift flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/30 text-accent-foreground">
            <Users className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">solutions/ folder</h2>
            <p className="text-sm text-muted-foreground">Merged team folders</p>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </a>
      </div>

      {/* How it works */}
      <div className="mt-10 rounded-xl border border-border bg-card p-6 text-sm">
        <h3 className="flex items-center gap-2 font-semibold text-foreground">
          <AlertCircle className="h-4 w-4 text-gold" />
          How this works
        </h3>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-muted-foreground">
          <li>
            Team enters <strong>name + size</strong> and gets a problem.
          </li>
          <li>
            They click <strong>Register Assignment</strong> → a GitHub Issue opens with their team name and problem already filled.
          </li>
          <li>
            They click <strong>Create</strong> on GitHub.
          </li>
          <li>
            You open the link above and see every team + assigned problem in one list.
          </li>
        </ol>
        <p className="mt-4 rounded-lg bg-parchment px-4 py-3 text-foreground">
          <strong>Tip:</strong> Keep the Issues tab open during the event. New teams appear as soon as they register.
        </p>
      </div>
    </div>
  );
}
