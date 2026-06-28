import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Stagger, StaggerItem, Reveal } from "@/components/reveal";
import { postsByCategory } from "@/data/posts";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — Omar Khalid" },
      { name: "description", content: "OSCP+, OSCP, CRTP, eWPTX, eCPPTv3, eCIR, eCDFP, eJPTv2, Security+, Harvard CS50 — study guide, preparation advice, and writeup reviews." },
      { property: "og:title", content: "Certifications — Omar Khalid" },
      { property: "og:description", content: "Industry certifications across offensive security, red team and DFIR." },
    ],
  }),
  component: CertificationsPage,
});

function CertificationsPage() {
  const certs = postsByCategory("Certification");
  return (
    <div>
      <PageHeader
        kicker="Credentials"
        title="Certifications."
        description="Every certification I've earned, with study tips and full reviews to help you prepare. Click any card to read the deep dive."
      />
      
      <section className="container-prose pb-8">
        <Reveal>
          <div className="border border-border/85 dark:border-border/35 bg-card/60 dark:bg-card/20 backdrop-blur-md rounded-2xl p-7 shadow-sm">
            <h2 className="text-xl font-semibold tracking-tight">Study & Exam Preparation Advice</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Earning technical certifications like the **OSCP**, **CRTP**, or **eWPTX** requires building solid hands-on methodology, structured documentation, and time management. Here is my general study advice:
            </p>
            <ul className="mt-5 space-y-3.5 text-sm text-muted-foreground leading-relaxed list-disc pl-5">
              <li>
                <strong className="text-foreground">Methodology over Scripts:</strong> Avoid running tools blindly. Understand the underlying protocol actions (like LLMNR, Kerberoasting, or SQL injections), how to check for them manually, and why they succeed.
              </li>
              <li>
                <strong className="text-foreground">Excel at Active Directory (AD):</strong> For modern offensive exams, AD is paramount. Focus on constrained and unconstrained delegation, NTLM relaying, Kerberos delegation abuse, ACL modification, and GPO abuse.
              </li>
              <li>
                <strong className="text-foreground">Structured Notes:</strong> Document every technique, script syntax, and payload during your labs. Organize your notes (e.g. into Privilege Escalation, AD Enumeration, Pivoting) inside Obsidian or GitBook to search quickly under pressure.
              </li>
              <li>
                <strong className="text-foreground">Practice Pivoting:</strong> Pivoting is a common exam bottleneck. Familiarize yourself with routing traffic through multiple internal network segments using tools like Chisel or Ligolo-ng.
              </li>
              <li>
                <strong className="text-foreground">Take Regular Breaks:</strong> Exams are long-duration endurance runs. Follow a schedule (e.g. 2 hours on, 15 minutes off), take screenshots of everything, and sleep. Fresh perspective is key.
              </li>
            </ul>
            <div className="mt-6 pt-5 border-t border-border flex items-center gap-2 text-xs text-muted-foreground/80 italic">
              <span>⚠️ Disclaimer: This study advice is compiled from official public exam blueprints and personal learning habits. No exam dump, leak, or NDA-violating material is hosted here.</span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-prose pb-24">
        <Stagger className="grid md:grid-cols-2 gap-4">
          {certs.map((c) => (
            <StaggerItem key={c.slug}>
              <Link
                to="/writeups/$slug"
                params={{ slug: c.slug }}
                className="block border border-border/85 dark:border-border/35 bg-card/60 dark:bg-card/20 backdrop-blur-md rounded-2xl p-7 h-full group hover:border-primary/50 dark:hover:border-primary/40 hover:-translate-y-1 transition duration-300 shadow-sm hover:shadow-md hover:shadow-primary/5 dark:hover:shadow-primary/5"
              >
                <div className="flex items-start justify-between gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-tight group-hover:text-primary transition">{c.title}</h2>
                {c.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{c.description}</p>
                )}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}