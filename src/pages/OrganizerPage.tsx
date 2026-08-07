import { ExternalLink, Mail, ListChecks, Rocket, AlertCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";

const ORGANIZER_EMAIL = "bnsairam14@gmail.com";
const REPO = "https://github.com/sairambn/AI-Competition";

export function OrganizerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 animate-fade-up text-center">
        <span className="mb-3 inline-flex rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground">
          Organizer only
        </span>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Run the event
        </h1>
        <p className="mt-2 text-muted-foreground">
          Assignments, submissions, and judging in one place.
        </p>
      </div>

      <div className="space-y-4">
        <a
          href={`mailto:${ORGANIZER_EMAIL}`}
          className="card-lift flex items-center gap-4 rounded-xl border border-gold/40 bg-parchment p-6 shadow-sm transition hover:border-gold"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Mail className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">Solution emails</h2>
            <p className="text-sm text-muted-foreground">
              Inbox: <strong>{ORGANIZER_EMAIL}</strong> — subject starts with{" "}
              <code className="text-xs">[AI-Thon Solution]</code>
            </p>
          </div>
          <ExternalLink className="h-5 w-5 text-muted-foreground" />
        </a>

        <a
          href={`${REPO}/issues?q=is%3Aissue+[Assignment]`}
          target="_blank"
          rel="noopener noreferrer"
          className="card-lift flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ListChecks className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">Registered team assignments</h2>
            <p className="text-sm text-muted-foreground">
              GitHub Issues with <code className="text-xs">[Assignment]</code>
            </p>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </a>

        <Link
          to="/submit"
          className="card-lift flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/30 text-accent-foreground">
            <Rocket className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">Team submit page</h2>
            <p className="text-sm text-muted-foreground">
              Where teams paste Vercel links
            </p>
          </div>
        </Link>

        <a
          href={`${REPO}`}
          target="_blank"
          rel="noopener noreferrer"
          className="card-lift flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
            <Users className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">Event repository</h2>
            <p className="text-sm text-muted-foreground">Code, docs, optional code archives</p>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </a>
      </div>

      <div className="mt-10 rounded-xl border border-border bg-card p-6 text-sm">
        <h3 className="flex items-center gap-2 font-semibold text-foreground">
          <AlertCircle className="h-4 w-4 text-gold" />
          Event-day checklist
        </h3>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-muted-foreground">
          <li>
            <strong>10:30</strong> — Teams open Problems → get assignment → Register on
            GitHub Issues.
          </li>
          <li>
            <strong>Build</strong> — Teams deploy to Vercel (or any public URL).
          </li>
          <li>
            <strong>Submit</strong> — Teams use /submit; you receive table emails.
          </li>
          <li>
            <strong>Present</strong> — Open each live URL; score clarity, department
            usefulness, demo quality.
          </li>
          <li>
            <strong>12:00</strong> — Announce winners.
          </li>
        </ol>
        <p className="mt-4 rounded-lg bg-parchment px-4 py-3 text-foreground">
          <strong>Tip:</strong> Keep Gmail open filtered by{" "}
          <code className="text-xs">[AI-Thon Solution]</code>. First FormSubmit
          email may need a one-time confirm link.
        </p>
      </div>
    </div>
  );
}
