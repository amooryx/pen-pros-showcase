import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="container-prose py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Omar Khalid</div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm leading-relaxed">
            Offensive Security Engineer — VAPT, red team and DFIR. Documenting every lab, CVE and CTF I touch.
          </p>
        </div>
        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Explore</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/writeups" className="hover:text-primary">Writeups</Link></li>
            <li><Link to="/certifications" className="hover:text-primary">Certifications</Link></li>
            <li><Link to="/ctf" className="hover:text-primary">CTF</Link></li>
            <li><Link to="/events" className="hover:text-primary">Events</Link></li>
            <li><Link to="/medium" className="hover:text-primary">Medium</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Connect</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><a href="https://omar-4.gitbook.io/omar-khalid" target="_blank" rel="noreferrer" className="hover:text-primary">GitBook archive</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-prose flex flex-col md:flex-row justify-between gap-2 py-5 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Omar Khalid. All rights reserved.</span>
          <span>Designed and built for clarity.</span>
        </div>
      </div>
    </footer>
  );
}