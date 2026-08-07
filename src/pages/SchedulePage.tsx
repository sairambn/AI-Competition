import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Lightbulb,
  Code,
  Flag,
  Laptop,
  Presentation,
  CheckCircle2,
  Rocket,
  ArrowRight,
} from "lucide-react";

const agenda = [
  {
    time: "10:00 AM",
    end: "10:25 AM",
    label: "Registration & Team Check-in",
    what: "Teams arrive, confirm members, and get seating.",
    how: "Show your team name at the desk. Collect any handouts.",
    icon: Flag,
  },
  {
    time: "10:30 AM",
    end: "10:40 AM",
    label: "Problem Statement Release",
    what: "Each team receives a software problem matched to team size — all useful for the AI & ML department.",
    how: "Open this site → Problems → enter team name & size → Get problem → Copy / Register assignment.",
    icon: Lightbulb,
  },
  {
    time: "10:45 AM",
    end: "11:35 AM",
    label: "Build & Deploy",
    what: "Design and build a working solution, then deploy a public demo (Vercel recommended).",
    how: "Any stack is fine. Aim for a clear live URL, not perfect production code.",
    icon: Laptop,
  },
  {
    time: "11:35 AM",
    end: "11:40 AM",
    label: "Submit Vercel link",
    what: "Official submission: public deployment URL + team details.",
    how: "Open Submit → fill form → Submit solution. Data is emailed to organizers and shown on screen.",
    icon: Rocket,
  },
  {
    time: "11:40 AM",
    end: "11:55 AM",
    label: "Presentation Window",
    what: "Teams present their live solution to judges.",
    how: "2–3 minutes per team. Open the live URL and walk through how it helps the department.",
    icon: Presentation,
  },
  {
    time: "12:00 PM",
    end: "12:10 PM",
    label: "Winner Announcement",
    what: "Best solution for the department, presented clearly, wins.",
    how: "Judges score clarity, usefulness, and demo quality. Winners announced on stage.",
    icon: Trophy,
  },
];

const categories = [
  {
    icon: Code,
    label: "Department Operations",
    examples: "Attendance, lab booking, IAT dropbox, notices",
  },
  {
    icon: Users,
    label: "Academic Workflow",
    examples: "Mentoring, project showcase, research archive",
  },
  {
    icon: Lightbulb,
    label: "AI & Support",
    examples: "FAQ chatbot, exam toolkit, timetable helper",
  },
  {
    icon: Trophy,
    label: "Planning & Collaboration",
    examples: "Research connector, lab demand predictor",
  },
];

export function SchedulePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 animate-fade-up text-center">
        <span className="mb-3 inline-flex rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground">
          Event Agenda
        </span>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Agenda & Rules
        </h1>
        <p className="mt-2 text-muted-foreground">
          What happens, when, and exactly how you take part
        </p>
      </div>

      <div className="stagger mb-12 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Calendar, text: "Friday, 07th August 2026", sub: "Event day" },
          { icon: Clock, text: "10:00 AM — 12:10 PM", sub: "Full window" },
          { icon: MapPin, text: "Elite Seminar Hall", sub: "Venue" },
        ].map((item) => (
          <div
            key={item.text}
            className="card-lift rounded-xl border border-border bg-card p-5 text-center shadow-sm"
          >
            <item.icon className="mx-auto h-6 w-6 text-gold" />
            <p className="mt-3 text-sm font-semibold text-foreground">{item.text}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="mb-14">
        <h2 className="mb-2 text-2xl font-bold text-foreground">Minute-by-minute agenda</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Same flow for every team. Deploy early so you can submit and present calmly.
        </p>
        <div className="relative space-y-5 pl-8 before:absolute before:left-3 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
          {agenda.map((item, index) => (
            <div key={item.time} className="relative">
              <span className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {index + 1}
              </span>
              <div className="card-lift rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-gold/50 px-2.5 py-0.5 text-xs font-semibold text-foreground">
                    {item.time} – {item.end}
                  </span>
                  <item.icon className="h-4 w-4 text-gold" />
                  <h3 className="font-semibold text-foreground">{item.label}</h3>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-parchment/80 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-olive">
                      What happens
                    </p>
                    <p className="mt-1 text-sm text-foreground">{item.what}</p>
                  </div>
                  <div className="rounded-lg bg-parchment/80 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-olive">
                      How you do it
                    </p>
                    <p className="mt-1 text-sm text-foreground">{item.how}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-14 rounded-xl border border-gold/30 bg-parchment p-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
          <CheckCircle2 className="h-5 w-5 text-gold" />
          Your path in 5 steps
        </h2>
        <ol className="mt-4 space-y-3 text-sm text-foreground">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              1
            </span>
            <span>
              <strong>Form a team</strong> (size drives difficulty).
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              2
            </span>
            <span>
              <strong>At 10:30</strong> get your department problem and register assignment.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              3
            </span>
            <span>
              <strong>Build & deploy</strong> a public demo (Vercel preferred).
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              4
            </span>
            <span>
              <strong>Submit</strong> the live URL on the Submit page.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              5
            </span>
            <span>
              <strong>Present</strong> 2–3 min; winners at 12:00.
            </span>
          </li>
        </ol>
        <Link
          to="/submit"
          className="btn-shine mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Go to Submit <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-bold text-foreground">Problem categories</h2>
        <div className="stagger grid gap-5 sm:grid-cols-2">
          {categories.map((category) => (
            <div
              key={category.label}
              className="card-lift rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <category.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {category.label}
                </h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{category.examples}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-xl border border-border bg-parchment p-6">
        <h2 className="text-xl font-bold text-foreground">Rules</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            One problem per team, matched to team size (Easy → Extreme), all aimed at
            real department needs.
          </li>
          <li>
            Official submission is a <strong>public live URL</strong> via the Submit
            page (Vercel recommended).
          </li>
          <li>Judging: clarity · usefulness for the department · demo quality.</li>
          <li>Best solution presented on time wins.</li>
        </ul>
      </div>
    </div>
  );
}
