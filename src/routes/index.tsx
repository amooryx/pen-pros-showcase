import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ShieldCheck, Bug, ScanLine, Crosshair } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { posts, postsByCategory } from "@/data/posts";
import { stats, skills } from "@/data/site";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Omar Khalid â€” Offensive Security Engineer (VAPT)" },
      { name: "description", content: "Portfolio of Omar Khalid â€” OSCP+, OSCP, CRTP, eWPTX, eCPPT, eCIR, eCDFP, eJPT, Security+. Full writeups, certifications, CTFs and research, all in one place." },
      { property: "og:title", content: "Omar Khalid â€” Offensive Security Engineer (VAPT)" },
      { property: "og:description", content: "Portfolio: certifications, labs, CTFs, CVEs and writeups across web, mobile, AD, malware and DFIR." },
    ],
  }),
  component: Index,
}));

const LAB_CATS = ["Mobile", "Reverse Engineering", "Malware", "DFIR", "Memory"];

// â”€â”€â”€ Clean state machine â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
type AnimationStage = "ambient_flight" | "landing" | "resting";

// â”€â”€â”€ Elegant wing-flapping bird SVG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function FlyingBird({
  size = 20,
  opacity = 1,
  flapSpeed = 0.55,
  gliding = false,
}: {
  size?: number;
  opacity?: number;
  flapSpeed?: number;
  gliding?: boolean;
}) {
  return (
    <motion.svg
      width={size}
      height={Math.round(size * 0.55)}
      viewBox="0 0 28 16"
      fill="currentColor"
      style={{ opacity }}
      animate={gliding ? { scaleY: 0.6 } : { scaleY: [1, 0.28, 1] }}
      transition={
        gliding
          ? { duration: 0.3 }
          : { repeat: Infinity, duration: flapSpeed, ease: [0.45, 0, 0.55, 1] }
      }
    >
      {/* Elegant M-silhouette */}
      <path d="M0 12 C4 5, 9 3, 14 8 C19 3, 24 5, 28 12 L23 9 C20 6, 17 5, 14 7 C11 5, 8 6, 5 9 Z" />
    </motion.svg>
  );
}

// â”€â”€â”€ Ambient background flock â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const AMBIENT_BIRDS = [
  { id: 1, startPct: 108, y: "18%", duration: 18, size: 14, opacity: 0.35, flapSpeed: 0.60, delay: 0  },
  { id: 2, startPct: 115, y: "10%", duration: 23, size: 11, opacity: 0.22, flapSpeed: 0.72, delay: 5  },
  { id: 3, startPct: 105, y: "27%", duration: 16, size: 18, opacity: 0.42, flapSpeed: 0.50, delay: 9  },
  { id: 4, startPct: 112, y: "8%",  duration: 26, size: 10, opacity: 0.18, flapSpeed: 0.78, delay: 14 },
];

function AmbientFlock() {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {AMBIENT_BIRDS.map((b) => (
        <motion.div
          key={b.id}
          className="absolute text-foreground/60 dark:text-neutral-400"
          style={{ top: b.y }}
          initial={{ x: `${b.startPct}%` }}
          animate={{ x: [` ${b.startPct}%`, "-15%"] }}
          transition={{
            delay: b.delay,
            duration: b.duration,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <FlyingBird size={b.size} opacity={b.opacity} flapSpeed={b.flapSpeed} />
        </motion.div>
      ))}
    </div>
  );
}

// â”€â”€â”€ Compact resting bird perched on button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function RestingBird() {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="currentColor"
      className="text-foreground/70 dark:text-neutral-300"
    >
      <ellipse cx="9" cy="10" rx="5" ry="4" />
      <circle cx="9" cy="5.5" r="3.2" />
      <path d="M13.5 11 C15 12, 17 13, 17 15 C15 14, 13 13, 13 12 Z" />
      <line x1="7" y1="14" x2="6" y2="16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="11" y1="14" x2="12" y2="16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// â”€â”€â”€ Breakaway landing bird â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface LandingBirdProps {
  buttonRef: React.RefObject<HTMLAnchorElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  stage: AnimationStage;
  onLanded: () => void;
}

function LandingBird({ buttonRef, containerRef, stage, onLanded }: LandingBirdProps) {
  const [target, setTarget] = useState<{ tx: number; ty: number } | null>(null);

  useEffect(() => {
    let rafId: number;
    const measure = () => {
      if (buttonRef.current && containerRef.current) {
        const btn = buttonRef.current.getBoundingClientRect();
        const box = containerRef.current.getBoundingClientRect();
        if (btn.width > 0) {
          setTarget({
            tx: btn.left - box.left + btn.width / 2,
            ty: btn.top  - box.top  + btn.height / 2 - 18,
          });
          return;
        }
      }
      rafId = requestAnimationFrame(measure);
    };
    measure();
    const onResize = () => { setTarget(null); rafId = requestAnimationFrame(measure); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", onResize); };
  }, [buttonRef, containerRef]);

  if (!target || stage === "ambient_flight") return null;

  const sectionW = containerRef.current?.offsetWidth ?? 900;
  const spawnX = sectionW * 0.80;
  const spawnY = 55;

  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      initial={{ x: spawnX, y: spawnY, rotate: 0, opacity: 0 }}
      animate={
        stage === "landing"
          ? {
              x: [spawnX, spawnX - 100, target.tx - 9],
              y: [spawnY, spawnY + 50, target.ty],
              rotate: [0, 10, 0],
              opacity: [0, 1, 1],
            }
          : stage === "resting"
          ? { x: target.tx - 9, y: target.ty, rotate: 0, opacity: 1 }
          : {}
      }
      transition={
        stage === "landing"
          ? { duration: 3.0, ease: [0.25, 0.46, 0.45, 0.94], times: [0, 0.45, 1] }
          : {}
      }
      onAnimationComplete={() => { if (stage === "landing") onLanded(); }}
    >
      {stage === "resting" ? (
        <RestingBird />
      ) : (
        <FlyingBird size={20} flapSpeed={0.42} gliding={false} />
      )}
    </motion.div>
  );
}

