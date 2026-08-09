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
    window.scrollTo(0, 0);
  }, [pathname]);

  const linkClass = (to: string) =>
    cn(
      "rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-colors",
      pathname === to
        ? "bg-white/10 text-[#f5f5f7]"
        : "text-[#86868b] hover:text-[#f5f5f7]"
    );

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-3 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-[#f5f5f7]">
              AI
            </span>
            <span className="text-sm font-medium tracking-tight text-[#f5f5f7]">
              Solve-a-Thon
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className={linkClass(n.to)}>
                {n.label}
              </Link>
            ))}
            <Link
              to="/submit"
              className="ml-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-white hover:opacity-90"
            >
              <Rocket className="h-3.5 w-3.5" /> Submit
            </Link>
          </nav>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#f5f5f7] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-white/10 bg-black/95 px-6 py-4 backdrop-blur-xl md:hidden">
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
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white"
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

      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-[#f5f5f7]">
                Jeppiaar Engineering College
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#86868b]">
                Department of Artificial Intelligence and Machine Learning
              </p>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:justify-center">
              {NAV.slice(0, 5).map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="text-[#86868b] hover:text-[#f5f5f7]"
                >
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="text-xs text-[#86868b] sm:text-right">
              <p>© {new Date().getFullYear()} AI Problem Solve-a-Thon</p>
              <p className="mt-1">
                Built by{" "}
                <a
                  href="https://bnsairam.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
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
