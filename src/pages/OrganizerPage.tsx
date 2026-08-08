import { ExternalLink, Mail, MessageCircle, CheckCircle2 } from "lucide-react";

const REPO = "https://github.com/sairambn/AI-Competition";
const ORGANIZER_EMAIL = "sairam@jeppiaarcollege.org";

export function OrganizerPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 animate-fade-up">
        <p className="text-sm font-medium text-primary">Staff only</p>
        <h1 className="mt-2 text-3xl text-foreground sm:text-4xl">Event control</h1>
        <p className="mt-2 text-muted-foreground">
          Where teams land, and how you track them.
        </p>
      </header>

      <section className="mb-8 border border-border bg-card px-5 py-5 text-sm">
        <h2 className="font-semibold text-foreground">Registration (live)</h2>
        <p className="mt-2 text-muted-foreground">
          When a team taps <strong className="text-foreground">Register</strong>:
        </p>
        <ul className="mt-3 space-y-2 text-muted-foreground">
          <li className="flex gap-2">
            <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>WhatsApp opens with team + problem pre-filled</span>
          </li>
          <li className="flex gap-2">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>
              Email to <code className="text-xs text-foreground">{ORGANIZER_EMAIL}</code>
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>Summary copied to their clipboard as backup</span>
          </li>
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          First-time email: activate FormSubmit via the link in your inbox (once).
        </p>
      </section>

      <nav className="space-y-2">
        {[
          {
            href: `mailto:${ORGANIZER_EMAIL}`,
            title: "Assignment emails",
            sub: ORGANIZER_EMAIL,
            external: false,
          },
          {
            href: `${REPO}/pulls?q=is%3Apr+[Solution]`,
            title: "Solution pull requests",
            sub: "Code under solutions/ via PR",
            external: true,
          },
          {
            href: `${REPO}/tree/main/solutions`,
            title: "solutions/ folder",
            sub: "Merged team folders",
            external: true,
          },
          {
            href: `${REPO}/issues?q=is%3Aissue+[Assignment]`,
            title: "Legacy assignment issues",
            sub: "Optional GitHub Issues filter",
            external: true,
          },
        ].map((item) => (
          <a
            key={item.title}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="flex items-center justify-between border border-border bg-card px-4 py-4 transition-colors hover:border-primary/40 hover:bg-secondary/30"
          >
            <div>
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.sub}</p>
            </div>
            {item.external && (
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
            )}
          </a>
        ))}
      </nav>

      <section className="mt-10 border border-border bg-parchment px-5 py-5 text-sm">
        <h3 className="font-semibold text-foreground">Run-of-show</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-foreground">
          <li>10:30 — Teams generate + Register (watch WhatsApp / email)</li>
          <li>10:45–11:40 — Build</li>
          <li>
            Teams push under <code className="text-xs">solutions/</code> and open a PR
          </li>
          <li>11:40 — Presentations (2–3 min)</li>
          <li>Score: clarity · usefulness · demo</li>
        </ol>
      </section>
    </div>
  );
}
