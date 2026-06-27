import { Link } from "@tanstack/react-router";
import { Terminal, Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "home" },
  { to: "/certifications", label: "certs" },
  { to: "/labs", label: "labs" },
  { to: "/ctf", label: "ctf" },
  { to: "/bug-bounty", label: "bounty" },
  { to: "/contact", label: "contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-lg">
      <div className="container-prose flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-md border border-primary/40 text-primary shadow-glow">
            <Terminal className="h-4 w-4" />
          </span>
          <span className="text-mono text-sm">
            <span className="text-muted-foreground">root@</span>
            <span className="text-foreground">omar</span>
            <span className="text-primary">:~$</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-mono text-xs px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary/60 transition-colors"
              activeProps={{ className: "text-mono text-xs px-3 py-2 rounded-md text-primary bg-secondary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              ./{n.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95">
          <div className="container-prose py-2 flex flex-col">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-mono text-sm py-2 text-muted-foreground hover:text-primary"
                activeProps={{ className: "text-mono text-sm py-2 text-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                ./{n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}