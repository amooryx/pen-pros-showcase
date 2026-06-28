import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ShieldCheck, Bug, ScanLine } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { posts, postsByCategory } from "@/data/posts";
import { stats, skills } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Omar Khalid — Offensive Security Engineer (VAPT)" },
      { name: "description", content: "Portfolio of Omar Khalid — OSCP+, OSCP, CRTP, eWPTX, eCPPT, eCIR, eCDFP, eJPT, Security+. Full writeups, certifications, CTFs and research, all in one place." },
      { property: "og:title", content: "Omar Khalid — Offensive Security Engineer (VAPT)" },
      { property: "og:description", content: "Portfolio: certifications, labs, CTFs, CVEs and writeups across web, mobile, AD, malware and DFIR." },
    ],
  }),
  component: Index,
});

const LAB_CATS = ["Mobile", "Reverse Engineering", "Malware", "DFIR", "Memory"];

function Index() {
  const featuredCerts = postsByCategory("Certification").slice(0, 6);
  const featuredLabs = posts.filter((p) => LAB_CATS.includes(p.category)).slice(0, 6);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="container-prose relative pt-28 pb-24 md:pt-40 md:pb-32 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Available for engagements
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-8 text-6xl md:text-8xl font-semibold tracking-tight leading-[1.02]">Omar Khalid.</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-2xl md:text-3xl font-medium tracking-tight text-muted-foreground">
              Offensive Security Engineer.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              I break systems to make them stronger. A complete portfolio of certifications,
              labs, CTFs and research — every writeup, fully published here.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              <Link
                to="/writeups"
                className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
              >
                Read writeups <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition"
              >
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="container-prose py-14">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <StaggerItem key={s.label} className="text-center">
                <div className="text-5xl md:text-6xl font-semibold tracking-tight">{s.value}</div>
                <div className="mt-2 text-xs text-muted-foreground uppercase tracking-[0.15em]">{s.label}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container-prose py-28 md:py-36">
        <div className="max-w-3xl">
          <Reveal>
            <div className="text-xs font-medium text-primary uppercase tracking-[0.18em]">About</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Breaker, defender, writer.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Offensive Security Engineer with deep experience in vulnerability assessment,
              penetration testing and adversarial simulation across web, mobile and enterprise
              networks. Equally passionate about the defensive side — from incident response
              to memory and malware analysis.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid md:grid-cols-3 gap-4">
          {skills.map((g) => (
            <StaggerItem key={g.group}>
              <div className="terminal-frame rounded-2xl p-7 h-full">
                <div className="flex items-center gap-2 text-sm font-medium">
                  {g.group === "Offensive" && <Bug className="h-4 w-4 text-primary" />}
                  {g.group === "Defensive / DFIR" && <ShieldCheck className="h-4 w-4 text-primary" />}
                  {g.group === "Tooling" && <ScanLine className="h-4 w-4 text-primary" />}
                  {g.group}
                </div>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {g.items.map((i) => (
                    <li key={i} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-foreground/80">{i}</li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="container-prose py-28">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <Reveal>
              <div>
                <div className="text-xs font-medium text-primary uppercase tracking-[0.18em]">Certifications</div>
                <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">Earned, not collected.</h2>
              </div>
            </Reveal>
            <Link to="/certifications" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
              All certifications <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Stagger className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredCerts.map((c) => (
              <StaggerItem key={c.slug}>
                <Link
                  to="/writeups/$slug"
                  params={{ slug: c.slug }}
                  className="block terminal-frame rounded-2xl p-6 h-full group hover:border-primary/40 hover:-translate-y-0.5 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold leading-snug group-hover:text-primary transition">{c.title}</h3>
                  {c.description && <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{c.description}</p>}
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container-prose py-28">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <Reveal>
            <div>
              <div className="text-xs font-medium text-primary uppercase tracking-[0.18em]">Labs &amp; writeups</div>
              <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">Field notes from the lab.</h2>
            </div>
          </Reveal>
          <Link to="/writeups" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            All writeups <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Stagger className="mt-12 grid md:grid-cols-2 gap-4">
          {featuredLabs.map((l) => (
            <StaggerItem key={l.slug}>
              <Link
                to="/writeups/$slug"
                params={{ slug: l.slug }}
                className="block terminal-frame rounded-2xl p-7 h-full group hover:border-primary/40 hover:-translate-y-0.5 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">{l.category}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight group-hover:text-primary transition">{l.title}</h3>
                {l.description && <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{l.description}</p>}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="container-prose pb-28">
        <Reveal>
          <div className="rounded-3xl bg-foreground text-background p-12 md:p-20 text-center">
            <div className="text-xs font-medium uppercase tracking-[0.18em] opacity-70">Engage</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
              Need someone who'll actually find it?
            </h2>
            <p className="mt-5 text-lg opacity-80 max-w-xl mx-auto">
              Open to penetration testing engagements, red team exercises and DFIR collaborations.
            </p>
            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-background text-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}