import { createFileRoute } from "@tanstack/react-router";
import { Bug, ShieldAlert } from "lucide-react";
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
        kicker="Research"
        title="Bug bounty & CVEs."
        description="Responsible vulnerability research and disclosure. CVEs contributed to the community, with ongoing bounty work across web and mobile targets."
      />
      <section className="container-prose pb-24 space-y-16">
        <Stagger className="grid md:grid-cols-3 gap-4">
          {focus.map((f) => (
            <StaggerItem key={f.title}>
              <div className="terminal-frame rounded-2xl p-7 h-full">
                <Bug className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <div className="terminal-frame rounded-2xl p-8 md:p-10">
            <div className="flex items-start gap-4">
              <ShieldAlert className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Responsible disclosure</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Detailed CVE writeups and disclosed advisories will be published here as they
                  clear coordinated disclosure timelines. Reach out via the contact page for
                  private disclosure of issues you'd like reviewed.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}