// â”€â”€â”€ Orchestrator ties together the stage cycle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface OrchestratorProps {
  buttonRef: React.RefObject<HTMLAnchorElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  stage: AnimationStage;
  setStage: (s: AnimationStage) => void;
}

function BirdOrchestrator({ buttonRef, containerRef, stage, setStage }: OrchestratorProps) {
  useEffect(() => {
    if (stage !== "ambient_flight") return;
    const t = setTimeout(() => setStage("landing"), 3500);
    return () => clearTimeout(t);
  }, [stage, setStage]);

  const handleLanded = useCallback(() => {
    setStage("resting");
    setTimeout(() => setStage("ambient_flight"), 4500);
  }, [setStage]);

  return (
    <LandingBird
      buttonRef={buttonRef}
      containerRef={containerRef}
      stage={stage}
      onLanded={handleLanded}
    />
  );
}

// â”€â”€â”€ Index page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Index() {
  const featuredCerts = postsByCategory("Certification").slice(0, 6);
  const featuredLabs  = posts.filter((p) => LAB_CATS.includes(p.category)).slice(0, 6);

  const [stage, setStage]   = useState<AnimationStage>("ambient_flight");
  const containerRef        = useRef<HTMLDivElement>(null);
  const bugBountyRef        = useRef<HTMLAnchorElement>(null);
  const nameRef             = useRef<HTMLHeadingElement>(null);

  return (
    <div>
      <section ref={containerRef} className="relative overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid opacity-[0.10] dark:opacity-[0.18] pointer-events-none" />
        {/* Ambient glow orbs */}
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-primary/4 dark:bg-primary/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] rounded-full bg-primary/3 dark:bg-primary/5 blur-3xl pointer-events-none" />

        {/* Downsized serene branch background */}
        <BranchSilhouette />

        {/* Continuous ambient flock in the sky */}
        <AmbientFlock />

        {/* Breakaway landing bird */}
        <BirdOrchestrator
          buttonRef={bugBountyRef}
          containerRef={containerRef}
          stage={stage}
          setStage={setStage}
        />

        <div className="container-prose relative z-10 pt-28 pb-24 md:pt-40 md:pb-32 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 dark:bg-secondary/30 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Available for engagements
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              ref={nameRef}
              className="mt-8 text-6xl md:text-8xl font-semibold tracking-tight leading-[1.02] bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-transparent inline-block"
            >
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
              labs, CTFs and research â€” every writeup, fully published here.
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
              {/* Bug Bounty button â€” soft natural glow when bird is resting on it */}
              <Link
                ref={bugBountyRef}
                to="/writeups"
                search={{ category: "Bug Bounty" } as any}
                className={`relative inline-flex items-center gap-1.5 rounded-full border px-6 py-3 text-sm font-medium transition-all duration-500 shadow-sm ${
                  stage === "resting"
                    ? "border-border/70 bg-background/70 text-foreground"
                    : "border-border bg-background/50 dark:bg-background/20 backdrop-blur-md text-foreground hover:bg-secondary"
                }`}
              >
                {/* Perched bird appears above button text, animates in/out */}
                <AnimatePresence>
                  {stage === "resting" && (
                    <motion.span
                      key="perched-icon"
                      className="absolute -top-[22px] left-1/2 -translate-x-1/2"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                      <RestingBird />
                    </motion.span>
                  )}
                </AnimatePresence>
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
                category: "Community â€¢ 2024",
                image: "/images/events/gdsc.jpeg",
                desc: "Led workshops, guided student developers, and grew our local Google developer community.",
                position: "object-cover object-[center_18%] scale-[1.1]"
              },
              {
                title: "1st Place â€” AJA CTF Competition",
                category: "Championship â€¢ 2025",
                image: "/images/events/aja-ctf.jpeg",
                desc: "Led our core team to achieve the absolute 1st place in the AJA Capture The Flag competition.",
                position: "object-cover object-[center_60%]"
              },
              {
                title: "Blackhat CTF Finalist",
                category: "Tournament â€¢ 2024 - 2025",
                image: "/images/events/blackhat-2025.jpeg",
                desc: "Qualified for the final round at Blackhat CTF, competing with an elite team.",
                position: "object-cover object-[center_25%]"
              },
              {
                title: "LEAP 2025 Showcase",
                category: "Summit â€¢ March 2025",
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
