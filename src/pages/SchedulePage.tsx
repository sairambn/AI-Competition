import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const agenda = [
  {
    time: "10:00",
    end: "10:25",
    label: "Registration & check-in",
    what: "Teams arrive, confirm members, take seats.",
    how: "Give your team name at the desk. Collect any handouts.",
  },
  {
    time: "10:30",
    end: "10:40",
    label: "Problem release",
    what: "Each team gets a department-useful problem matched to team size.",
    how: "Problems → team name & size → Get problem → Register.",
  },
  {
    time: "10:45",
    end: "11:35",
    label: "Build & deploy",
    what: "Ship a working demo on a public URL (Vercel recommended).",
    how: "Any stack. Prefer a clear live link over perfect production code.",
  },
  {
    time: "11:35",
    end: "11:40",
    label: "Submit live link",
    what: "Official submission: public URL + team details.",
    how: "Submit page → fill form → submit. Organizers are emailed.",
  },
  {
    time: "11:40",
    end: "11:55",
    label: "Presentations",
    what: "Teams show the live solution to judges.",
    how: "2–3 minutes. Open the URL and explain department impact.",
  },
  {
    time: "12:00",
    end: "12:10",
    label: "Winners",
    what: "Best solution for the department, presented clearly, wins.",
    how: "Scored on clarity, usefulness, and demo quality.",
  },
];

export function SchedulePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 animate-fade-up">
        <p className="text-sm font-medium text-primary">Event day</p>
        <h1 className="mt-2 text-3xl text-foreground sm:text-4xl">
          Agenda & rules
        </h1>
        <p className="mt-3 text-muted-foreground">
          Friday, 07 August 2026 · 10:00 AM – 12:10 PM · Elite Seminar Hall
        </p>
      </header>

      <section className="mb-14">
        <h2 className="mb-6 text-2xl text-foreground">Minute by minute</h2>
        <ol className="divide-y divide-border border border-border">
          {agenda.map((item, index) => (
            <li key={item.time} className="grid gap-3 px-5 py-5 sm:grid-cols-[5.5rem_1fr]">
              <div className="font-mono text-sm">
                <p className="font-semibold text-accent">{item.time}</p>
                <p className="text-xs text-muted-foreground">{item.end}</p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {item.label}
                </h3>
                <p className="mt-1.5 text-sm text-foreground/90">{item.what}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground/80">How: </span>
                  {item.how}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-14 border border-border bg-card px-5 py-6">
        <h2 className="text-xl text-foreground">Your path</h2>
        <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
          <li>
            <span className="font-mono text-primary">1</span>{" "}
            <strong className="text-foreground">Form a team</strong> — size drives
            difficulty.
          </li>
          <li>
            <span className="font-mono text-primary">2</span>{" "}
            <strong className="text-foreground">At 10:30</strong> claim a problem and
            register.
          </li>
          <li>
            <span className="font-mono text-primary">3</span>{" "}
            <strong className="text-foreground">Build & deploy</strong> a public demo.
          </li>
          <li>
            <span className="font-mono text-primary">4</span>{" "}
            <strong className="text-foreground">Submit</strong> the live URL on this
            site.
          </li>
          <li>
            <span className="font-mono text-primary">5</span>{" "}
            <strong className="text-foreground">Present</strong> 2–3 min; winners at
            12:00.
          </li>
        </ol>
        <Link
          to="/submit"
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Go to Submit <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mb-14">
        <h2 className="mb-4 text-xl text-foreground">Problem themes</h2>
        <ul className="grid gap-3 text-sm sm:grid-cols-2">
          <li className="border border-border px-4 py-3">
            <p className="font-semibold text-foreground">Department operations</p>
            <p className="mt-1 text-muted-foreground">
              Attendance, lab booking, IAT dropbox, notices
            </p>
          </li>
          <li className="border border-border px-4 py-3">
            <p className="font-semibold text-foreground">Academic workflow</p>
            <p className="mt-1 text-muted-foreground">
              Mentoring, project showcase, research archive
            </p>
          </li>
          <li className="border border-border px-4 py-3">
            <p className="font-semibold text-foreground">AI & support</p>
            <p className="mt-1 text-muted-foreground">
              FAQ chatbot, exam toolkit, timetable helper
            </p>
          </li>
          <li className="border border-border px-4 py-3">
            <p className="font-semibold text-foreground">Planning</p>
            <p className="mt-1 text-muted-foreground">
              Research connector, lab demand predictor
            </p>
          </li>
        </ul>
      </section>

      <section className="border border-border bg-parchment px-5 py-6">
        <h2 className="text-xl text-foreground">Rules</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            One problem per team, matched to size (Easy → Extreme), aimed at real
            department needs.
          </li>
          <li>
            Official submission is a <strong className="text-foreground">public live URL</strong>{" "}
            via the Submit page.
          </li>
          <li>Judging: clarity · usefulness for the department · demo quality.</li>
          <li>Best solution presented on time wins.</li>
        </ul>
      </section>
    </div>
  );
}
