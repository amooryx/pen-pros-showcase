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
type AnimationStage = 'resting' | 'flying' | 'smashed';

interface BugHuntProps {
  buttonRef: React.RefObject<HTMLAnchorElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  nameRef: React.RefObject<HTMLHeadingElement | null>;
  setBugStage: (stage: AnimationStage) => void;
}

function BugHunt({ buttonRef, containerRef, nameRef, setBugStage }: BugHuntProps) {
  const [coords, setCoords] = useState<{ x: number; y: number; spawnX: number; spawnY: number } | null>(null);
  const [stage, setStage] = useState<AnimationStage>('flying');

  useEffect(() => {
    let animationFrameId: number;
    const checkAndMeasure = () => {
      if (buttonRef.current && containerRef.current && nameRef.current) {
        const btnRect = buttonRef.current.getBoundingClientRect();
        const nameRect = nameRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        // Calculate coords relative to the container
        if (btnRect.width > 0 && nameRect.width > 0) {
          setCoords({
            x: btnRect.left - containerRect.left + btnRect.width / 2,
            y: btnRect.top - containerRect.top + btnRect.height / 2,
            spawnX: nameRect.right - containerRect.left + 50,
            spawnY: nameRect.top - containerRect.top - 20,
          });
          return; // Stop checking
        }
      }
      animationFrameId = requestAnimationFrame(checkAndMeasure);
    };

    checkAndMeasure();

    const handleResize = () => {
      if (buttonRef.current && containerRef.current && nameRef.current) {
        const btnRect = buttonRef.current.getBoundingClientRect();
        const nameRect = nameRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setCoords({
          x: btnRect.left - containerRect.left + btnRect.width / 2,
          y: btnRect.top - containerRect.top + btnRect.height / 2,
          spawnX: nameRect.right - containerRect.left + 50,
          spawnY: nameRect.top - containerRect.top - 20,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setBugStage(stage);
  }, [stage, setBugStage]);

  if (!coords) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <AnimatePresence>
        {stage !== "smashed" && (
          <motion.div
            className="absolute"
            style={{ x: 0, y: 0, originX: 0.5, originY: 0.5 }}
            initial={{ x: coords.spawnX, y: coords.spawnY, opacity: 0, rotate: 45 }}
            animate={
              stage === "flying"
                ? {
                    x: [
                      coords.spawnX, 
                      coords.spawnX + 150, 
                      coords.spawnX - 100, 
                      coords.x - 120, 
                      coords.x
                    ],
                    y: [
                      coords.spawnY, 
                      coords.spawnY - 40, 
                      coords.spawnY + 80, 
                      coords.y - 60, 
                      coords.y
                    ],
                    rotate: [45, 90, -45, 120, 0],
                    opacity: [0, 1, 1, 1, 1],
                  }
                : stage === "resting"
                ? {
                    x: coords.spawnX,
                    y: coords.spawnY,
                    opacity: 0,
                    scale: 1,
                  }
                : {}
            }
            transition={
              stage === "flying"
                ? {
                    duration: 5.5,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1],
                  }
                : {}
            }
            onAnimationComplete={() => {
              if (stage === "flying") {
                // Mosquito landed, smash it instantly
                setStage("smashed");
                setTimeout(() => {
                  setStage("resting");
                  setTimeout(() => setStage("flying"), 100);
                }, 4500);
              }
            }}
          >
            <div className="relative -left-4 -top-4">
              <motion.div
                animate={
                  stage === "flying"
                    ? { rotate: [-10, 10, -10], scale: [1, 1.1, 1] }
                    : { scale: 0.2, opacity: 0 }
                }
                transition={{
                  repeat: stage === "flying" ? Infinity : 0,
                  duration: 0.08,
                  ease: "easeInOut",
                }}
                className={`flex items-center justify-center p-1.5 transition-colors duration-300`}
              >
                {/* Custom Mosquito SVG Sprite */}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-foreground/80 dark:text-muted-foreground/80 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                  {/* Proboscis */}
                  <line x1="16" y1="8" x2="16" y2="1" stroke="currentColor" strokeWidth="1.5" />
                  
                  {/* Legs */}
                  <path d="M12 14 C10 16, 9 20, 11 22" stroke="currentColor" strokeWidth="1" />
                  <path d="M20 14 C22 16, 23 20, 21 22" stroke="currentColor" strokeWidth="1" />
                  <path d="M11 16 C9 18, 9 22, 10 24" stroke="currentColor" strokeWidth="0.8" />
                  <path d="M21 16 C23 18, 23 22, 22 24" stroke="currentColor" strokeWidth="0.8" />
                  <path d="M14 12 C10 10, 8 12, 6 14" stroke="currentColor" strokeWidth="0.8" />
                  <path d="M18 12 C22 10, 24 12, 26 14" stroke="currentColor" strokeWidth="0.8" />
                  
                  {/* Thorax */}
                  <ellipse cx="16" cy="13" rx="2" ry="4" fill="currentColor" />
                  {/* Abdomen */}
                  <path d="M16 17 L16 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  
                  {/* Wings */}
                  <motion.path
                    d="M15 12 C10 8, 4 9, 6 15 C8 19, 12 16, 15 13"
                    fill="currentColor"
                    fillOpacity="0.4"
                    stroke="currentColor"
                    strokeWidth="1"
                    style={{ transformOrigin: "15px 12px" }}
                    animate={stage === "flying" ? { rotateZ: [0, -45, 0], scaleY: [1, 0.6, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 0.1, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M17 12 C22 8, 28 9, 26 15 C24 19, 20 16, 17 13"
                    fill="currentColor"
                    fillOpacity="0.4"
                    stroke="currentColor"
                    strokeWidth="1"
                    style={{ transformOrigin: "17px 12px" }}
                    animate={stage === "flying" ? { rotateZ: [0, 45, 0], scaleY: [1, 0.6, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 0.1, ease: "easeInOut" }}
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blood Splat Overlay on smash */}
      <AnimatePresence>
        {stage === "smashed" && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.85 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            style={{ 
              left: coords.x, 
              top: coords.y, 
              x: "-50%", 
              y: "-50%" 
            }}
            className="absolute z-10 flex items-center justify-center pointer-events-none"
          >
            <svg width="48" height="48" viewBox="0 0 40 40" fill="none" className="text-red-600 dark:text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
              <path d="M20 12 C15 12, 12 15, 12 20 C12 25, 15 28, 20 28 C25 28, 28 25, 28 20 C28 15, 25 12, 20 12 Z" fill="currentColor" />
              <path d="M12 20 C9 20, 6 18, 6 20 C6 22, 9 21, 12 20 Z" fill="currentColor" />
              <path d="M28 20 C31 20, 34 22, 34 20 C34 18, 31 19, 28 20 Z" fill="currentColor" />
              <path d="M20 12 C20 9, 22 6, 20 6 C18 6, 19 9, 20 12 Z" fill="currentColor" />
              <path d="M20 28 C20 31, 18 34, 20 34 C22 34, 21 31, 20 28 Z" fill="currentColor" />
              <circle cx="10" cy="10" r="1.5" fill="currentColor" />
              <circle cx="30" cy="30" r="2" fill="currentColor" />
              <circle cx="9" cy="29" r="1.2" fill="currentColor" />
              <circle cx="31" cy="9" r="1.8" fill="currentColor" />
              <path d="M15 15 C13 13, 10 11, 11 10 C12 9, 14 12, 15 15 Z" fill="currentColor" />
              <path d="M25 25 C27 27, 30 29, 29 30 C28 31, 26 28, 25 25 Z" fill="currentColor" />
            </svg>
            <div className="absolute w-12 h-12 rounded-full border border-red-500/20 animate-ping duration-700 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Bird perch positions mapped to exact branch fork coordinates in the 800×380 viewBox
const BIRD_PERCHES = [
  { id: 1, px: 210, py: 210, endX: -320, endY: -280, delay: 0.3, duration: 3.8, flip: false },
  { id: 2, px: 310, py: 178, endX: -200, endY: -320, delay: 0.5, duration: 4.2, flip: false },
  { id: 3, px: 420, py: 155, endX:  180, endY: -300, delay: 0.4, duration: 3.6, flip: true  },
  { id: 4, px: 540, py: 138, endX:  300, endY: -260, delay: 0.6, duration: 4.0, flip: true  },
  { id: 5, px: 650, py: 128, endX:  420, endY: -240, delay: 0.2, duration: 3.5, flip: true  },
];

function BirdShape() {
  return (
    <motion.svg
      width="22" height="14" viewBox="0 0 22 14" fill="currentColor"
      animate={{
        scaleY: [1, 0.35, 1],
      }}
      transition={{ repeat: Infinity, duration: 0.22, ease: "easeInOut" }}
    >
      {/* Classic M-shape flying bird silhouette */}
      <path d="M0 10 C3 4, 7 2, 11 7 C15 2, 19 4, 22 10 L18 8 C16 5, 13 4, 11 6 C9 4, 6 5, 4 8 Z" />
    </motion.svg>
  );
}

function FlockOfBirds({ sectionWidth }: { sectionWidth: number }) {
  // Scale perch coords from 800px reference width to actual section width
  const scale = sectionWidth > 0 ? sectionWidth / 800 : 1;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {BIRD_PERCHES.map((b) => {
        const scaledX = b.px * scale;
        const scaledY = b.py * (scale * 0.8) + 60; // vertical offset to align with branch in section
        return (
          <motion.div
            key={b.id}
            className="absolute text-neutral-700 dark:text-neutral-300"
            style={{ left: scaledX, top: scaledY, transformOrigin: "center" }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: [0, b.endX * 0.1, b.endX * 0.4, b.endX * 0.8, b.endX],
              y: [0, b.endY * 0.2, b.endY * 0.5, b.endY * 0.8, b.endY],
              opacity: [1, 1, 0.9, 0.5, 0],
              scale: [1, 1.1, 0.9, 0.6, 0.3],
            }}
            transition={{
              delay: b.delay,
              duration: b.duration,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <BirdShape />
          </motion.div>
        );
      })}
    </div>
  );
}

// Resting birds visible only during the resting stage
function RestingFlock({ sectionWidth }: { sectionWidth: number }) {
  const scale = sectionWidth > 0 ? sectionWidth / 800 : 1;
  return (
    <div className="absolute inset-0 pointer-events-none">
      {BIRD_PERCHES.map((b) => {
        const scaledX = b.px * scale;
        const scaledY = b.py * (scale * 0.8) + 60;
        return (
          <div
            key={b.id}
            className="absolute text-neutral-700 dark:text-neutral-300"
            style={{ left: scaledX, top: scaledY }}
          >
            {/* Resting bird — folded wings, compact teardrop silhouette */}
            <svg width="10" height="13" viewBox="0 0 10 13" fill="currentColor">
              <ellipse cx="5" cy="7" rx="3" ry="4.5" />
              <circle cx="5" cy="2.5" r="2.5" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

function Index() {
  const featuredCerts = postsByCategory("Certification").slice(0, 6);
  const featuredLabs = posts.filter((p) => LAB_CATS.includes(p.category)).slice(0, 6);
  const [bugStage, setBugStage] = useState<AnimationStage>("flying");
  const containerRef = useRef<HTMLDivElement>(null);
  const bugBountyRef = useRef<HTMLAnchorElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  const [sectionWidth, setSectionWidth] = useState(0);

  useEffect(() => {
    const update = () => setSectionWidth(containerRef.current?.offsetWidth ?? window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div>
      <section ref={containerRef} className="relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid opacity-[0.12] dark:opacity-[0.22] pointer-events-none" />

        {/* Glowing backdrop blur circles */}
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] rounded-full bg-primary/3 dark:bg-primary/5 blur-3xl pointer-events-none" />

        {/* ─── HEAVY BARE-TREE SILHOUETTE ────────────────────────────────────────
             Absolute full-width, sits at z-0 behind all content.
             Uses solid fill paths so it reads clearly on any screen.
        ──────────────────────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 380"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            className="w-full h-full"
          >
            {/* ── Trunk & main boughs ── */}
            <path
              d="M 60 380 C 70 320, 90 280, 120 240 C 140 215, 160 200, 200 185
                 M 200 185 C 240 170, 290 160, 340 148
                 M 340 148 C 390 136, 450 130, 510 125
                 M 510 125 C 560 120, 620 118, 700 115"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-400 dark:text-neutral-600"
            />

            {/* ── Upper fork rising left ── */}
            <path
              d="M 200 185 C 180 160, 155 130, 130 100 C 115 80, 100 65, 80 45"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              className="text-neutral-400 dark:text-neutral-600"
            />
            {/* Left fork twig cluster */}
            <path
              d="M 130 100 C 110 85, 90 80, 70 72 M 130 100 C 120 78, 125 55, 115 40
                 M 80 45 C 60 35, 45 28, 30 18"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-neutral-400 dark:text-neutral-600"
            />

            {/* ── Mid fork rising centre-left ── */}
            <path
              d="M 310 160 C 295 135, 280 105, 265 80 C 255 60, 245 42, 230 20"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-neutral-400 dark:text-neutral-600"
            />
            {/* Mid twig cluster */}
            <path
              d="M 265 80 C 250 65, 240 52, 225 38 M 265 80 C 278 60, 285 45, 290 28
                 M 230 20 C 218 8, 210 0, 200 -10"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-neutral-400 dark:text-neutral-600"
            />

            {/* ── Main long horizontal bough (right side) ── */}
            <path
              d="M 340 148 C 380 130, 420 118, 460 112
                 M 460 112 C 500 106, 545 104, 590 102
                 M 590 102 C 630 100, 680 102, 740 106"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              className="text-neutral-400 dark:text-neutral-600"
            />

            {/* ── Upper twigs from right bough ── */}
            <path
              d="M 420 118 C 415 98, 410 78, 400 55 M 400 55 C 392 38, 388 22, 380 5
                 M 400 55 C 410 40, 418 28, 425 15"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-neutral-400 dark:text-neutral-600"
            />
            <path
              d="M 540 104 C 538 82, 535 60, 528 38 M 528 38 C 522 20, 518 10, 510 -2
                 M 528 38 C 538 22, 545 12, 552 0"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-neutral-400 dark:text-neutral-600"
            />
            <path
              d="M 660 102 C 658 80, 655 60, 645 40 M 645 40 C 638 22, 632 12, 622 0
                 M 645 40 C 655 25, 662 14, 670 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-neutral-400 dark:text-neutral-600"
            />

            {/* ── Dropping lower twig ── */}
            <path
              d="M 460 112 C 468 130, 472 150, 480 168 M 480 168 C 486 182, 492 195, 498 210"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-neutral-400 dark:text-neutral-600"
            />
          </svg>

          {/* Birds & mosquito resting on branch (visible only when resting) */}
          {bugStage === "resting" && sectionWidth > 0 && (
            <RestingFlock sectionWidth={sectionWidth} />
          )}

          {/* Flock takeoff animation (visible only when flying) */}
          {bugStage === "flying" && sectionWidth > 0 && (
            <FlockOfBirds sectionWidth={sectionWidth} />
          )}
        </div>

        <BugHunt buttonRef={bugBountyRef} containerRef={containerRef} nameRef={nameRef} setBugStage={setBugStage} />

        <div className="container-prose relative pt-28 pb-24 md:pt-40 md:pb-32 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 dark:bg-secondary/30 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm z-10 relative">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Available for engagements
            </div>
          </Reveal>
          <Reveal delay={0.05} className="relative z-10">
            <h1 ref={nameRef} className="mt-8 text-6xl md:text-8xl font-semibold tracking-tight leading-[1.02] bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-transparent inline-block">
              Omar Khalid.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-2xl md:text-3xl font-medium tracking-tight text-muted-foreground relative z-10">
              Offensive Security Engineer.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed relative z-10">
              I break systems to make them stronger. A complete portfolio of certifications,
              labs, CTFs and research — every writeup, fully published here.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3 justify-center relative z-10">
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
                className={`inline-flex items-center gap-1.5 rounded-full border px-6 py-3 text-sm font-medium transition-all shadow-sm duration-300 relative z-10 ${
                  bugStage === "smashed"
                    ? "border-red-600/50 bg-red-600/10 text-red-600 dark:text-red-400 scale-95 shadow-md shadow-red-500/20"
                    : "border-border bg-background/50 dark:bg-background/20 backdrop-blur-md text-foreground hover:bg-secondary"
                }`}
              >
                {bugStage === "smashed" && (
                  <span className="h-2 w-2 rounded-full bg-red-600 dark:bg-red-500 animate-pulse drop-shadow-[0_0_4px_rgba(220,38,38,0.7)]" />
                )}
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