import { useEffect, useState } from "react";
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

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);

  const linkClass = (to: string) =>
    cn(
      "rounded-md px-2.5 py-1.5 text-sm transition-colors",
      pathname === to
        ? "bg-primary/15 font-semibold text-primary"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    );

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/40 bg-primary/10 text-primary">
              <span className="text-sm font-bold tracking-tight">AI</span>
            </div>
            <div className="leading-tight">
              <span className="block text-sm font-semibold tracking-wide text-foreground">
                JEPPIAAR
              </span>
              <span className="block text-[11px] text-muted-foreground">
                AI & ML · Solve-a-Thon
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className={linkClass(n.to)}>
                {n.label}
              </Link>
            ))}
            <Link
              to="/submit"
              className="ml-2 inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
            >
              <Rocket className="h-3.5 w-3.5" /> Submit
            </Link>
          </nav>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border bg-card px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
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
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                <Rocket className="h-4 w-4" /> Submit live link
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Jeppiaar Engineering College
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
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
                  className="font-medium text-primary underline-offset-4 hover:underline"
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
