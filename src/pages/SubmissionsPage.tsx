import { ExternalLink, GitPullRequest, FolderGit2 } from "lucide-react";

const REPO = "https://github.com/sairambn/AI-Competition";

export function SubmissionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 animate-fade-up text-center">
        <span className="mb-3 inline-flex rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground">
          Live Entries
        </span>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Solutions on GitHub
        </h1>
        <p className="mt-2 text-muted-foreground">
          All submissions are Pull Requests that add a folder under{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">solutions/</code>.
        </p>
      </div>

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
            <h2 className="font-semibold text-foreground">Open Solution PRs</h2>
            <p className="text-sm text-muted-foreground">
              Filter: title contains [Solution]
            </p>
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
            <FolderGit2 className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">solutions/ folder</h2>
            <p className="text-sm text-muted-foreground">
              Merged team folders appear here
            </p>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </a>
      </div>

      <div className="mt-10 rounded-xl border border-border bg-parchment p-6 text-sm">
        <h3 className="font-semibold text-foreground">For organizers / judges</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-foreground">
          <li>Review open PRs titled <code className="text-xs">[Solution] …</code></li>
          <li>Check each team’s <code className="text-xs">README.md</code> and code quality</li>
          <li>Watch the live presentation (2–3 min)</li>
          <li>Score: clarity · usefulness for the department · demo quality</li>
        </ol>
      </div>
    </div>
  );
}
