import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/problems", label: "Problems" },
  { to: "/schedule", label: "Schedule" },
  { to: "/submit", label: "Submit" },
  { to: "/submissions", label: "Entries" },
  { to: "/organizer", label: "Organizer" },
];

export function Layout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const linkClass = (to: string) =>
    cn(
      "rounded-md px-2.5 py-1.5 text-sm transition-colors",
      pathname === to
        ? "bg-primary/15 font-semibold text-primary"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-card/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_20px_-4px] shadow-primary/50">
              <span className="text-base font-extrabold tracking-tight">AI</span>
            </div>
            <div className="leading-tight">
              <span className="block text-sm font-bold tracking-wide text-foreground">
                JEPPIAAR
              </span>
              <span className="block text-[11px] text-muted-foreground">
                AI & ML · Solve-a-Thon
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className={linkClass(n.to)}>
                {n.label}
              </Link>
            ))}
            <Link
              to="/submit"
              className="btn-shine ml-2 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Rocket className="h-3.5 w-3.5" /> Submit
            </Link>
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border bg-card px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className={linkClass(n.to)}
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/submit"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                <Rocket className="h-4 w-4" /> Submit Vercel link
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Jeppiaar Engineering College
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Department of Artificial Intelligence and Machine Learning
              </p>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:justify-center">
              {NAV.slice(0, 5).map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="text-muted-foreground hover:text-primary"
                >
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="text-xs text-muted-foreground sm:text-right">
              <p>© {new Date().getFullYear()} AI Problem Solve-a-Thon</p>
              <p className="mt-1">
                Built by{" "}
                <a
                  href="https://bnsairam.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold underline-offset-4 hover:underline"
                >
                  Sairam BN
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
