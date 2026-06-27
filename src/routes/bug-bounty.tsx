import { createFileRoute } from "@tanstack/react-router";
import { Bug, ShieldAlert, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";

export const Route = createFileRoute("/bug-bounty")({
  head: () => ({
    meta: [
      { title: "Bug Bounty & CVEs — Omar Khalid" },
      { name: "description", content: "Bug bounty work and CVE contributions from Omar Khalid — vulnerability research and responsible disclosure." },
      { property: "og:title", content: "Bug Bounty & CVEs — Omar Khalid" },
      { property: "og:description", content: "Disclosed vulnerabilities, CVEs and bug bounty research." },
    ],
  }),
  component: BountyPage,
});

const focus = [
  { title: "Web Application Security", desc: "Auth bypass, IDOR, SSRF, deserialization and modern injection variants." },
  { title: "Mobile (Android)", desc: "Frida-assisted runtime instrumentation, insecure storage and IPC flaws." },
  { title: "API & Logic Bugs", desc: "Broken access control, mass assignment and business logic abuse." },
];

function BountyPage() {
  return (
    <div>
      <PageHeader
        kicker="04 / research"
        title="Bug bounty & CVEs"
        description="Responsible vulnerability research and disclosure. +2 CVEs contributed to the community, with ongoing bounty work across web and mobile targets."
      />
      <section className="container-prose py-16 space-y-12">
        <Stagger className="grid md:grid-cols-3 gap-4">
          {focus.map((f) => (
            <StaggerItem key={f.title}>
              <div className="terminal-frame rounded-lg p-6 h-full">
                <Bug className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <div className="terminal-frame rounded-2xl p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-primary/10 text-primary border border-primary/30">
                <ShieldAlert className="h-5 w-5" />
              </span>
              <div>
                <div className="text-mono text-xs text-primary">// disclosure</div>
                <h2 className="mt-1 text-2xl font-semibold">Found something in scope?</h2>
                <p className="mt-2 text-muted-foreground max-w-xl">
                  I follow responsible disclosure timelines and coordinate directly with affected vendors.
                  For collaboration or disclosure inquiries, reach out via the contact page.
                </p>
              </div>
            </div>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-mono text-sm font-medium text-primary-foreground shadow-glow hover:brightness-110 transition">
              Contact <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}