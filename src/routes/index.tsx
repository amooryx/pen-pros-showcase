import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ShieldCheck, Bug, ScanLine, Crosshair } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { posts, postsByCategory } from "@/data/posts";
import { stats, skills } from "@/data/site";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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

interface BugHuntProps {
  buttonRef: React.RefObject<HTMLAnchorElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  setBugStage: (stage: "flying" | "landed" | "targeted" | "shot" | "dead") => void;
}

function BugHunt({ buttonRef, containerRef, setBugStage }: BugHuntProps) {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [stage, setStage] = useState<"flying" | "landed" | "targeted" | "shot" | "dead">("flying");

  const measureCoords = () => {
    if (buttonRef.current && containerRef.current) {
      const btnRect = buttonRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setCoords({
        x: btnRect.left - containerRect.left + btnRect.width / 2,
        y: btnRect.top - containerRect.top + btnRect.height / 2,
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      measureCoords();
    }, 1000);

    window.addEventListener("resize", measureCoords);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measureCoords);
    };
  }, []);

  useEffect(() => {
    setBugStage(stage);
  }, [stage, setBugStage]);

  if (!coords) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <AnimatePresence>
        {stage !== "dead" && (
          <motion.div
            className="absolute"
            style={{ x: 0, y: 0, originX: 0.5, originY: 0.5 }}
            initial={{ x: coords.x + 150, y: -200, opacity: 0, rotate: 180 }}
            animate={
              stage === "flying"
                ? {
                    x: [
                      coords.x + 150, 
                      coords.x - 200, 
                      coords.x + 100, 
                      coords.x - 80, 
                      coords.x
                    ],
                    y: [
                      -200, 
                      coords.y - 120, 
                      coords.y - 80, 
                      coords.y + 40, 
                      coords.y
                    ],
                    rotate: [180, 220, 140, 260, 0],
                    opacity: [0, 1, 1, 1, 1],
                  }
                : stage === "landed" || stage === "targeted"
                ? {
                    x: coords.x,
                    y: coords.y,
                    rotate: 0,
                    opacity: 1,
                  }
                : {
                    x: coords.x,
                    y: coords.y + 400,
                    rotate: 180,
                    opacity: 0,
                  }
            }
            transition={
              stage === "flying"
                ? {
                    duration: 5.5,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1],
                  }
                : stage === "shot"
                ? {
                    duration: 1.0,
                    ease: "easeIn",
                  }
                : {}
            }
            onAnimationComplete={() => {
              if (stage === "flying") {
                setStage("landed");
                setTimeout(() => setStage("targeted"), 1000);
              } else if (stage === "shot") {
                setStage("dead");
                // Wait 4 seconds (clean patched state), then restart the loop!
                setTimeout(() => {
                  setStage("flying");
                }, 4000);
              }
            }}
          >
            <div className="relative -left-4 -top-4">
              <motion.div
                animate={
                  stage === "flying"
                    ? { rotate: [-15, 15, -15], scale: [1, 1.15, 1] }
                    : stage === "landed"
                    ? { y: [0, -1.5, 0] }
                    : { scale: 0.95 }
                }
                transition={{
                  repeat: Infinity,
                  duration: stage === "flying" ? 0.08 : 0.4,
                  ease: "easeInOut",
                }}
                className={`flex items-center justify-center p-1.5 rounded-full border transition-colors duration-300 ${
                  stage === "shot"
                    ? "bg-red-500/20 border-red-500/40 text-red-600 dark:text-red-400"
                    : "bg-primary/10 border-primary/20 text-primary shadow-sm shadow-primary/10"
                }`}
              >
                <Bug className="h-5 w-5" />
              </motion.div>

              {(stage === "targeted" || stage === "shot") && (
                <motion.div
                  initial={{ scale: 3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  onAnimationComplete={() => {
                    if (stage === "targeted") {
                      setTimeout(() => setStage("shot"), 800);
                    }
                  }}
                  className="absolute -inset-3 flex items-center justify-center"
                >
                  <div className="absolute inset-0 rounded-full border border-red-500/30 animate-ping duration-1000" />
                  <Crosshair className="h-10 w-10 text-red-500 animate-spin" style={{ animationDuration: "10s" }} />
                  <div className="absolute h-1.5 w-1.5 rounded-full bg-red-600 shadow-md shadow-red-500" />
                </motion.div>
              )}

              {stage === "shot" && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 3, 0], opacity: [0.9, 1, 0] }}
                  transition={{ duration: 0.4 }}
                  className="absolute -inset-10 bg-gradient-radial from-red-500/30 to-transparent rounded-full flex items-center justify-center pointer-events-none"
                >
                  <div className="absolute w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Index() {
  const featuredCerts = postsByCategory("Certification").slice(0, 6);
  const featuredLabs = posts.filter((p) => LAB_CATS.includes(p.category)).slice(0, 6);
  const [bugStage, setBugStage] = useState<"flying" | "landed" | "targeted" | "shot" | "dead">("flying");
  const containerRef = useRef<HTMLDivElement>(null);
  const bugBountyRef = useRef<HTMLAnchorElement>(null);

  return (
    <div>
      <section ref={containerRef} className="relative overflow-hidden">
        {/* Apple-style subtle grid background */}
        <div className="absolute inset-0 bg-grid opacity-[0.12] dark:opacity-[0.22] pointer-events-none" />
        
        {/* Glowing backdrop blur circles for premium tech aesthetic */}
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] rounded-full bg-primary/3 dark:bg-primary/5 blur-3xl pointer-events-none" />

        <BugHunt buttonRef={bugBountyRef} containerRef={containerRef} setBugStage={setBugStage} />

        <div className="container-prose relative pt-28 pb-24 md:pt-40 md:pb-32 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 dark:bg-secondary/30 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Available for engagements
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-8 text-6xl md:text-8xl font-semibold tracking-tight leading-[1.02] bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-transparent">
              Omar Khalid.
            </h1>
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
                className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90 shadow-sm"
              >
                Read writeups <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                ref={bugBountyRef}
                to="/writeups"
                search={{ category: "Bug Bounty" } as any}
                className={`inline-flex items-center gap-1.5 rounded-full border px-6 py-3 text-sm font-medium transition-all shadow-sm duration-300 ${
                  bugStage === "shot"
                    ? "border-red-500 bg-red-500/10 text-red-500 scale-95 shadow-red-500/20"
                    : bugStage === "dead"
                    ? "border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400 shadow-md shadow-green-500/10 scale-100"
                    : "border-border bg-background/50 dark:bg-background/20 backdrop-blur-md text-foreground hover:bg-secondary"
                }`}
              >
                Bug bounty reports
              </Link>
              <a
                href="/CV.pdf"
                download="Omar_Khalid_CV.pdf"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 backdrop-blur-md px-6 py-3 text-sm font-medium text-primary transition shadow-sm cursor-pointer"
              >
                Download CV
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 dark:bg-background/20 backdrop-blur-md px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition shadow-sm"
              >
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border relative bg-secondary/20 dark:bg-secondary/5">
        <div className="container-prose py-14">
          <Stagger className="grid grid-cols-3 gap-8">
            {stats.map((s) => (
              <StaggerItem key={s.label} className="text-center">
                <div className="text-5xl md:text-6xl font-semibold tracking-tight">{s.value}</div>
                <div className="mt-2 text-xs text-muted-foreground uppercase tracking-[0.15em]">{s.label}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container-prose py-28 md:py-36 relative">
        <div className="max-w-3xl">
          <Reveal>
            <div className="text-xs font-medium text-primary uppercase tracking-[0.18em]">About</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Breaker, researcher, writer.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Offensive Security Engineer specializing in penetration testing (VAPT) and adversarial
              simulation (Red Teaming) across networks, Active Directory forests, web apps, and mobile
              platforms. Focused on emulating realistic attack paths to discover critical flaws, backed by
              certification credentials (OSCP+, CRTP, eWPTX) and a strong foundation in digital forensics and incident response.
            </p>
          </Reveal>
        </div>

        {/* Events & Highlights Grid */}
        <div className="mt-20">
          <div className="flex items-end justify-between flex-wrap gap-4 border-b border-border pb-6">
            <Reveal>
              <div>
                <div className="text-xs font-medium text-primary uppercase tracking-[0.18em]">Community &amp; Teams</div>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight">Events &amp; Highlights.</h3>
              </div>
            </Reveal>
            <Link to="/events" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
              All events &amp; details <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <Stagger className="mt-10 grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Google Developer Student Clubs (GDSC)",
                category: "Community • 2024",
                image: "/images/events/gdsc.jpeg",
                desc: "Led workshops, guided student developers, and grew our local Google developer community.",
                position: "object-cover object-[center_18%] scale-[1.1]"
              },
              {
                title: "1st Place — AJA CTF Competition",
                category: "Championship • 2025",
                image: "/images/events/aja-ctf.jpeg",
                desc: "Led our core team to achieve the absolute 1st place in the AJA Capture The Flag competition.",
                position: "object-cover object-[center_60%]"
              },
              {
                title: "Blackhat CTF Finalist",
                category: "Tournament • 2024 - 2025",
                image: "/images/events/blackhat-2025.jpeg",
                desc: "Qualified for the final round at Blackhat CTF, competing with an elite team.",
                position: "object-cover object-[center_25%]"
              },
              {
                title: "LEAP 2025 Showcase",
                category: "Summit • March 2025",
                image: "/images/events/leap-2025-2.jpeg",
                desc: "Participated in the massive LEAP 2025 tech summit in Riyadh with teammates.",
                position: "object-cover object-[center_35%]"
              }
            ].map((e) => (
              <StaggerItem key={e.title}>
                <Link
                  to="/events"
                  className="block border border-border/80 dark:border-border/30 bg-card/60 dark:bg-card/20 backdrop-blur-md rounded-3xl overflow-hidden group hover:border-primary/50 dark:hover:border-primary/40 hover:-translate-y-1 transition duration-300 shadow-sm"
                >
                  <div className="h-72 overflow-hidden bg-secondary/10 relative">
                    <img
                      src={e.image}
                      alt={e.title}
                      className={`w-full h-full ${e.position} transition-transform duration-500 group-hover:scale-105`}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider">{e.category}</div>
                    <h4 className="mt-3 text-base font-semibold leading-snug tracking-tight group-hover:text-primary transition">{e.title}</h4>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{e.desc}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Skills sub-header and grid */}
        <div className="mt-24">
          <Reveal>
            <div>
              <div className="text-xs font-medium text-primary uppercase tracking-[0.18em]">Skills</div>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">Technical Arsenal.</h3>
            </div>
          </Reveal>
          <Stagger className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((g) => (
              <StaggerItem key={g.group}>
                <div className="border border-border/80 dark:border-border/30 bg-card/50 dark:bg-card/25 backdrop-blur-md rounded-2xl p-7 h-full group hover:border-primary/50 dark:hover:border-primary/45 transition duration-300 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {g.group.includes("Testing") && <Bug className="h-4 w-4 text-primary" />}
                    {g.group.includes("Red Teaming") && <Crosshair className="h-4 w-4 text-primary" />}
                    {g.group.includes("Defensive") && <ShieldCheck className="h-4 w-4 text-primary" />}
                    {g.group.includes("Tooling") && <ScanLine className="h-4 w-4 text-primary" />}
                    {g.group}
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {g.items.map((i) => (
                      <li key={i} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-foreground/80 border border-border/40">{i}</li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40 dark:bg-secondary/10 relative">
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
                  className="block border border-border/80 dark:border-border/30 bg-card/60 dark:bg-card/20 backdrop-blur-md rounded-2xl p-7 h-full group hover:border-primary/50 dark:hover:border-primary/40 hover:-translate-y-1 transition duration-300 shadow-sm hover:shadow-md hover:shadow-primary/5 dark:hover:shadow-primary/5"
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

      <section className="container-prose py-28 relative">
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
                className="block border border-border/85 dark:border-border/35 bg-card/60 dark:bg-card/20 backdrop-blur-md rounded-2xl p-7 h-full group hover:border-primary/50 dark:hover:border-primary/40 hover:-translate-y-1 transition duration-300 shadow-sm hover:shadow-md hover:shadow-primary/5 dark:hover:shadow-primary/5"
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

      <section className="container-prose py-28 relative">
        <Reveal>
          <div className="rounded-3xl bg-foreground text-background p-12 md:p-20 text-center relative overflow-hidden shadow-xl border border-border/20">
            <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none" />
            <div className="relative z-10">
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
                  className="inline-flex items-center gap-1.5 rounded-full bg-background text-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition shadow-sm"
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