import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
    window.scrollTo(0, 0);
  }, [pathname]);

  const linkClass = (to: string) =>
    cn(
      "px-2 py-1 text-sm transition-colors",
      pathname === to
        ? "font-medium text-foreground"
        : "text-muted-foreground hover:text-foreground"
    );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-sm font-medium tracking-wide text-foreground"
            onClick={() => setOpen(false)}
          >
            AI Solve-a-Thon
            <span className="mt-0.5 block text-[11px] font-normal text-muted-foreground">
              Jeppiaar · AI & ML
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className={linkClass(n.to)}>
                {n.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center border border-border md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border px-4 py-3 md:hidden">
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
            </nav>
          </div>
        )}
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-8 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <p>Jeppiaar Engineering College · Dept. of AI & ML</p>
          <p className="mt-1">
            © {new Date().getFullYear()} AI Problem Solve-a-Thon ·{" "}
            <a
              href="https://bnsairam.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary"
            >
              Sairam BN
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
