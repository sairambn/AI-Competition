import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Layout() {
  const { pathname } = useLocation();

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      className={cn(
        "text-sm transition-colors hover:text-foreground",
        pathname === to
          ? "font-semibold text-foreground"
          : "text-muted-foreground"
      )}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <span className="text-base font-extrabold tracking-tight">AI</span>
            </div>
            <div className="hidden leading-tight sm:block">
              <span className="block text-sm font-bold tracking-wide text-foreground">
                JEPPIAAR
              </span>
              <span className="block text-xs text-muted-foreground">
                Engineering College
              </span>
            </div>
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-3 sm:gap-5">
            {navLink("/", "Home")}
            {navLink("/problems", "Problems")}
            {navLink("/schedule", "Schedule")}
            {navLink("/submit", "Submit")}
            {navLink("/submissions", "Entries")}
            {navLink("/organizer", "Organizer")}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center sm:text-left">
              <h3 className="text-sm font-semibold text-foreground">
                Jeppiaar Engineering College
              </h3>
              <p className="text-xs text-muted-foreground">
                Department of Artificial Intelligence and Machine Learning
              </p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} AI Problem Solve-a-Thon. All rights
                reserved.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Designed by{" "}
                <a
                  href="https://bnsairam.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold underline-offset-4 transition-colors hover:underline"
                >
                  bnsairam.vercel.app
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
