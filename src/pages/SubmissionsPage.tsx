import { ExternalLink, Globe, ListChecks, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

export function SubmissionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 animate-fade-up text-center">
        <span className="mb-3 inline-flex rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground">
          Live Entries
        </span>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Solution submissions
        </h1>
        <p className="mt-2 text-muted-foreground">
          Teams submit a <strong>public Vercel (or live) URL</strong>. Judges open
          the link during review and the presentation round.
        </p>
      </div>

      <div className="space-y-4">
        <Link
          to="/submit"
          className="card-lift flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Rocket className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">Submit your Vercel link</h2>
            <p className="text-sm text-muted-foreground">
              Team name · problem · live URL · optional repo
            </p>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </Link>

        <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/30 text-accent-foreground">
            <Globe className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">What judges need</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A working public deployment. Optional GitHub link for code review.
              Keep credentials (if any) in the notes field.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
            <ListChecks className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">For organizers</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Collect the “Copy summary for judges” text from each team (or ask
              them to paste into a shared sheet). Score live demos + usefulness
              for the department.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-border bg-parchment p-6 text-sm">
        <h3 className="font-semibold text-foreground">Judging checklist</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-foreground">
          <li>Open the submitted Vercel / live URL</li>
          <li>Check core features against the problem statement</li>
          <li>Watch the 2–3 min presentation</li>
          <li>Score: clarity · usefulness for the department · demo quality</li>
        </ol>
      </div>
    </div>
  );
}
