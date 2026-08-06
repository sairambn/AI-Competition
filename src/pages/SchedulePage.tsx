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
    what: "Each team receives a software problem matched to team size.",
    how: "Open this website → Problem Generator → enter team size → get your problem. Copy it for your team.",
    icon: Lightbulb,
  },
  {
    time: "10:45 AM",
    end: "11:40 AM",
    label: "Build Phase",
    what: "Design and build a working software solution for the assigned problem.",
    how: "Work in your team. Use any stack. Focus on a clear demo, not perfect production code.",
    icon: Laptop,
  },
  {
    time: "11:40 AM",
    end: "11:55 AM",
    label: "Presentation Window",
    what: "Teams present their solution to judges.",
    how: "2–3 minutes per team. Show what you built and how it solves the problem.",
    icon: Presentation,
  },
  {
    time: "12:00 PM",
    end: "12:10 PM",
    label: "Winner Announcement",
    what: "Best solution in the shortest effective time wins.",
    how: "Judges score clarity, usefulness, and demo quality. Winners announced on stage.",
    icon: Trophy,
  },
];

const categories = [
  {
    icon: Code,
    label: "Department Operations",
    examples: "Attendance tracking, notice boards, lab bookings",
  },
  {
    icon: Users,
    label: "Academic Workflow",
    examples: "Assignment portals, mentor matching, project showcases",
  },
  {
    icon: Lightbulb,
    label: "AI & Support",
    examples: "Helpdesk chatbots, proctoring systems, predictive planners",
  },
  {
    icon: Trophy,
    label: "Extreme Systems",
    examples: "Research collaboration networks, resource forecasting",
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
          Exactly what happens, when it happens, and how you take part
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
          Follow this order on event day. Every team uses the same flow.
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
                    <p className="text-xs font-semibold uppercase tracking-wide text-olive">What happens</p>
                    <p className="mt-1 text-sm text-foreground">{item.what}</p>
                  </div>
                  <div className="rounded-lg bg-parchment/80 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-olive">How you do it</p>
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
          Your path in 4 steps
        </h2>
        <ol className="mt-4 space-y-3 text-sm text-foreground">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
            <span><strong>Form a team</strong> (default 5 members; 9+ get extreme problems).</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
            <span><strong>At 10:30 AM</strong> open Problem Generator, enter team size, get your problem, copy it.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
            <span><strong>Build until 11:40 AM</strong> — a working demo that solves the assigned problem.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">4</span>
            <span><strong>Present by 11:55 AM</strong> — short demo; winners announced at 12:00 PM.</span>
          </li>
        </ol>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-bold text-foreground">Problem categories</h2>
        <div className="stagger grid gap-5 sm:grid-cols-2">
          {categories.map((category) => (
            <div key={category.label} className="card-lift rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <category.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category.label}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{category.examples}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-xl border border-border bg-parchment p-6">
        <h2 className="text-xl font-bold text-foreground">Rules</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Each team receives one problem based on registered team size (Easy → Extreme).</li>
          <li>Default team size is 5. Teams of 9 or more get extreme-level problems.</li>
          <li>Solutions must be software-based and address the assigned department problem.</li>
          <li>Judging: clarity of solution, usefulness for the department, quality of demo.</li>
          <li>Best solution delivered and presented on time wins.</li>
        </ul>
      </div>
    </div>
  );
}
