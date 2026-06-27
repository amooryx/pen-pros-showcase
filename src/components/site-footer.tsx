import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, BookOpen } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/60 mt-24">
      <div className="container-prose py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="text-mono text-xs text-primary">// signature</div>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Offensive Security Engineer focused on VAPT, red team and DFIR. Building
            and breaking — then writing it down.
          </p>
        </div>
        <div>
          <div className="text-mono text-xs text-primary">// pages</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link to="/certifications" className="hover:text-primary">Certifications</Link></li>
            <li><Link to="/labs" className="hover:text-primary">Labs &amp; Writeups</Link></li>
            <li><Link to="/ctf" className="hover:text-primary">CTF Writeups</Link></li>
            <li><Link to="/bug-bounty" className="hover:text-primary">Bug Bounty</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-mono text-xs text-primary">// elsewhere</div>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <a href="https://omar-4.gitbook.io/omar-khalid" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-primary">
                <BookOpen className="h-4 w-4" /> GitBook archive
              </a>
            </li>
            <li>
              <Link to="/contact" className="inline-flex items-center gap-2 hover:text-primary">
                <Mail className="h-4 w-4" /> Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-prose flex flex-col md:flex-row justify-between gap-2 py-4 text-mono text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Omar Khalid. All rights reserved.</span>
          <span>built with care · <span className="text-primary">stay curious</span></span>
        </div>
      </div>
    </footer>
  );
}