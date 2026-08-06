import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Sparkles, ArrowRight, Lightbulb } from "lucide-react";
import { PROBLEMS, type Difficulty } from "@/data/problems";
import { cn } from "@/lib/utils";

function formatDifficulty(value: Difficulty) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function difficultyClass(value: Difficulty) {
  switch (value) {
    case "easy": return "bg-easy text-easy-foreground";
    case "medium": return "bg-medium text-medium-foreground";
    case "hard": return "bg-hard text-hard-foreground";
    case "extreme": return "bg-extreme text-extreme-foreground";
  }
}

const featured = [
  PROBLEMS.find((p) => p.id === "1")!,
  PROBLEMS.find((p) => p.id === "5")!,
  PROBLEMS.find((p) => p.id === "8")!,
  PROBLEMS.find((p) => p.id === "11")!,
];

export function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="hero-glow relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-parchment to-background">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="max-w-2xl animate-fade-up">
            <span className="mb-4 inline-flex items-center rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground shadow-sm">
              Department of AI & ML Presents
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              AI Problem<br /><span className="text-olive">Solve-a-Thon</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              A problem statement will be assigned to each team. Build software that solves real department challenges — from attendance tracking to smart scheduling and AI-powered support systems.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/problems" className="btn-shine inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90">
                Generate Your Problem <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/schedule" className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:bg-secondary">
                View Schedule
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gold" /><span>Friday, 07th August 2026</span></div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold" /><span>10:30 AM — 12:00 PM</span></div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /><span>Elite Seminar Hall</span></div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md animate-scale-in delay-200 lg:max-w-lg">
            <div className="hero-card-glow relative rounded-2xl border border-border bg-card p-3">
              <div className="flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 via-parchment to-accent/20">
                <div className="text-center">
                  <div className="animate-float mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                    <span className="text-4xl font-extrabold">AI</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">Think. Innovate. Elevate.</p>
                  <p className="mt-1 text-sm text-muted-foreground">Real problems. Real solutions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
            Today&apos;s agenda — Friday 07 Aug 2026
          </p>
          <div className="grid gap-3 sm:grid-cols-5">
            {[
              { t: "10:00", l: "Check-in" },
              { t: "10:30", l: "Get problem" },
              { t: "10:45", l: "Build" },
              { t: "11:40", l: "Present" },
              { t: "12:00", l: "Winners" },
            ].map((s) => (
              <div key={s.t} className="flex items-center gap-2 sm:flex-col sm:text-center">
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-accent-foreground">{s.t}</span>
                <span className="text-sm font-medium">{s.l}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link to="/schedule" className="text-sm font-semibold text-accent underline-offset-4 hover:underline">
              Full agenda with how & what →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-3xl font-bold text-foreground">
                <Lightbulb className="h-7 w-7 text-gold" /> Problem Ideas
              </h2>
              <p className="mt-2 text-muted-foreground">Real department challenges your team might build solutions for</p>
            </div>
            <Link to="/problems" className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
              View all ideas <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((idea) => (
              <article key={idea.id} className="card-lift flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm">
                <span className={cn("w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold", difficultyClass(idea.difficulty))}>
                  {formatDifficulty(idea.difficulty)}
                </span>
                <h3 className="mt-3 text-base font-semibold text-foreground">{idea.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{idea.description}</p>
                <p className="mt-3 text-xs font-medium text-olive">{idea.category}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="mt-2 text-muted-foreground">Three simple steps to compete and innovate</p>
          </div>
          <div className="stagger grid gap-6 sm:grid-cols-3">
            {[
              { icon: Users, title: "1. Form Your Team", text: "Gather up to 5 members. Extra-large teams of 9+ receive special problem allocation." },
              { icon: Sparkles, title: "2. Get a Problem", text: "Enter your team size and receive a software problem matched to your team's capacity." },
              { icon: ArrowRight, title: "3. Build & Present", text: "Solve the assigned problem in the shortest time and present your solution to win." },
            ].map((item) => (
              <div key={item.title} className="card-lift rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
