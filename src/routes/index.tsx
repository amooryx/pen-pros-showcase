import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Bug, Cpu, Terminal, FileCode2, Network } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { certifications, labs, stats, skills } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Omar Khalid — Offensive Security Engineer (VAPT)" },
      { name: "description", content: "Digital CV of Omar Khalid — OSCP+, OSCP, CRTP, eWPTX, eCPPT, eCIR, eCDFP, eJPT, Security+. Pentesting, red team & DFIR labs, CTFs and research." },
      { property: "og:title", content: "Omar Khalid — Offensive Security Engineer (VAPT)" },
      { property: "og:description", content: "Digital CV: certifications, labs, CTFs, CVEs and writeups across web, mobile, AD, malware and DFIR." },
    ],
  }),
  component: Index,
});

function Index() {
  const featuredCerts = certifications.slice(0, 6);
  const featuredLabs = labs.slice(0, 6);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
        <div className="absolute inset-x-0 -top-32 h-[60vh] bg-glow" aria-hidden />
        <div className="container-prose relative pt-24 pb-28 md:pt-32 md:pb-40">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-mono text-xs text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow" /> available for engagements
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
              Omar Khalid
              <span className="block text-muted-foreground font-normal mt-3 text-3xl md:text-4xl">
                Offensive Security Engineer
                <span className="text-primary text-mono"> · VAPT</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              I break systems to make them stronger. Hands-on experience in vulnerability
              assessment, penetration testing and adversarial simulation — backed by{" "}
              <span className="text-foreground">OSCP+, OSCP, CRTP, eWPTX, eCPPT, eCIR, eCDFP, eJPT, Security+</span>{" "}
              and <span className="text-primary">+2 CVEs</span> contributed to the community.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/certifications"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-mono text-sm font-medium text-primary-foreground shadow-glow transition hover:brightness-110"
              >
                View certifications
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-mono text-sm hover:border-primary hover:text-primary transition"
              >
                Get in touch
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-16 terminal-frame rounded-xl overflow-hidden max-w-2xl">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/40">
                <span className="h-3 w-3 rounded-full bg-destructive/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <span className="h-3 w-3 rounded-full bg-primary/70" />
                <span className="ml-3 text-mono text-xs text-muted-foreground">~/whoami</span>
              </div>
              <pre className="p-5 text-mono text-xs md:text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
{`$ whoami
omar.khalid — offensive security engineer

$ cat ./focus.txt
- Vulnerability Assessment & Penetration Testing
- Red Team Ops (AD, Kerberos, Lateral Movement)
- Mobile App Pentesting (Android / Frida)
- DFIR — Memory, Disk & Network forensics

$ ls ./shipped
oscp+  oscp  crtp  ewptx  ecpptv3  ecir  ecdfp  ejpt  sec+

$ echo $status
ready_for_next_engagement `}<span className="text-primary caret">▌</span>
              </pre>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/60 bg-secondary/20">
        <div className="container-prose py-10">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <StaggerItem key={s.label} className="text-center">
                <div className="text-4xl md:text-5xl font-semibold text-primary">{s.value}</div>
                <div className="mt-1 text-mono text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ABOUT */}
      <section className="container-prose py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Reveal>
              <div className="text-mono text-xs text-primary">// about</div>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
                Breaker, defender, writer.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            <Reveal>
              <p>
                I'm an Offensive Security Engineer with deep experience in vulnerability
                assessment, penetration testing and adversarial simulation across web,
                mobile and enterprise networks.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                I'm equally passionate about defensive work — from incident response to
                memory and malware analysis. This site documents my labs, research,
                certification insights and personal growth.
              </p>
            </Reveal>
          </div>
        </div>

        <Stagger className="mt-16 grid md:grid-cols-3 gap-4">
          {skills.map((g) => (
            <StaggerItem key={g.group}>
              <div className="terminal-frame rounded-lg p-6 h-full">
                <div className="flex items-center gap-2 text-mono text-xs text-primary">
                  {g.group === "Offensive" && <Bug className="h-3.5 w-3.5" />}
                  {g.group === "Defensive / DFIR" && <ShieldCheck className="h-3.5 w-3.5" />}
                  {g.group === "Tooling" && <Cpu className="h-3.5 w-3.5" />}
                  {g.group}
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li key={i} className="text-mono text-xs px-2 py-1 rounded border border-border text-muted-foreground hover:border-primary hover:text-primary transition">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* CERTS PREVIEW */}
      <section className="border-t border-border/60 bg-secondary/10">
        <div className="container-prose py-24">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <Reveal>
              <div>
                <div className="text-mono text-xs text-primary">// 02 — certifications</div>
                <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
                  Earned, not collected.
                </h2>
              </div>
            </Reveal>
            <Link to="/certifications" className="text-mono text-xs text-primary hover:underline inline-flex items-center gap-1">
              all certs <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <Stagger className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredCerts.map((c) => (
              <StaggerItem key={c.code}>
                <article className="terminal-frame rounded-lg p-6 h-full group hover:border-primary/60 transition">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-mono text-xs text-primary">{c.code}</span>
                    <ShieldCheck className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug">{c.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{c.summary}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* LABS PREVIEW */}
      <section className="container-prose py-24">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <Reveal>
            <div>
              <div className="text-mono text-xs text-primary">// 03 — labs &amp; writeups</div>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
                Field notes from the lab.
              </h2>
            </div>
          </Reveal>
          <Link to="/labs" className="text-mono text-xs text-primary hover:underline inline-flex items-center gap-1">
            all labs <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <Stagger className="mt-12 grid md:grid-cols-2 gap-4">
          {featuredLabs.map((l) => (
            <StaggerItem key={l.title}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="block terminal-frame rounded-lg p-6 h-full group hover:border-primary/60 transition"
              >
                <div className="flex items-center gap-2 text-mono text-xs">
                  {l.category === "Mobile" && <Terminal className="h-3.5 w-3.5 text-primary" />}
                  {l.category === "Reverse Engineering" && <FileCode2 className="h-3.5 w-3.5 text-primary" />}
                  {(l.category === "Malware" || l.category === "Memory" || l.category === "DFIR") && <Network className="h-3.5 w-3.5 text-primary" />}
                  <span className="text-primary">{l.category}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug group-hover:text-primary transition">{l.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{l.description}</p>
                <div className="mt-4 text-mono text-xs text-muted-foreground inline-flex items-center gap-1 group-hover:text-primary">
                  read writeup <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* CTA */}
      <section className="container-prose pb-24">
        <Reveal>
          <div className="terminal-frame rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-glow opacity-60" aria-hidden />
            <div className="relative">
              <div className="text-mono text-xs text-primary">// engage</div>
              <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
                Need someone who'll actually find it?
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Open to penetration testing engagements, red team exercises and DFIR collaborations.
              </p>
              <div className="mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-mono text-sm font-medium text-primary-foreground shadow-glow hover:brightness-110 transition"
                >
                  Start a conversation <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}