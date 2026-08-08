import { Link } from "react-router-dom";

const ORGANIZER_EMAIL = "bnsairam14@gmail.com";

export function SubmissionsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 animate-fade-up">
        <p className="text-sm font-medium text-primary">Entries</p>
        <h1 className="mt-2 text-3xl text-foreground sm:text-4xl">
          Solution submissions
        </h1>
        <p className="mt-3 text-muted-foreground">
          Teams submit a public live URL. Each submission is emailed to the
          organizer and confirmed on screen with every field entered.
        </p>
      </header>

      <div className="space-y-3">
        <Link
          to="/submit"
          className="block border border-border bg-card px-5 py-4 transition-colors hover:border-primary/40 hover:bg-secondary/30"
        >
          <p className="font-semibold text-foreground">Submit your live link →</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Team · problem · public URL · optional repo
          </p>
        </Link>

        <div className="border border-border bg-card px-5 py-4">
          <p className="font-semibold text-foreground">Where data goes</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Every submit emails{" "}
            <a
              href={`mailto:${ORGANIZER_EMAIL}`}
              className="font-medium text-primary hover:underline"
            >
              {ORGANIZER_EMAIL}
            </a>
            . Teams also see their full data on the success screen and can open it
            in Gmail.
          </p>
        </div>

        <div className="border border-border bg-card px-5 py-4">
          <p className="font-semibold text-foreground">What judges need</p>
          <p className="mt-1 text-sm text-muted-foreground">
            A working public deployment. Optional GitHub link. Credentials or
            special notes in the notes field.
          </p>
        </div>

        <div className="border border-border bg-card px-5 py-4">
          <p className="font-semibold text-foreground">For organizers</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Watch for <code className="text-xs">[AI-Thon Solution]</code> emails.
            Teams can use <strong className="text-foreground">Open in Gmail</strong>{" "}
            or <strong className="text-foreground">Copy all data</strong> as backup.
          </p>
        </div>
      </div>

      <section className="mt-10 border border-border bg-parchment px-5 py-5 text-sm">
        <h3 className="font-semibold text-foreground">Judging checklist</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-foreground">
          <li>Open the submitted live URL from the email</li>
          <li>Check core features against the problem statement</li>
          <li>Watch the 2–3 min presentation</li>
          <li>Score: clarity · usefulness for the department · demo quality</li>
        </ol>
      </section>
    </div>
  );
}
